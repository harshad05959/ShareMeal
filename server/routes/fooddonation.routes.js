import { Router } from "express";
import Food from "../models/food.js";
import User from "../models/user.js";

const router = Router();

router.post("/fooddonation", async (req, res) => {
  try {
    const { foodName, foodTag, quantity, expiryDate, address, email } =
      req.body.formData;

    // validation
    if (!foodName || !foodTag || !quantity || !expiryDate || !address || !email) {
      return res.status(400).json({
        message: "Complete all fields of the form",
      });
    }

    // find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // create food donation
    const food = await Food.create({
      foodName,
      foodTag,
      quantity,
      expiryDate,
      address,
      user: user._id,
    });

    // link food to user
    user.food.push(food._id);
    await user.save();

    res.status(201).json(food);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

export default router;
