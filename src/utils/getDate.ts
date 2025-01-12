export const getDate = (date: string) => {
  const dateTemp = new Date(date);

  return `${dateTemp.getFullYear()}-${
    (dateTemp.getMonth() + 1 < 10 ? "0" : "") + (dateTemp.getMonth() + 1)
  }-${(dateTemp.getDate() < 10 ? "0" : "") + dateTemp.getDate()}`;
};

export const getTime = (date: string) => {
  const timeTemp = new Date(date);

  return `${timeTemp.getHours()}:${
    (timeTemp.getMinutes() < 10 ? "0" : "") + timeTemp.getMinutes()
  }`;
};
