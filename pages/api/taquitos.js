import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../util/mongodb";

const COLLECTION_NAME = "taquitos";
// routes
export default function handler(req, res) {
  const { method } = req;
  switch (method) {
    // COMPLETE route getALL
    case "GET":
      return getTaquitos(req, res);
    // COMPLETE route create
    case "POST":
      return addTaquito(req, res);

    //TODO route getById
    // case "GET":
    // return getById(req, res);

    //COMPLETE route update
    case "PUT":
      return updateTaquito(req, res);

    //COMPLETE route delete
    case "DELETE":
     return deleteTaquito(req, res);
  }
}

// Controllers
//COMPLETE Getting all taquitos
async function getTaquitos(req, res) {
  try {
    let { db } = await connectToDatabase();
    let taquitos = await db
      .collection(COLLECTION_NAME)
      .find({})
      //   .sort({ published: -1 })
      .toArray();
    console.log(taquitos);
    return res.status(200).json({
      data: JSON.parse(JSON.stringify(taquitos)),
      msg: "Listed taquitos",
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
//COMPLETE Create a new taquito
async function addTaquito(req, res) {
  try {
    const { name, rate } = req.body;
    let { db } = await connectToDatabase();
    // await db.collection("taquitos").insertOne(JSON.parse(req.body));
    await db.collection(COLLECTION_NAME).insertOne({ name, rate });
    return res.status(201).json({
      msg: "Created successfully",
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
//BUG Update a taquito
async function updateTaquito(req, res) {
  try {
    let { db } = await connectToDatabase();
    await db.collection(COLLECTION_NAME).updateOne(
      {
        _id: new ObjectId(req.body),
      },
      {
        $set: { createdAt: true },
      }
    );

    return res.status(200).json({
      msg: "Updated successfully",
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
//COMPLETE Delete a taquito
async function deleteTaquito(req, res) {
  try {
    let { db } = await connectToDatabase();
    await db.collection(COLLECTION_NAME).deleteOne({
      _id: new ObjectId(req.body),
    });

    return res.status(200).json({
      msg: "Deleted successfully",
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

//TODO Getting a taquito by ID
// async function getById(req,res){
//     try {
//      let { db } = await connectToDatabase();
        
//     } catch (error) {
        
//     }
// }
