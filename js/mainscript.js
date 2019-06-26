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
        console.log(event);
        if(event.target.localName === 'td'){
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
//  - Once a table cell has been clicked, change the background color
//  - Generate a table, tr's and td's via js once a button has been clicked