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
            // table cell has been clicked, do something
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