import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../../utils/db";
import Submission from "@/app/models/Submission";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  const { id } = req.query; // Extract ID from URL path

  if (req.method === "DELETE") {
    try {
      if (!id) {
        return res.status(400).json({ message: "ID is required for deletion" });
      }

      const deletedSubmission = await Submission.findByIdAndDelete(id.toString());

      if (!deletedSubmission) {
        return res.status(404).json({ message: "Submission not found" });
      }

      res.status(200).json({ message: "Submission deleted successfully" });
    } catch (error) {
      console.error("Error deleting submission:", error);
      res.status(500).json({ message: "Failed to delete submission" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
