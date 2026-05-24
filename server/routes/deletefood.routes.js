import { Router } from "express";
import Food from "../models/food.js";

const router = Router();

// DELETE FOOD BY ID
router.delete("/deletefood/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedFood = await Food.findByIdAndDelete(id);

    if (!deletedFood) {
      return res.status(404).json({
        message: "Food not found",
      });
    }

    res.status(200).json({
      message: "Food deleted successfully",
      deletedFood,
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({
      message: "Server error while deleting food",
    });
  }
});

export default router;