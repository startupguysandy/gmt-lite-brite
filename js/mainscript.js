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
        // 3 board sizes: small, medium, large
        // use a counter and then forEach through them to create the table sizes
        // if a small table is selected, we would have maybe 6 rows with 8 pegs in each
        // a medium table could be 10 rows with 16 pegs each
        // use modulo math to work out if we need to add the 'indent' class on the first cell or not

        let playArea = document.getElementById('app');
        let requiredRows = 2;

        for(let row=1; row<=requiredRows; row++){
            let tableElement = document.createElement('table');
            let rowElement = tableElement.insertRow(0);
            for(let i=0; i<=4; i++){
                let cell = rowElement.insertCell(i);
                cell.setAttribute('data-counter',0);
            }
            playArea.appendChild(tableElement);
        }

    }

    function cycleColors(currentCell){
        //white, yellow, blue, pink, orange and green
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