import express from "express";
import * as photoController from "../controllers/photoController.js";

const router = express.Router();

router
  .route("/")
  .post(photoController.createPhoto)
  .get(photoController.getAllPhotos); // Aynı endpointler için farklı methodlar birbiri ile bağlanabilir.

export default router;
