const isAship = (x, y, field) => {
  if (field[x][y].ship) {
    return true
  } else {
    return false
  }
}

const randint = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}


module.exports = {
  isAship,
  randint
}