const mongoose = require("mongoose");
const InsightModel = require("../models/insights.model");
const UserModel = require("../models/user.model");
const { retrieveInsigts } = require("../helpers/retrieveInsigts");

const getInsights = async (req, res) => {
  try {
    const { domainName, user } = req.body;

    // Check if 'domainName' was provided in the request body.
    if (!domainName)
      return res.status(400).json({
        message: "Please provide the required fields. domainName missing",
      });

    // Check if the user with the email exists or not.
    const isUserExists = await UserModel.findOne({ email: user });
    if (!isUserExists)
      return res.status(404).json({ message: "Please Register!" });

    // Get the insights of domain from 'retrieveInsights' method
    const insights = await retrieveInsigts(domainName);

    // Check for the errors
    if (insights.isError) {
      return res
        .status(insights.statusCode)
        .json({ message: insights.message });
    }

    // Retreive the required fields from insights
    const { wordCount, webLinks, mediaLinks } = insights;

    // Create a new insights instance and save it to the database
    const newInsightsInstance = new InsightModel({
      domainName,
      user,
      wordCount,
      webLinks,
      mediaLinks,
    });
    const savedInsights = await newInsightsInstance.save();

    // Respond with a 201 status code and the saved insights info
    res.status(201).json({
      insights: savedInsights,
    });
  } catch (error) {
    console.log("Error fetching insights => ", error);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

const updateInsights = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    // Find the insight by its ID
    const findInsight = await InsightModel.findOne({ _id: id });

    // Check if the insight exists
    if (!findInsight) {
      return res.status(404).json({ message: "Insight does not exist" });
    }

    // Toggle the 'isFavorite' property and update the insight
    findInsight.isFavorite = !findInsight.isFavorite;
    const updatedInsight = await findInsight.save();

    // Send a success response with the updated insight
    res
      .status(200)
      .json({ message: "Insight updated", insight: updatedInsight });
  } catch (error) {
    console.error("Error updating insight => ", error);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

const deleteInsights = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    // Find the insight by its ID and delete
    const deletedInsight = await InsightModel.findByIdAndDelete(id);

    // Check if the insight exists
    if (!deletedInsight) {
      return res.status(404).json({ message: "Insight does not exist" });
    }

    // Send a success response with the deleted insight
    res
      .status(200)
      .json({ message: "Insight deleted", insight: deletedInsight });
  } catch (error) {
    console.error("Error deleting insight => ", error);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

const getAllInsights = async (req, res) => {
  try {
    const { userEmail } = req.body;

    // Check if the 'userEmail' is provided in the request body
    if (!userEmail) {
      return res.status(400).json({
        message: "Please provide the required fields. userEmail is missing",
      });
    }

    // Find the user by email
    const isUserExists = await UserModel.findOne({ email: userEmail });

    // Check if the user exists
    if (!isUserExists) {
      return res
        .status(404)
        .json({ message: "User not found. Please Register!" });
    }

    // Find insights associated with the user's email
    const userInsightsHistory = await InsightModel.find({ user: userEmail });

    // Check if any insights were found
    if (userInsightsHistory.length === 0) {
      return res.status(404).json({ message: "Insights not found" });
    }

    // Send a success response with the user's insights
    res.status(200).json(userInsightsHistory);
  } catch (error) {
    console.error("Error fetching insights => ", error);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

module.exports = {
  getInsights,
  updateInsights,
  deleteInsights,
  getAllInsights,
};
