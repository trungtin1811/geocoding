export const parseDate = (dateString?: string) => {
  if (!dateString) {
    return undefined;
  }
  const year = parseInt(dateString.slice(0, 4), 10);
  const month = parseInt(dateString.slice(4, 6), 10) - 1; // Months are zero-based (0-11)
  const day = parseInt(dateString.slice(6, 8), 10);
  const hour = parseInt(dateString.slice(9, 11), 10) || 0;
  const minute = parseInt(dateString.slice(12, 14), 10) || 0;

  return new Date(year, month, day, hour ?? 0, minute ?? 0);
};
