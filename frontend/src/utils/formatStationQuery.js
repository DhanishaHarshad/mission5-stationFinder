export function formatStationQuery(search, services, fuelTypes) {
  const params = new URLSearchParams();
  if (search !== "") {
    params.append("search", search);
  }
  if (services.length > 0) {
    params.append("services", services.map(encodeURIComponent).join(","));
  }
  if (fuelTypes.length > 0) {
    params.append("fuelType", fuelTypes.map(encodeURIComponent).join(","));
  }
  return params.toString();
}
