const width = 25
const height = 25

const table = document.getElementById("grid")
const reset = document.getElementById("reset")
const flip = document.getElementById("flip")
const drawBtn = document.getElementById("draw")
const eraseBtn = document.getElementById("erase")
const modeWindow = document.getElementById("mode-window")
const cells = []
let mode = 1 // 1 = draw. 0 = erase.
let mousePressed = true;

document.addEventListener("mousedown", () => {
    mousePressed = true
})
document.addEventListener("mouseup", () => {
    mousePressed = false
})


for (let i = 0; i < height; i++) {
    const row = document.createElement("tr")
    let rowClass = `table-row`
    let rowId = `r${i}`
    row.classList.add(rowClass)
    row.classList.add(rowId)

    for (let j = 0; j < width; j++) {
        const cell = document.createElement("td")
        let cellClass = "table-cell"
        let cellId = `c${i}-${j}`
        cell.classList.add(cellClass)
        cell.classList.add(cellId)
        cell.classList.add("dead")
        cell.addEventListener("mousedown", () => {
            cell.classList.toggle("active")
            cell.classList.toggle("dead")
        })
        cell.addEventListener("mouseenter", () => {
            if (mousePressed) {
                if (mode) { // draw mode
                    cell.classList.add("active")
                    cell.classList.remove("dead")
                }
                else {
                    cell.classList.add("dead")
                    cell.classList.remove("active")
                }
            }
        })
        row.appendChild(cell)
        cells.push(cell)
    }
    table.appendChild(row)
}


reset.addEventListener("click", () => {
    for (let cell of cells) {
        cell.classList.add("dead")
        cell.classList.remove("active")
    }
})

function swapCells() {
    for (let c of cells) {
        c.classList.toggle("active")
        c.classList.toggle("dead")
    }
}

flip.addEventListener("click", swapCells)
modeWindow.classList.add("draw-mode")

drawBtn.addEventListener("click", () => {
    mode = 0 // Change to erase mode
    modeWindow.classList.add("erase-mode")
    modeWindow.classList.remove("draw-mode")
})

eraseBtn.addEventListener("click", () => {
    mode = 1 // Change to draw mode
    modeWindow.classList.add("draw-mode")
    modeWindow.classList.remove("erase-mode")
})


