const express = require("express")
const app = new express()
const PORT = 8080

const field = []
const ships = []

const W = process.argv[2] || 10
const H = process.argv[3] || 10
const S = 1// process.argv[4] || 10

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
  const ship = {
    id: "pino",
    x: 3,
    y: 3,
    vertical: false,
    maxHp: 4,
    curHp: 4,
    alive: true,
    killTeam: null
  }

  ships.push(ship)

  for (let e = 0; e < ship.maxHp; e++) {
    const x = ship.vertical ? ship.x : ship.x + e
    const y = ship.vertical ? ship.y + e : ship.y
    field[y][x].ship = ship
  }
}


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
          ${field.map(row => `<tr>${row.map(cell => `<td>${cell.ship ? cell.ship.id : "acqua"}</td>`).join("")}</tr>`).join("")}
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