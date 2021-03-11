const express = require("express")
const app = new express()
const PORT = 8080
const utils = require("./utils")
const field = []
const ships = []

const W = process.argv[2] || 10
const H = process.argv[3] || 10
const S = process.argv[4] || 10

for (let y = 0; y < H; y++) {
  const row = []
  for (let x = 0; x < W; x++) {
    row.push({
      team: null,
      x,
      y,
      ship: null,
      hit: false
    })
  }
  field.push(row)
}

for (let i = 0; i < S; i++) {
  const maxHp = utils.randint(2, 4)
  const ship = {
    id: `ship_${i}`,
    x: utils.randint(0, W - 1),
    y: utils.randint(0, H - 1),
    vertical: utils.randint(0, 1),
    maxHp,
    curHp: maxHp,
    alive: true,
    killTeam: null
  }

  while (true) {
    let count = 0
    for (let e = 0; e < ship.maxHp; e++) {
      const x = ship.vertical ? ship.x : ship.x + e
      const y = ship.vertical ? ship.y + e : ship.y
      if (x > (W - 1)  || y > (H - 1)) {
        count += 1
        break
      } else {
        if (utils.isAship(x, y, field)) {
          console.log("SONO QUI")
          count += 1
        }
      }
    }
    if (count === 0) {
      break
    } else {
      ship.x = utils.randint(0, W - 1)
      ship.y =  utils.randint(0, H - 1)
    }
  }
  ships.push(ship)

  for (let e = 0; e < ship.maxHp; e++) {
    const x = ship.vertical ? ship.x : ship.x + e
    const y = ship.vertical ? ship.y + e : ship.y
    field[y][x].ship = ship
  }
}
console.log(ships)


app.get("/", ({ query: { format } }, res) => {
  if (format === "json") {
    res.json(field)
  } else {
    // html format field
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>battaglia navale</title>
      <style>
        table, td, th {
          border: 1px solid black;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
        }
      </style>
    </head>
    <body>
      <table>
        <tbody>
          ${field.map(row => `<tr>${row.map(cell => `<td>${cell.ship ? cell.ship.id : "O"}</td>`).join("")}</tr>`).join("")}
        </tbody>
      </table>
    </body>
    </html>
    `)
  }
})

app.get("/score", (req, res) => {
  res.json([])
})

app.get("/fire", ({ query: { x, y, team } }, res) => {
  res.json({
    x, y, team
  })
})

app.all("*", (req, res) => {
  res.sendStatus(404)
})

app.listen(PORT, () => console.log("App listening on port %O", PORT))