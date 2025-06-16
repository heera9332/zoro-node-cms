import { Router, type Response, type Request } from "express";
import { upload } from "@/config";
import mediaRouter from "@/routes/media";

const apiRouter = Router();

apiRouter.use("/users", mediaRouter);
apiRouter.use("/posts", upload.array("file"), mediaRouter);
apiRouter.use("/media", upload.array("file"), mediaRouter);

export default apiRouter;
