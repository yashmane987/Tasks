// Front End => HTML , CSS , SCSS , JavaScript , React , Angular

// Backed => Node js , MongoDb = DB = Database , Java , C#

// backed Madhun Ek URL Link Tya link la Data

// Link Front end Madhe Integarte FE madhe link thevane

//  M = > MongoDb ===> DB
//  E => Express Js => Node js fremwork ahe => react router dome use same tasach node madhe ===> Backed Node js Fremwork
//  R => React Front end sathi ==> Front end React Liblary
//  N => Node Js ==> Backed langauge

// Backed Nodejs express.js

// MERN Stack
// M - MongoDb
// E - Express.js
// R - React Js
// N - Node Js

// POST - Add Data In DB Create User
// GET - Get Data from DB and Show in UI
// PUT - Update Perticulat data single record
// DELETE - Delete any one if data

// Import required packages
import express, { json } from "express"; // Express framework for Node.js
import { connect, Schema, model } from "mongoose"; // Mongoose for MongoDB object modeling
import cors from "cors"; // CORS to allow cross-origin requests

// Delcare define app ghetala  Express application
const app = express();

// Define the port number for running the server
const PORT = 9090;

// Middleware setup
app.use(cors()); // Enable CORS for cross-origin requests
app.use(json()); // Enable parsing of JSON request bodies

// Connect to MongoDB database
connect("mongodb://localhost:27017/yash-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected")) // Success message if connection is successful
  .catch((err) => console.log("MongoDB Connection Error:", err)); // Error message if connection fails

// Start the Express server
app.listen(PORT, () => {
  console.log("Server is running on", PORT);
});

// Define MongoDB schema and model for Users
const UsersSchema = new Schema({
  firstName: String, // User's name as a string
  middleName: String, // User's email as a string
  lastName: String, // User's age as a number
  contactNumber: Number, // User's age as a number
  email: String, // User's age as a number
  employeeId: Number, // User's age as a number
  city: String, // User's age as a number
  state: String, // User's age as a number
  pinCode: Number, // User's age as a number
});

// Create a User model based on the schema
const User = model("User", UsersSchema);

// Create User API (POST request) - Adds a new user to the database
app.post("/api/create-user", async (req, res) => {
  // Corrected missing forward slash in route
  try {
    // Extract user details from the request body payload
    const {
      firstName,
      middleName,
      lastName,
      contactNumber,
      email,
      employeeId,
      city,
      state,
      pinCode,
    } = req.body;

    // Create a new User instance with provided data
    const newUser = new User({
      firstName,
      middleName,
      lastName,
      contactNumber,
      email,
      employeeId,
      city,
      state,
      pinCode,
    });

    // Save the user to the database
    await newUser.save();

    // Send success response with the created user data
    res.status(201).json({ message: "User added successfully", data: newUser });
  } catch (error) {
    // Handle any errors and send an error response
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

app.get("/api/get-all-users", async (req, res) => {
  try {
    
    const userList = await User.find();

    res.status(200).json({ data: userList });

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

app.put("/api/update-user/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const {
      firstName,
      middleName,
      lastName,
      contactNumber,
      email,
      employeeId,
      city,
      state,
      pinCode,
    } = req.body;

    const userPresent = await User.findOne({ _id: id });

    if (!userPresent) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      { _id: id },
      {
        firstName,
        middleName,
        lastName,
        contactNumber,
        email,
        employeeId,
        city,
        state,
        pinCode,
      },
      { new: true }
    );

    res.status(200).json({
      message: "User Updated successfully",
      updatedUser: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});




app.delete("/api/delete-user/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const userExist = await User.findOne({ _id: id });

    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findOneAndDelete({ _id: id });

    res.status(200).json({ message: "User deleted successfully " });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

app.put("/api/update/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const { name, email, age } = req.body;

    const userPresent = await User.findOne({ _id: id });

    if (!userPresent) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      { _id: id },
      {
        name,
        email,
        age,
      },
      { new: true }
    );

    res
      .status(200)
      .json({
        message: "User Updated successfully ",
        updatedUser: updatedUser,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});