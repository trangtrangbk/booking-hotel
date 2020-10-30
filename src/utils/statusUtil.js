

export const mappingStatus = (status) => {
  let color = "#216ba5"
  let bg = "#90cff5"
  switch (status) {
    case "Available":
      color = "#0b8a2f"
      bg = "#baf7c6"
      break;
    case "Booked":
      color = "#e9701e"
      bg = "#f7c09b"
      break;
    case "Not Ready":
      color = "#47637a"
      bg = "#ccc"
      break;
    default:
      break;
  }
  return {color, bg};
};
