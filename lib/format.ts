const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

/** Formats an ISO date ("YYYY-MM-DD") as "Sep 6, 2023". */
export function formatDate(iso: string) {
  return dateFormat.format(new Date(iso));
}

export function formatMiles(miles: number) {
  return `${miles.toLocaleString("en-US")} mi`;
}
