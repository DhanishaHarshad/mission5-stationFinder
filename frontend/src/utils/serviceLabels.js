import { filterData } from "./filterData.js";

export const serviceLabel = filterData
  .flatMap((group) => group.items)
  .reduce((acc, item) => {
    acc[item.value] = item.label;
    return acc;
  }, {});
