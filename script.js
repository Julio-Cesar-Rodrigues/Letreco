const tiles = document.querySelector('.tile-container')

const backspaceAndEnterRow = document.querySelector('#backspaceAndEnterRow')
const keyboardFirstRow = document.querySelector('#keyboardFirstRow')
const keyboardSecondRow = document.querySelector('#keyboardSecondRow')
const keyboardThirdRow = document.querySelector('#keyboardThirdRow')

const keysFirstRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
const keysSecondRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
const keysThirdRow = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']

const rows = 6
const columns = 5
let currentRow = 0
let currentColumn = 0

let letreco = 'VASCO'
let letrecoMap = {}
for (let index = 0; index < letreco.length; index++) {
    letrecoMap[letreco[index]] = index
}
const guesses = []

//instanciando as linhas
for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    guesses[rowIndex] = new Array(columns)
        //adicionar a div e colocar cada elemento com um id confome o index, e uma classe "tile-row"
    const tileRow = document.createElement('div')
    tileRow.setAttribute('id', 'row' + rowIndex)
    tileRow.setAttribute('class', 'tile-row')

    //instanciando as colunas
    for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
        //adicionar a div e colocar cada elemento com um id confome o index, e uma classe "tile-column"
        const tileColumn = document.createElement('div')
        tileColumn.setAttribute('id', 'row' + rowIndex + 'column' + columnIndex)
        tileColumn.setAttribute(
            'class',
            rowIndex === 0 ? 'tile-column typing' : 'tile-column disable'
        )
        guesses[rowIndex][columnIndex] = ''

        tileRow.append(tileColumn)
    }

    tiles.append(tileRow)
}

const checkGuess = () => {
    const guess = guesses[currentRow].join('')
    if (guess.length !== columns) {
        return
    }
    for (let index = 0; index < columns; index++) {
        const letter = guess[index]

        var currentColumns = document.querySelectorAll('.typing')
        if (letrecoMap[letter] === undefined) {
            currentColumns[index].classList.add('wrong')
        } else {
            if (letrecoMap[letter] === index) {
                currentColumns[index].classList.add('right')
            } else {
                currentColumns[index].classList.add('displaced')
            }
        }
    }

    if (guess === letreco) {
        window.alert('se é o bichão mesmo ein')
        return
    } {
        if (currentRow === rows - 1) {
            window.alert('nao deu dessa vez nao ein meu parceiro')
        } else {
            moveToNextRow()
        }
    }
}

const moveToNextRow = () => {
    const typingColumns = document.querySelectorAll('.typing')
    for (let index = 0; index < typingColumns.length; index++) {
        typingColumns[index].classList.remove('typing')
        typingColumns[index].classList.add('disabled')
    }
    currentRow++
    currentColumn = 0

    const currentRowEl = document.querySelector('#row' + currentRow)
    const currentColumns = currentRowEl.querySelectorAll('.tile-column')
    for (let index = 0; index < currentColumns.length; index++) {
        currentColumns[index].classList.remove('disabled')
        currentColumns[index].classList.add('typing')
    }
}

const handleKeyboardOnClick = key => {
    if (currentColumn === columns) {
        return
    }
    //coloca o valor da tecla no elemento e move o proximo valor no proximo elemento
    const currentTile = document.querySelector(
        '#row' + currentRow + 'column' + currentColumn
    )
    currentTile.textContent = key
    guesses[currentRow][currentColumn] = key
    currentColumn++
}

//teclado
const createKeyboardRow = (keys, keyboardRow) => {
    keys.forEach(key => {
        //adiciona um elemento buttom com id refetente a o valor da key, e quando clicar nesse botao imprimir o valor dele na tela
        const buttonElement = document.createElement('button')
        buttonElement.textContent = key
        buttonElement.setAttribute('id', key)
        buttonElement.addEventListener('click', () => handleKeyboardOnClick(key))
        keyboardRow.append(buttonElement)
    })
}

//chamando as fileiras do teclado
createKeyboardRow(keysFirstRow, keyboardFirstRow)
createKeyboardRow(keysSecondRow, keyboardSecondRow)
createKeyboardRow(keysThirdRow, keyboardThirdRow)

const handleBackspace = () => {
    if (currentColumn === 0) {
        return
    }
    currentColumn--
    guesses[currentRow][currentColumn] = ''
    const tile = document.querySelector(
        '#row' + currentRow + 'column' + currentColumn
    )
    tile.textContent = ''
}

//botao apagar
const backspaceButton = document.createElement('button')
backspaceButton.addEventListener('click', handleBackspace)
backspaceButton.textContent = '<'
backspaceAndEnterRow.append(backspaceButton)

//botao enter
const enterButton = document.createElement('button')
enterButton.addEventListener('click', checkGuess)
enterButton.textContent = 'Enter'
backspaceAndEnterRow.append(enterButton)

document.onkeydown = function(event) {
    event = event || window.event
    if (event.key === 'Enter') {
        checkGuess()
    } else if (event.key === 'Backspace') {
        handleBackspace()
    } else {
        handleKeyboardOnClick(event.key.toUpperCase())
    }
}