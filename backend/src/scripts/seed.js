import { configDotenv } from 'dotenv'
configDotenv()
import ZEnergyStation from '../models/ZEnergySchema.js'
import { stationData } from './stationData.js'
import { connectDB, closeDB } from '../config/connectDb.js'

const seedDB = async () => {
    await connectDB()

    try {
        await ZEnergyStation.insertMany(stationData)
        console.log("Successfully seeded data to database")
    } catch(error) {
        console.log("There was an error seeding data", error.message);
    } finally {
        await closeDB();
    }
        
};        

seedDB()

