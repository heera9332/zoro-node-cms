import { Router } from "express";
import { upload } from "./media";

const apiRouter = Router();

apiRouter.post("/media", upload.array("files"), (req, res) => {res.json({messag: "media uploaded"})});

export default apiRouter;
