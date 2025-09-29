import express from "express"
import { getStations, getStationById } from "../controllers/getStationController.js"

const router = express.Router()

router.get("/zstations", getStations)
router.get("/zstations/id", getStationById)

export default router