let defaultColor = 'black'; // default color for drawing
let eraserEnabled = false;
const randomColorButton = document.querySelector('#random-color-btn')
let randomColorEnabled = false
const clearButton = document.querySelector('#clear-button')
const colorPickerButton = document.querySelector('#color-picker-btn')
colorPickerButton.value = defaultColor
const hoverButton = document.querySelector('#hover-btn')
const eraserButton = document.querySelector('#eraser')
const grid = document.querySelector('#grid')
const rangeSlider = document.querySelector("input[type='range']")
const sliderLabel = document.querySelector('label[for="slider"]')
let numberOfSquares = Number(rangeSlider.value)//default value of 20
sliderLabel.textContent = rangeSlider.value + ' X ' + rangeSlider.value

createGrid() // creating grid with default settings

function createGrid(){
    //creatng and adding grid items or boxs to to the grid
    for (let i = 1; i <= numberOfSquares * numberOfSquares; i++){
        const square = document.createElement('div');
        square.classList.add('gridItem') // for adding css hover action
        grid.appendChild(square);
    }

    grid.style.cssText = `display:grid; grid-template-columns: repeat(${numberOfSquares},1fr);
                           grid-template-rows: repeat(${numberOfSquares},1fr) `

}


//functionality for when a grid item or box is clicked
function changeBackground(e){
    //check if randomColorButton is active
    if(randomColorEnabled == true && eraserEnabled == false){
        e.target.style.backgroundColor = generateRandomColor()
    }else{
            //when the randomColorButton is disabled
            //checking if eraser is enabled or not
            if(eraserEnabled){
                e.target.style.cssText = 'background-color: white'
            }
            else{ 
                //when the eraser is disabled
                e.target.style.cssText = `background-color: ${defaultColor}`
            } 
}
    
 }

//adding event Listeners to the grid items
addEventListenerToGridItems()
function addEventListenerToGridItems(){
    gridItems = grid.children;
    gridItemsArr = [...gridItems]
    gridItemsArr.forEach(function (box){
        box.addEventListener('click',changeBackground)
    }) 
}

//functionality for when the eraser button is clicked
function changeEraserStatus(){
    if (eraserEnabled == true){
        //reset the background color so as to show that it has now become inactive
        eraserEnabled = false
        eraserButton.classList.remove('enabled-btn-effect')
    }else{
        // change the background of the eraser button so as to show it is active
        eraserEnabled = true
        eraserButton.classList.add('enabled-btn-effect')
        randomColorButton.classList.remove('enabled-btn-effect')
        randomColorEnabled = false
    }
}

// event listener for the eraser button
eraserButton.addEventListener('click',changeEraserStatus)

//fuctionality for when the slider is changed
function changeGridSize(e){
    sliderLabel.textContent = rangeSlider.value + ' X ' + rangeSlider.value
    numberOfSquares = Number(e.target.value)
    createGrid()
    addEventListenerToGridItems()
}

//adding event Listener to the slider
rangeSlider.addEventListener('input',changeGridSize)

//fuctionality for when the clear button is clicked
function clearGrid(){
    gridItemsArr.forEach(box => box.style.backgroundColor = 'white')
}

//adding eventListener for when the clear button is clicked
clearButton.addEventListener('click',clearGrid)

//function for generating random colors
function generateRandomColor(){
    let red = Math.floor(Math.random() * 256)
    let blue = Math.floor(Math.random() * 256)
    let green = Math.floor(Math.random() * 256)
    color = `rgb(${red},${blue},${green})`
    return color //return value will used by the changeBackground function
}

//functionality for when the random color button is enabled
function changeRandomColorStatus(e){
    //enable the random color button
    if(randomColorEnabled == false){
    randomColorButton.classList.add('enabled-btn-effect')
    randomColorEnabled = true
    eraserButton.classList.remove('enabled-btn-effect')
    eraserEnabled = false
}else {
        //disable the random color button
        randomColorButton.classList.remove('enabled-btn-effect')
        randomColorEnabled = false
        defaultColor = 'black' }
}

//adding eventlister for Random color button
randomColorButton.addEventListener('click',changeRandomColorStatus)


//adding functionality for color picker button
function changeColorOfChoice(e){
    if(randomColorEnabled == true){
    randomColorEnabled = false
    }
    defaultColor = e.target.value 
}

//adding event listener to  color picker button
colorPickerButton.addEventListener('input',changeColorOfChoice)

//adding functionality for hover button
function enableHoverEffect(){
    alert('This feature is not yet available, we are still working on it')
}

//adding event listener for hover btn
hoverButton.addEventListener('click',enableHoverEffect)
