export const APPLICATION_TABS = [
  "WEARABLES",
  "SMART HOMES",
  "INDUSTRIAL",
  "AUTOMOTIVE",
  "MEDICAL",
  "AGRICULTURE",
  "DRONES",
  "HEARABLES",
] as const;

export const ACTIVE_TAB = "AUTOMOTIVE";

export const FEATURE_CARDS = {
  left: {
    wrapperNodeId: "2379:925",
    contentNodeId: "2379:926",
    title: "Tire Pressure Monitoring",
    description:
      "On-device air pressure and temperature sensors provide real-time alerts for tire health to prevent accidents and optimize maintenance and fuel expenses",
    background: "rgba(0, 0, 0, 0.1)",
    height: 198,
    position: "left" as const,
  },
  right: {
    wrapperNodeId: "2379:917",
    contentNodeId: "2379:918",
    title: "Battery Management",
    description:
      "Monitoring of cell utiization, charging patterns, heat generation, etc. in electric vehicle batteries to prevent mishaps and optimize battery life",
    background: "rgba(21, 21, 21, 0.1)",
    height: 174,
    position: "right" as const,
  },
};
