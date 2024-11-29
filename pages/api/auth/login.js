import getDB from "@/util/mongodb";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    try {
      const db = await getDB();

      // Find the user by email
      const user = await db.collection("users").findOne({ email: email });

      if (!user) {
        return res.status(400).json({ message: "Incorrect email or password." });
      }

      // Compare the provided password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({ message: "Incorrect email or password." });
      }

      // Password is valid; you can now return the user data (excluding the hashed password)
      const { password: _, ...userWithoutPassword } = user; // Exclude password field
      return res.status(200).json(userWithoutPassword);
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  }
}
