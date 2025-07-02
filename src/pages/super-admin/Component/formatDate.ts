export function formatDate(dateString: string | Date): string {
  const date = new Date(dateString);

  // Format as "MMM DD, YYYY" (e.g., "Jan 01, 2023")
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
