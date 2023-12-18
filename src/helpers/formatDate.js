export const formatDate = date => {
  const rawDate = date.split('T')[0];

  return {
    formattedDate: rawDate.split('-').reverse().join('/'),
    rawDate,
  };
};
