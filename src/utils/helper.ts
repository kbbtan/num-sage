export const isEmpty = (obj: any): boolean => {
  for (const _ in obj) {
    return false;
  }
  return true;
};
