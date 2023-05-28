let Partida = {
    Tablero : [
                [0,0,0],
                [0,0,0],
                [0,0,0]
            ],
     Turno : "X",
     Ganador: ""
}

var casillas = document.querySelectorAll(".casilla")
var cuadroFin = document.getElementById("cuadroFin")
var mensajeFin = document.getElementById("MensajeFin")

function EsGanador() {
    let Gano = false

    Gano = AlineacionHorizontal()
    if (!Gano) {
        Gano = AlineacionVertical()
    }
    if (!Gano) {
        Gano = AlineacionDiagonal()
    }
    if (Gano) {
        return Partida.Turno
    } else  {
        return ""
    }
}

function AlineacionHorizontal() {
    let Gano = false
    let IndiceY = 0 
    while (Partida.Tablero.length > IndiceY && !Gano ) { 
        let TresEnLinea = 0
        let IndiceX = 0
        while (Partida.Tablero[IndiceY].length > IndiceX && !Gano) {
            if (Partida.Tablero[IndiceY][IndiceX] == Partida.Turno) {
                TresEnLinea++
            }
            IndiceX++
        }
        if (TresEnLinea == 3) {
            Gano = true
        }
        IndiceY++
    }
    return Gano
}

function AlineacionVertical() {
    let Gano = false
    let IndiceX = 0
    while (Partida.Tablero[0].length >= IndiceX && !Gano ) {
        let IndiceY = 0
        let TresEnLinea = 0
        while (Partida.Tablero.length > IndiceY && !Gano) {
            if (Partida.Tablero[IndiceY][IndiceX-1] == Partida.Turno) {
                TresEnLinea++
            }
            IndiceY++
        }
        if (TresEnLinea == 3) {
            Gano = true
        }
        IndiceX++
    }
    return Gano
}

function AlineacionDiagonal() {
    //Hacerlo iterativo acá es más complicado que simplemente hardcodearlo (porque no hay ninguna ventaja en hacerlo automatico) pero aún así lo intentare hacerlo iterativo
    let Gano = false
    let TresEnLinea = 0

    //Como no se necesita cortar el bucle en el medio se puede usar bucles for
    for (i = 0; Partida.Tablero.length > i; i++ ) {
        if (Partida.Tablero[i][i] == Partida.Turno) {
            TresEnLinea++
        }
    }
    if (TresEnLinea == 3) {
        Gano = true
    }

    if (Gano == false) {
        TresEnLinea = 0
        
        for (let  j = 0, i = 2; Partida.Tablero.length > j; i--, j++ ) {
            if (Partida.Tablero[j][i] == Partida.Turno) {
                TresEnLinea++
            }
        }
        if (TresEnLinea == 3) {
            Gano = true
        }
    }

    return Gano
}

function EsEmpate() {
    let HayEmpate = 0
    for (i = 0; Partida.Tablero.length > i; i++) {
        for (j = 0; Partida.Tablero[i].length > j; j++) {
            if (Partida.Tablero[i][j] != "") {
                HayEmpate++
            }
        }
    }
    if (HayEmpate == 9) {
        return "E"
    } else {
        return ""
    }
}

function EsValido(casilla) {
    return (Partida.Tablero[casilla.getAttribute('posY')][casilla.getAttribute('posX')] != "X"
            && Partida.Tablero[casilla.getAttribute('posY')][casilla.getAttribute('posX')] != "O"
            && Partida.Ganador == "")
}

function CambiarTurno() {
    if (Partida.Turno == "X") {
        Partida.Turno = "O"
    } else {
        Partida.Turno = "X"
    }
}

function SeleccionarCasilla(casilla) {
    Partida.Tablero[casilla.getAttribute('posY')][casilla.getAttribute('posX')] = Partida.Turno
    casilla.innerHTML = Partida.Turno
    if (Partida.Turno == "X") {
        casilla.style.backgroundColor = "#F16E6A"
    } else {
        casilla.style.backgroundColor = "#FECB60"
    }
}

function HayGanador() {
    Partida.Ganador = EsGanador()
    if (Partida.Ganador == "") {
        Partida.Ganador = EsEmpate()
    }
}

function TerminoPartida() {
    if (Partida.Ganador != "") {
        if (Partida.Ganador != "E") {
            mensajeFin.innerHTML = "El jugador " + Partida.Ganador +" ha Ganado!"
        } else {
            mensajeFin.innerHTML = "Hay Empate!"
        }
        cuadroFin.style.visibility = "visible"
        casillas.forEach(casilla => {
            if (casilla.innerHTML != Partida.Ganador) {
                casilla.style.backgroundColor = "#FFFFFF"
                casilla.style.color = "#303030"
            } 
            if (casilla.innerHTML == "") {
                casilla.style.backgroundColor = "#11171E"
                casilla.style.borderColor = "#11171E"
            }
        })
    }
}

