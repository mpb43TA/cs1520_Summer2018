"use strict";



function addPromise(){
    //Each of the following todos specify the functions required
    //TODO 1: get input nodes from the form
    //TODO 2: sum all values within in the elements
    //TODO 3: create a div with the sum value
    //TODO 4: change the style to blue
    //TODO 5: create a failureCallback that will
    //            - change the background color to red
     //           - remove the sum node


}

/*
    The overall goal is to use a chain of promises to execute a set of functions
        -   If all inputs are filled properly with numbers, 
            then the screen should be blue and the sum of the numbers should be
            displayed
        -   If some of the components are empty, the promise should fail.
            A failure should result in the screen turning red.           
*/
document.getElementById("form").addEventListener("input", addPromise);