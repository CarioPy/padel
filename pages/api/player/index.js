import DBConnect from "../../../utils/dbConnect";
import Player from "/models/player.js";

DBConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const player = await Player.find({}).sort({ score: -1 });
        res.status(200).json({ success: true, data: player });
      } catch (error) {
        res.status(400).json({ success: false });
        console.log("problem");
      }
      break;

    case "POST":
      try {
        const player = await Player.create(req.body);
        res.status(200).json({ success: true, data: player });
      } catch (error) {
        res.status(400).json({ success: false });
        console.log(error);
      }
      break;
    case "PUT":
      try {
        const player = await Player.createOne(req.body);
        res.status(201).json({ creation: true, data: player });
      } catch (error) {
        res.status(400).json({ success: false });
      }
    default:
      res.status(400).json({ success: false });
      break;
  }
};
