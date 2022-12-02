let defaultColor = 'black'; // default color for drawing
let eraserEnabled = false;
const randomColorButton = document.querySelector('#random-color-btn')
let randomColorEnabled = false
const clearButton = document.querySelector('#clear-button')
const eraserButton = document.querySelector('#eraser')
const grid = document.querySelector('#grid')
const rangeSlider = document.querySelector("input[type='range']")
const sliderLabel = document.querySelector('label')
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
gridItems = grid.children;
gridItemsArr = [...gridItems]
gridItemsArr.forEach(function (box){
    box.addEventListener('click',changeBackground)
})

//functionality for when the eraser button is clicked
function changeEraserStatus(){
    if (eraserEnabled == true){
        //reset the background color so as to show that it has now become inactive
        eraserEnabled = false
        eraserButton.style.backgroundColor = 'white'
    }else{
        // change the background of the eraser button so as to show it is active
        eraserEnabled = true
        eraserButton.style.backgroundColor = 'gray'
    }
}

// event listener for the eraser button
eraserButton.addEventListener('click',changeEraserStatus)

//fuctionality for when the slider is changed
function changeGridSize(e){
    sliderLabel.textContent = rangeSlider.value + ' X ' + rangeSlider.value
    numberOfSquares = Number(e.target.value)
    clearGrid()
    createGrid()
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
    e.target.style.backgroundColor = 'gray'
    e.target.style.color = 'whitesmoke' 
    randomColorEnabled = true  
}else {
        //disable the random color button
        e.target.style.cssText = 'padding: 10px;border: 2px solid rgba(34, 32, 32, 0.712);border-radius: 5px;font-size: 15px;font-family: Arial, Helvetica, sans-serif;color:rgba(34, 32, 32, 0.94);background-color: white;'
        randomColorEnabled = false
        defaultColor = 'black' }
}

//adding eventlister for Random color button
randomColorButton.addEventListener('click',changeRandomColorStatus)
