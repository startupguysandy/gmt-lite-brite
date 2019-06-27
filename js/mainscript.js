if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runCode)
} else {
    runCode()
}

function runCode() {
    //
    // Variables
    //


    //
    // Methods
    //
    function clickHandler(event){
        if((event.target.localName === 'td') && (event.target.className !== 'indent')){
            cycleColors(event.target);
        }
    }

    function generateTable(){
        let smallBoard = {rows:19,pegs:25};
        let mediumBoard = {rows:29,pegs:35};
        let largeBoard = {rows:39,pegs:45};

        let appElement = document.getElementById('app');
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
                }
            }
            appElement.appendChild(tableElement);
        }

    }

    function cycleColors(currentCell){
        let cellColors = ['yellow','blue','pink','orange','green','white'];
        let currentCounter = parseInt(currentCell.getAttribute('data-counter'));
        let nextCounter = currentCounter+1;

        if(currentCounter !== 5){
            currentCell.setAttribute('data-counter', nextCounter);
            currentCell.className = cellColors[nextCounter];
        } else {
            currentCell.setAttribute('data-counter', 0);
            currentCell.className = cellColors[0];
        }
    }
    
    //
    // Initializations
    //
    generateTable();
    document.documentElement.addEventListener('click', clickHandler, false);
}

// TODO: List of things to do...
//  - If the user right clicks a cell, it resets the counter to 0 and color to white
//  - Generate a table, tr's and td's via js once a button has been clicked
//  - Add color picker for pegs
//  - Animate in the table once it's generated to add some excitement
//  - Add a "turn on" button on the board which makes all the lights brighter. Brings the whole thing to life!


//  - DONE: Once a table cell has been clicked, change the background color
//  - DONE: Stagger table rows to create hexagonal shape
//  - DONE: Make the "pegs" circular