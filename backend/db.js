const mongoose = require('mongoose');

const mongouri = 'mongodb://localhost:27017/gofoodmern';

// Function to handle collection fetching with error checking
async function fetchCollection(collectionName) {
  try {
    const collectionData = await mongoose.connection.db.collection(collectionName).find({}).toArray();
    return collectionData;
  } catch (err) {
    console.error(`Error fetching ${collectionName}:`, err);
    return []; // Return an empty array in case of error
  }
}

async function mongoDB() {
  try {
    await mongoose.connect(mongouri, {
      useNewUrlParser: true, // To handle deprecated features in MongoDB
      useUnifiedTopology: true // For better server discovery and monitoring engine
    });
    console.log("Connected to MongoDB");

    // Fetch collections with error checking
    const [fetched_data, foodCategory] = await Promise.all([
      fetchCollection("food_items"),
      fetchCollection("food_category")
    ]);

    // Assign the fetched data to global variables
    global.food_items = fetched_data;
    global.food_category = foodCategory;

    // Log the global variables for verification
    // console.log(global.food_items);
    // console.log(global.food_category);

  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

// Call the function after it is defined
// mongoDB();

module.exports = mongoDB;
