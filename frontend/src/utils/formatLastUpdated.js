export const formatLastUpdated = (lastUpdated) => {
  if (!lastUpdated) return "Time Not Available";
  
  try {
    const date = new Date(lastUpdated);

    if (isNaN(date.getTime())) return "Invalid Time";

    return date.toLocaleString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch (e) {
    return "Time Not Available";
  }
};