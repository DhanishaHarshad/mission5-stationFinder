// backend/src/routes/zstations.js
import express from "express";
import { getStations } from "../controllers/zstationController.js";

const router = express.Router();

router.get("/", getStations);

export default router;
