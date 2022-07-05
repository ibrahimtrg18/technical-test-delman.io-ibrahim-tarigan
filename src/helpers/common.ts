export const isPureNumber = (value: string | number): boolean => {
  if (isNaN(Number(value))) {
    return false;
  }

  if (Number(value) % 1 !== 0) {
    return false;
  }

  return true;
};
