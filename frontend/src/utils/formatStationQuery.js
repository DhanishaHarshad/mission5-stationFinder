// export function formatStationQuery(search, services, fuelTypes) {
//   const params = new URLSearchParams();
//   if (search !== "") {
//     params.append("search", search);
//   }
//   if (services.length > 0) {
//     params.append("services", services.map(encodeURIComponent).join(","));
//   }
//   if (fuelTypes.length > 0) {
//     params.append("fuelType", fuelTypes.map(encodeURIComponent).join(","));
//   }
//   console.log("Query string:", formatStationQuery(searchQuery, services, fuelTypes));

//   return params.toString();
// }

// ____ formatStationQuery.js ____

export const formatStationQuery = (search, services, fuelTypes) => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  services.forEach(service => params.append("services", service));
  fuelTypes.forEach(fuel => params.append("fuelTypes", fuel));
  return params.toString();
};
