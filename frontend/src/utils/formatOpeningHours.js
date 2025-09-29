const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const formatOpeningHours = (openingHours) => {
  const { type, hours } = openingHours || {};

  let displayHours;

  if (type === "24/7") {
    displayHours = "Open 24 Hours";
  } else if (type === "daily_range" && typeof hours === "string" && hours.trim()) {
    displayHours = hours;
  } else {
    displayHours = "9am-9pm";
  }

  return daysOfWeek.map(day => ({
    day,
    hours: displayHours
  }));
};
