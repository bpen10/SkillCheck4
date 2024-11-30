


function myRandom(lowNum, highNum){

    let returnVal = -1
    if(typeof lowNum == "number" && typeof highNum == "number"){
        if(highNum < lowNum){
            console.log("The end number should be >= the lower number");
        }
        else {
            returnVal = Math.floor(Math.random()*(highNum-lowNum)) + lowNum;
        }
    }
    else {
        console.log("The entered numers were not integers");
    }

    return returnVal
}
function checkGuess(guess, randNum){
    let returnVal = "";
    if(guess == randNum){
        returnVal = "W"
    }
    else if (guess>randNum){
        returnVal = "H"
    }
    else {
        returnVal = "L"
    }
}
function genMessage(mType, guessCn){
    let returnMessage = ""
    if(mType == "H"){
        returnMessage = "Too high. You have guessed " + guessCn + " times";
    }
    else if(mType == "L"){
        returnMessage = "Too low. You have guessed " + guessCn + " times";
    }
    else {
        returnMessage = "Great Job! You guessed it in " + guessCn + " guesses";
    }

    return returnMessage
}