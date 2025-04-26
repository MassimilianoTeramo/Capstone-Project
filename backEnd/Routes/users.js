import { Router } from "express";
import User from "../models/userModel.js";

const router = Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//modify user
router.put("/:id", async (req, res) => {
  try {
    const { firstName, lastName, currentPassword, newPassword } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Utente non trovato" });
    }
    //check if the user is changing the password
    if (newPassword) {
      if (user.password !== currentPassword) {
        return res
          .status(401)
          .json({ message: "Password attuale non corretta" });
      }
      user.password = newPassword;
    }

    user.firstName = firstName;
    user.lastName = lastName;

    await user.save();

    // avoid sending password in the response
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.json(userWithoutPassword);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Delete user

router.delete("/id"),
  async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

export default router;
