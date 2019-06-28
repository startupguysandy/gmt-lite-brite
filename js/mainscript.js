if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runCode)
} else {
    runCode()
}

function runCode() {
    //
    // Variables
    //
    let boardElement = document.getElementById('app').getElementsByClassName('board')[0];
    let toolsElement = document.getElementById('app').getElementsByClassName('tools')[0];
    let pegColors = {
        yellow: '#fed231',
        blue: '#2eacdd',
        pink: '#cb5aa2',
        orange: '#f2952e',
        green: '#8ec348',
        white: '#efefef'
    };
    let selectedColor = 'yellow';
    let previousColor;
    //
    // Methods
    //
    function generateTable(){
        let smallBoard = {rows:19,pegs:25};
        let mediumBoard = {rows:29,pegs:35};
        let largeBoard = {rows:39,pegs:45};

        let playArea = mediumBoard;
        let requiredRows = playArea.rows;
        let requiredPegs = playArea.pegs;

        for(let row=0; row<=requiredRows-1; row++){
            let tableElement = document.createElement('table');
            let rowElement = tableElement.insertRow(0);
            for(let i=0; i<=requiredPegs-1; i++){
                let cell = rowElement.insertCell(i);
                if((row%2 !== 0) && (i===0)){
                    cell.classList.add('indent');
                } else {
                    cell.innerHTML = '<span></span>';
                }
            }
            boardElement.appendChild(tableElement);
        }

    }

    function clickHandler(event){
        if(validateIfWithinCell(event) !== false) {
            let currentCell = validateIfWithinCell(event);
            placePeg(currentCell);
        }
        let parentElement = event.target.parentElement;
        if(event.target.localName === 'input' && parentElement.getElementsByTagName('span')[0].getAttribute('data-color')){
            selectColor(previousColor,parentElement.getElementsByTagName('span')[0]);
        }
    }

    function hoverHandler(event){
        if(validateIfWithinCell(event) !== false){
            let currentCell = validateIfWithinCell(event);
            hoverPeg(currentCell);
        }
    }

    function exitHandler(event){
        if(validateIfWithinCell(event)){
            let currentCell = validateIfWithinCell(event);
            removePeg(currentCell);
        }
    }

    function validateIfWithinCell(eventListener) {
        if(eventListener.target.parentElement){
            let parentElement = eventListener.target.parentElement;
            if(eventListener.target.localName === 'td' || parentElement.localName ==='td'){
                let currentCell = eventListener.target.localName === 'span' ? parentElement : eventListener.target;
                if(currentCell.className !== 'indent'){
                    return currentCell;
                }
            }
        }
        return false;
    }

    function generateColors(){
        let colorSwitcher = document.getElementsByClassName('peg-colors')[0];

        Object.keys(pegColors).forEach(function(color,index){
            let labelElement = document.createElement('label');
            let radio = document.createElement('input');
            let span = document.createElement('span');

            if(index===0){ radio.checked = true }
            radio.setAttribute('type', 'radio');
            radio.setAttribute('name','peg-color');

            span.classList.add('radio');
            span.setAttribute('data-color',color);
            span.style.backgroundColor = pegColors[color];
            span.style.border = '2px solid' + pegColors[color];

            labelElement.appendChild(radio);
            labelElement.appendChild(span);

            colorSwitcher.appendChild(labelElement);
        });
        toolsElement.appendChild(colorSwitcher);
    }

    function selectColor(previousElement,newElement) {
        let oldColor = previousElement.getAttribute('data-color');
        let newColor = newElement.getAttribute('data-color');

        previousElement.style.borderColor = pegColors[oldColor];
        newElement.style.borderColor = '#333333';

        previousColor = newElement;
        selectedColor = newColor;
    }
    
    function hoverPeg(currentCell) {
        currentCell.className = selectedColor;
        currentCell.innerHTML = '';
    }

    function placePeg(currentCell){
        currentCell.className = selectedColor;
        currentCell.innerHTML = '';
    }

    function removePeg(currentCell){
        let span = document.createElement('span');

        currentCell.appendChild(span);
        currentCell.className = '';
    }
    
    //
    // Initializations
    //
    generateTable();
    generateColors();
    document.documentElement.addEventListener('click', clickHandler, false);
    document.documentElement.addEventListener('mouseover', hoverHandler, true);
    document.documentElement.addEventListener('mouseout', exitHandler, true);


    // Set current color to yellow
    previousColor = toolsElement.querySelector('[data-color="yellow"]');
    selectColor(previousColor,previousColor);
}

// TODO: List of things to do...
//  - If the user right clicks a cell, it resets the counter to 0 and color to white
//  - Generate a table, tr's and td's via js once a button has been clicked
//  - Animate in the table once it's generated to add some excitement
//  - Add a "turn on" button on the board which makes all the lights brighter. Brings the whole thing to life!
//  - Work out how to throttle or debounce so the onHover doesn't bug out. I think I need to find a way of throttling the id="app" to get it to work, each td element doesn't work.

//  - Add on hover to show placement of next peg
//  - DONE: Add color picker for pegs
//  - DONE: Once a table cell has been clicked, change the background color
//  - DONE: Stagger table rows to create hexagonal shape
//  - DONE: Make the "pegs" circular