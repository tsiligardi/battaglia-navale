const getShip = (x, y, field) => {
  return field[x][y].ship
}


const randint = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}


module.exports = {
  getShip,
  randint
}