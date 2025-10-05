const allFuelTypes = ["91", "95", "diesel"];

export const formatSelectedFilters = (filters) => {
  //   const { type, hours } = openingHours || {};
  const fuelTypes = [];
  const services = [];
  filters
    .map((filter) => filter.value)
    .forEach((filter) => {
      if (allFuelTypes.includes(filter)) {
        fuelTypes.push(filter);
      } else {
        services.push(filter);
      }
    });
  return { fuelTypes, services };
};
