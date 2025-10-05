// const allFuelTypes = ["91", "95", "diesel"];

// export const formatSelectedFilters = (filters) => {
  //   const { type, hours } = openingHours || {};
//   const fuelTypes = [];
//   const services = [];
//   filters
//     .map((filter) => filter.value)
//     .forEach((filter) => {
//       const formattedSearch = filter.value.toLowerCase()
//       if (allFuelTypes.includes(formattedSearch)) {
//         fuelTypes.push(filter);
//       } else {
//         services.push(filter);
//       }
//     });
//   return { fuelTypes, services };
// };

export const formatSelectedFilters = (filters) => {
  const fuelTypes = [];
  const services = [];

  filters.forEach((filter) => {
    const value = filter.value.toLowerCase();
    if (["91", "95", "diesel"].includes(value)) {
      fuelTypes.push(filter.value);
    } else {
      services.push(filter.value);
    }
  });

  return { fuelTypes, services };
};
