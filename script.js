const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';



let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();

function handleSlider(){
    inputSlider.value =passwordLength;
    lengthDisplay.innerText = passwordLength;
}

function setIndicator(color){
    indicator.style.backgroundColor =color;
}

function getRndInteger(min, max){
    return Math.floor(Math.random()*(max-min))+min;
}

function generateRandomNumbers(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
    return String.frommCharCode(getRngInteger(97,123));
}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}
function generateSymbol(){
    const randNUm = getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength(){
     let hasUpper = false;
     let hasLower = false;
     let hasNumber = false;
     let hasSymbol = false;

     if(uppercaseCheck.checked) hasUpper = true;
     if(lowercaseCheck.checked) hasLower = true;
     if(numbersCheck.checked) hasNumber = true;
     if(symbolsCheck.checked) hasSymbol = true;

     if(hasUpper && hasLower && (hasNumber || hasSymbol)&&passwordLength>=8){
        setIndicator("green");
     }else if((hasNumber || hasSymbol)&&(hasLower||hasUpper)&&passwordLength>=6){
        setIndicator("orange");
     }
     else{
        setIndicator("red");
    }
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText ="copied";
    }
    catch(e){
        copyMsg.innerText = "Failed";
    }
    copyMsg.classList.add("active");
    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);
}

function shufflePassword(array){
    // Fisher Yates Method 
    for(let i= array.length -1;i >0; i-- ) {
        const j = math.floor(Math.random() * (i+1));
        const temp = array[i];
        array[i] = array[j];
        array[i] = temp;
    }
    let str ="";
    array.forEach((el) => (str +=el));
    return str
}

function handleCheckBoxChange(){
    checkCount =0;
    allCheckBox.forEach((checkbox) => {
        if(checkbox.checked)
            checkCount++;
    })

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange)
})

inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click', () =>{
    if(passwordDisplay.value)
        copyContent();  
})

generateBtn.addEventListener('click', ()=>{
    if(checkCount==0)return;
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }

    password ="";
    // if(uppercaseCheck.checked || lowercaseCheck.checked || symbolsCheck.checked ||){

    // }
    // if(uppercaseCheck.checked){
    //     password += generateUpperCase();
    // }
    // if(lowercaseCheck.checked){
    //     password += generateLowerCase();
    // }
    // if(numbersCheck.checked){
    //     password += generateRandomNumbers();
    // }
    // if(symbolsCheck.checked){
    //     password += generateSymbol();
    // }
    console.log("print 1")
    let funcArr =[];
    if(uppercaseCheck.checked){
        funcArr.push(generateUpperCase); 
    }
    console.log("print 2")

    if(lowercaseCheck.checked){
        funcArr.push(generateLowerCase);
    }
    console.log("print 3")

    if(numbersCheck.checked){
        funcArr.push(generateRandomNumbers);
    }
    console.log("print 4")

    if(symbolsCheck.checked){
        funcArr.push(generateSymbol);
    }
    console.log("print 5")

    for(let i =0; i<funcArr.length; i++){
        password += funcArr[i]();
    }
    console.log("print 6")

    for(let i=0; i<passwordLength-funcArr.length; i++){
        let randIndex = getRndInteger(0, funcArr.length);
        password += funcArr[randIndex]();
    }
    console.log("print 7")
        
    password = shufflePassword(Array.from(password));
    console.log("print 8")

    passwordDisplay.value =password;
    calcStrength();
    console.log("print 9")

})