export const compareArrays = (array1, array2) => {
  array1.sort();
  array2.sort();

  if (
    array1.length === array2.length &&
    array1.every((element, index) => element === array2[index])
  ) {
    return true;
  }

  return false;
};
