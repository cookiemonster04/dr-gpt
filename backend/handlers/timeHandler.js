const getTime = () => {
  const time = new Date();

  const year = time.getFullYear().toString().substring(2);
  const month = (time.getMonth() + 1).toString().padStart(2, "0");
  const day = time.getDate().toString().padStart(2, "0");
  const hour = time.getHours().toString().padStart(2, "0");
  const minute = time.getMinutes().toString().padStart(2, "0");

  const formattedDate = `${month}/${day}/${year} ${hour}:${minute}`;
  return formattedDate;
};

export default getTime;
