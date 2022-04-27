import DBConnect from "../../../utils/dbConnect";
import Player from "/models/player.js";

DBConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const player = await Player.findOneAndReplace(
          {
            name: req.body.name,
          },

          { name: req.body.name, score: req.body.score, email: req.body.email }
        );
        res.status(200).json({ success: true, data: player });
      } catch (error) {
        res.status(400).json({ success: false });
        console.log("problem");
      }
      break;
  }
};
