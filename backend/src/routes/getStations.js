import express from "express"
import { getStations } from "../controllers/getStationController.js"

const router = express.Router()

router.get("/zstations", getStations)

export default router