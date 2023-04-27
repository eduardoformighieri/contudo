export const dateFormatter = (dateStr: string) => {
  const originalDate = new Date(dateStr);
  const newDateString = originalDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  return newDateString;
};
