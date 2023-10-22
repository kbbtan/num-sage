export const isEmpty = (obj: any): boolean => {
  for (const key in obj) {
    return false;
  }
  return true;
};
