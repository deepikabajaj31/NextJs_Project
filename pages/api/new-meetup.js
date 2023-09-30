// /api/new-meetup
// POST /api/new-meetup
import { MongoClient } from "mongodb";
async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
//connection set up
    const client = await MongoClient.connect(process.env.DB_URL);
    //navigate to the created database
    const db = client.db();

    const meetupsCollection = db.collection("meetup");
//if done then insert your data into it
    const result = await meetupsCollection.insertOne(data);

    console.log(result);
//sever the connection
    client.close();
//when we bring data back from database then use json and while sending data back into database use stringify
    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
