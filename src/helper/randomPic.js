const arrPicsM = [
  "1",
  "4",
  "23",
  "31",
  "32",
  "35",
  "43",
  "51",
  "65",
  "66",
  "68",
  "69",
  "70",
];
const arrPicsF = ["0", "3", "11", "20", "21", "36", "60", "63", "75", "77"];

export const randomPic = (gender) => {
  if (gender === "male") {
    const index = Math.floor(Math.random() * 13);
    const result = `/images/${arrPicsM[index]}.jpg`;
    return result;
  }
  const index = Math.floor(Math.random() * 10);
  const result = `/images/${arrPicsF[index]}.jpg`;
  return result;
};