function ReiniciarPartida() {
    cuadroFin.style.visibility = "hidden"
    Partida.Tablero = [[0,0,0],[0,0,0],[0,0,0]]
    Partida.Ganador = ""
    Partida.Turno = "X"
    casillas.forEach(casilla => {
        casilla.style.backgroundColor = "#11171E"
        casilla.style.borderColor = "whitesmoke"
        casilla.style.color = "#FFFFFF"
        casilla.innerHTML = ""
    })
}

function main() {
    casillas.forEach(casilla => {
        casilla.addEventListener('mouseover', () => {
            if (EsValido(casilla)){
                casilla.style.backgroundColor = "#838CA7"
                casilla.innerHTML = Partida.Turno
            }
        })
    
        casilla.addEventListener("click", () => {
            if (EsValido(casilla)){
                
                SeleccionarCasilla(casilla)
                HayGanador()
                TerminoPartida()
                CambiarTurno()
            }
        })
    
        casilla.addEventListener('mouseout', () => {
            if (EsValido(casilla)){
                casilla.innerHTML = ""
                casilla.style.backgroundColor = "#11171E"
            }})
      })
}


main()


// //Pruebo con elementos vacíos
// console.log(EsGanador())

// //Pruebo con operaciones sin ganadores
// Partida.Tablero = [[0,0,"X"],[0,0,0],[0,0,"X"]]
// console.log(EsGanador())
// Partida.Tablero = [[0,"X","X"],[0,0,0],["X",0,"X"]]
// console.log(EsGanador())
// Partida.Tablero = [["X",0,"X"],["X",0,0],[0,0,"X"]]
// console.log(EsGanador())
// Partida.Tablero = [[0,"X","X"],["X",0,0],["X",0,0]]
// console.log(EsGanador())
// Partida.Tablero = [["X",0,"X"],[0,0,0],["X",0,"X"]]
// console.log(EsGanador())

// //Pruebo con Operaciones Ganadoras
// Partida.Tablero = [[0,0,"X"],[0,0,"X"],[0,0,"X"]]
// console.log(EsGanador())
// Partida.Tablero = [[0,"X",0],[0,"X",0],[0,"X",0]]
// console.log(EsGanador())
// Partida.Tablero = [["X",0,0],["X",0,0],["X",0,0]]
// console.log(EsGanador())

// Partida.Tablero = [["X","X","X"],[0,0,0],[0,0,0]]
// console.log(EsGanador())
// Partida.Tablero = [[0,0,0],["X","X","X"],[0,0,0]]
// console.log(EsGanador())
// Partida.Tablero = [[0,0,0],["X","X",0],["X","X","X"]]
// console.log(EsGanador())

// Partida.Tablero = [["X",0,"X"],[0,"X",0],[0,0,"X"]]
// console.log(EsGanador())
// Partida.Tablero = [[0,0,"X"],[0,"X",0],["X","X",0]]
// console.log(EsGanador())

// // Ahora con O
// Partida.Turno = "O"

// Partida.Tablero = [[0,0,"O"],[0,0,"O"],[0,0,"O"]]
// console.log(EsGanador())
// Partida.Tablero = [[0,"O",0],[0,"O",0],[0,"O",0]]
// console.log(EsGanador())
// Partida.Tablero = [["O",0,0],["O",0,0],["O",0,0]]
// console.log(EsGanador())

// Partida.Tablero = [["O","O","O"],[0,0,0],[0,0,0]]
// console.log(EsGanador())
// Partida.Tablero = [[0,0,0],["O","O","O"],[0,0,0]]
// console.log(EsGanador())
// Partida.Tablero = [[0,0,0],["O","O",0],["O","O","O"]]
// console.log(EsGanador())

// Partida.Tablero = [["O",0,"O"],[0,"O",0],[0,0,"O"]]
// console.log(EsGanador())
// Partida.Tablero = [[0,0,"O"],[0,"O",0],["O","O",0]]
// console.log(EsGanador())


// // Conflicto de Jugadores

// Partida.Tablero = [["O",0,"O"],[0,"O",0],[0,0,"O"]]
// console.log(EsGanador())
// Partida.Tablero = [["X","X","O"],[0,"O","X"],["O","O","X"]]
// console.log(EsGanador())

// // Test de estado invalido gano al que no le toca ??
// Partida.Tablero = [["O","O","X"],[0,"X","O"],["X","X","O"]]
// console.log(EsGanador())

// //Nadie Ganó
// Partida.Tablero = [["X","O","X"],["X","O","O"],["O","X","O"]]
// console.log(EsGanador())