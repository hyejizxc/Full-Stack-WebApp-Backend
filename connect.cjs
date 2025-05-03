const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./config.env" });

async function main() {
  const Db = process.env.ATLAS_URI;

  if (!Db) {
    console.error("❌ MongoDB URI not found in environment variables.");
    return;
  }

  const client = new MongoClient(Db);

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB!");

    const collections = await client.db("Manager").collections();
    if (collections.length === 0) {
      console.log("ℹ️ No collections found in 'manager' database.");
    } else {
      console.log("📦 Collections in 'Manager':");
      collections.forEach((collection) =>
        console.log(" -", collection.collectionName)
      );
    }
  } catch (e) {
    console.error("❌ Error connecting to MongoDB:", e.message);
  } finally {
    await client.close();
  }
}

main();
