export const ClassNameHandler = (range) => {
  if (0 < range && range <= 50) return "good";
  else if (range > 50 && range <= 100) return "satisfactory";
  else if (range > 100 && range <= 200) return "moderate";
  else if (range > 200 && range <= 300) return "poor";
  else if (range > 300 && range <= 400) return "very-poor";
  else if (range > 400 && range <= 500) return "severe";
};

export const LastUpdatedHandler = (milliSeconds) => {
  let duration = new Date().getTime() - milliSeconds;

  let minutes = Math.floor(duration / (1000 * 60));
  let hours = Math.floor(duration / (1000 * 60 * 60));
  let days = Math.floor(duration / (1000 * 60 * 60 * 24));

  if (days > 1)
    return `${days} days ago (${new Date(milliSeconds).toLocaleString()})`;
  else if (hours > 0) return `${hours} hours ago`;
  else if (minutes > 0) return `${minutes} minutes ago`;
  else return "A few seconds ago";
};
