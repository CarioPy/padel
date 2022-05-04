import DBConnect from "../../../utils/dbConnect";
import Match from "/models/match.js";

DBConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const match = await Match.find({
          $or: [
            { player1ID: req.body.name },
            { player2ID: req.body.name },
            { player3ID: req.body.name },
            { player4ID: req.body.name },
          ],
        }).sort({ date: 1 });
        res.status(200).json({ success: true, data: match });
      } catch (error) {
        res.status(400).json({ success: false });
        console.log(req.body);
        console.log("problem", error);
      }
      break;
  }
};
