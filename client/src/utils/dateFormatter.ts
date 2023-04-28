export const dateFormatter = (dateStr: string) => {
  const originalDate = new Date(dateStr);
  const newDateString = originalDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  return newDateString;
};

export const dateFormatterWithHH = (dateStr: string) => {
  const originalDate = new Date(dateStr);
  const h = originalDate.getHours();
  const min = originalDate.getMinutes();

  const d = originalDate.getDate();
  const m = originalDate.getMonth() + 1;
  const y = originalDate.getFullYear();

  return `${h.toString().padStart(2, '0')}:${min
    .toString()
    .padStart(2, '0')} - ${d.toString().padStart(2, '0')}/${m
    .toString()
    .padStart(2, '0')}/${y}`;
};
