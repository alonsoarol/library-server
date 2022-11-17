//funcion para devolver una ubicacion de una imagen random segun sexo

const arrPicsMasc = [
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
const arrPicsFem = ["0", "3", "11", "20", "21", "36", "60", "63", "75", "77"];

export const randomPic = (gender) => {
  if (gender === "male") {
    const index = Math.floor(Math.random() * 13);
    const result = `/images/${arrPicsMasc[index]}.jpg`;
    return result;
  }
  const index = Math.floor(Math.random() * 10);
  const result = `/images/${arrPicsFem[index]}.jpg`;
  return result;
};
