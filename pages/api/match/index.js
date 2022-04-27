import DBConnect from "../../../utils/dbConnect";
import Match from "/models/match.js";

DBConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const match = await Match.find({});
        res.status(200).json({ success: true, data: match });
      } catch (error) {
        res.status(400).json({ success: false });
        console.log("problem");
      }
      break;

    case "POST":
      try {
        const match = await Match.create(req.body);
        res.status(200).json({ success: true, data: match });
      } catch (error) {
        res.status(400).json({ success: false });
        console.log("problem");
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
