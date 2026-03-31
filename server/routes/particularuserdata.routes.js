import { Router } from "express";
import Food from "../models/food.js";

const router = Router();

router.get("/getparticularuserdata/:email", async (req, res) => {
  try {
    const foods = await Food.find({ email: req.params.email });
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
