// moment转为秒
export const getSecondFromMoment = (moment) => {
  return parseInt(moment.toDate() / 1000);
};
