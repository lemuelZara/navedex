export const removeArrayDuplicates = (arr: []): any[] => {
  const newArr = [...new Map(arr.map((item: any) => [item.id, item])).values()];

  return newArr;
};
