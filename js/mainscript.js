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
    let newColor = 'yellow';
    let currentColor;
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
                cell.setAttribute('data-counter',0);
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
        if((event.target.localName === 'td') || (event.target.parentElement && event.target.parentElement.localName ==='td')){
            let currentCell = event.target.localName === 'span' ? event.target.parentElement : event.target;
            if(currentCell.className !== 'indent'){
                placePeg(currentCell);
            }
        }
        if(event.target.hasAttribute('data-color')){
            currentColor.style.borderColor = pegColors[currentColor.parentElement.getAttribute('data-color')];
            newColor = event.target.getAttribute('data-color');
            currentColor = toolsElement.querySelector('[data-color="'+newColor+'"]').getElementsByTagName('span')[0];
            event.target.parentElement.getElementsByTagName('span')[0].style.borderColor = '#333333';
        }
    }

    function generateColors(){
        let colorSwitcher = document.getElementsByClassName('peg-colors')[0];

        Object.keys(pegColors).forEach(function(color){
            let labelElement = document.createElement('label');
            let radio = document.createElement('input');
            let span = document.createElement('span');

            labelElement.setAttribute('data-color',color);
            radio.setAttribute('type', 'radio');
            radio.setAttribute('name','peg-color');
            radio.setAttribute('data-color',color);
            span.classList.add('radio');
            span.style.backgroundColor = pegColors[color];
            span.style.border = '2px solid' + pegColors[color];

            labelElement.appendChild(radio);
            labelElement.appendChild(span);

            colorSwitcher.appendChild(labelElement);
        });
        toolsElement.appendChild(colorSwitcher);
    }

    function placePeg(currentCell){
        currentCell.className = newColor;
        currentCell.innerHTML = '';
    }

    function removePeg(currentCell){
        currentCell.createElement('span');
    }
    
    //
    // Initializations
    //
    generateTable();
    generateColors();
    document.documentElement.addEventListener('click', clickHandler, false);

    // Set current color to yellow
    currentColor = toolsElement.querySelector('[data-color="yellow"]').getElementsByTagName('span')[0];
}

// TODO: List of things to do...
//  - Add on hover to show placement of next peg
//  - If the user right clicks a cell, it resets the counter to 0 and color to white
//  - Generate a table, tr's and td's via js once a button has been clicked
//  - Animate in the table once it's generated to add some excitement
//  - Add a "turn on" button on the board which makes all the lights brighter. Brings the whole thing to life!

//  - DONE: Add color picker for pegs
//  - DONE: Once a table cell has been clicked, change the background color
//  - DONE: Stagger table rows to create hexagonal shape
//  - DONE: Make the "pegs" circular