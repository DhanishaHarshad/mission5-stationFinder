// define mongoose models
const mongoose = require("mongoose");

// set z-energy station schema
const zenergySchema = new mongoose.Schema({
  station_name: { type: String, required: true },

  opening_hours: {
    type: {
      type: String,
      enum: ["24/7", "daily_range"],
      required: true,
    },
    hours: {
      type: String,
    },
  },
  // hint: use enum (enumeration) to restrict a field to a specific set of allowed values.

  address: { type: String, required: true },

  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },

  fuel_prices: [
    {
      type: {
        type: String,
        enum: ["91", "95", "diesel"],
        required: true,
      },
      price: { type: Number, required: true },
      last_updated: { type: Date, default: Date.now },
    },
  ],

  services: [
    {
      type: {
        type: String,
        enum: [
          "EV_fast_charging",
          "EV_ultra_fast_charging",
          "Zexpress_coffee_and_food",
          "f'real",
          "preorder_coffee",
          "24/7_pay_by_pump",
          "pay_by_plate",
          "pay_in_z_app",
          "atm",
          "restrooms",
          "LPG_bottle_swap",
          "recycling",
          "trailer_hire",
          "wifi",
          "car_wash",
          "super_long_hoses",
          "tyre_pressure",
        ],
        required: true,
      },
      available: { type: Boolean },
    },
  ],
});

// Add geospatial index
// ensuring mongoDB treats location as a GeoJSON object - enabling geospatial queries such as $near / $geoWithin
zenergySchema.index({ location: "2dsphere" });

// filter by fuel type
zenergySchema.index({ "fuel_prices.type": 1 });

// filter by service type
zenergySchema.index({ "services.type": 1 });

// define & export
const ZEnergyStation = mongoose.model("ZEnergyStation", zenergySchema);
module.exports = ZEnergyStation;
