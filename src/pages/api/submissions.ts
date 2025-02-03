import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../utils/db";
import Submission from "@/app/models/Submission";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  if (req.method === "POST") {
    // Handle POST requests
    try {
      const { name, message } = req.body;

      const submission = new Submission({
        name,
        message,
      });

      await submission.save();

      res.status(200).json({ message: "Submission successful" });
    } catch (error) {
      console.error("Error saving submission:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  } else if (req.method === "GET") {
    // Handle GET requests
    try {
      const submissions = await Submission.find(); // Fetch all submissions
      res.status(200).json(submissions);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      res.status(500).json({ message: "Failed to fetch submissions" });
    }
  } else {
    // Handle unsupported HTTP methods
    res.setHeader("Allow", ["GET", "POST", "DELETE"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
