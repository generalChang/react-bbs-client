import moment from "moment";

const dateFormater = (date) => {
  const now = new Date(Date.now());
  const target = new Date(date);

  if (
    target.getFullYear() === now.getFullYear() &&
    target.getMonth() === now.getMonth() &&
    target.getDate() === now.getDate()
  ) {
    return moment(target).format("HH:mm:ss");
  }

  return moment(target).format("YYYY.MM.DD");
};

export default dateFormater;
