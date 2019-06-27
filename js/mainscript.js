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
    document.documentElement.addEventListener('click', clickHandler, false);
}

// TODO: List of things to do...
//  - If the user right clicks a cell, it resets the counter to 0 and color to white
//  - Generate a table, tr's and td's via js once a button has been clicked
//  - Consider: Should I do a color picker for the pegs?

//  - DONE: Once a table cell has been clicked, change the background color
//  - DONE: Stagger table rows to create hexagonal shape
//  - DONE: Make the "pegs" circular