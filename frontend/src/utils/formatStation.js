import { formatOpeningHours } from "./formatOpeningHours";
import { serviceLabel } from "./serviceLabels";

export function formatStation(station) {
  return {
    id: station._id,
    name: station.station_name,
    address: station.address,
    openingHours: formatOpeningHours(station.opening_hours),
    latitude: station.location?.coordinates[1] ?? null,
    longitude: station.location?.coordinates[0] ?? null,
    fuelPrices: Array.isArray(station.fuel_prices)
      ? station.fuel_prices.map(fuel => ({
          type: fuel.type,
          price: fuel.price,
          lastUpdated: fuel.last_updated
        }))
      : [],
    services: Array.isArray(station.services)
      ? station.services
          .filter(service => service.available)
          .map(service => ({
            id: service._id,
            type: service.type,
            name: serviceLabel[service.type] || service.type
          }))
      : []
  };
}

