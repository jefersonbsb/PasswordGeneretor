let passwordLength = 16;
const inputEl = document.querySelector("#password");
const upperCaseCheckEl = document.querySelector("#uppercase-chek");
const numberCaseCheckEl = document.querySelector("#number-chek");
const symbolCaseCheckEl = document.querySelector("#symbol-chek");
const securityIndicatorBarEl = document.querySelector("#security-indicator-bar");

upperCaseCheckEl.addEventListener("click", genPass)
numberCaseCheckEl.addEventListener("click", genPass)
symbolCaseCheckEl.addEventListener("click", genPass)

document.querySelector("#copy-1").addEventListener("click", copy);
document.querySelector("#copy-2").addEventListener("click", copy);
document.querySelector("#renew").addEventListener("click", genPass);
renew

function genPass(){

    let chars = "abcdefghjklmnpqrstuvwxyz";

    const upperCaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "?!@#$%^&*()[]";

    
    if (upperCaseCheckEl.checked){
        chars += upperCaseChars
    }

    if (numberCaseCheckEl.checked){
        chars += numberChars
    }

    if (symbolCaseCheckEl.checked){
        chars += symbolChars
    }
   

    let password = "";

    for (let i = 0; i < passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length);

        password += chars.substring(randomNumber, randomNumber + 1);
 
    };
    
    inputEl.value = password;
    calculateQuality();
    calculateFontSize();

};

function calculateQuality(){
    const percent = Math.round(
        (passwordLength / 64) * 25 + 
        (upperCaseCheckEl.checked ? 15 : 0) +
        (numberCaseCheckEl.checked ? 25 : 0) + 
        (symbolCaseCheckEl.checked ? 35 : 0));

    console.log(percent);

    securityIndicatorBarEl.style.width = `${percent}%`;

    if (percent > 69) {
        securityIndicatorBarEl.classList.remove("critical");
        securityIndicatorBarEl.classList.remove("warning");
        securityIndicatorBarEl.classList.add("safe");
    }else if (percent > 50){
        securityIndicatorBarEl.classList.remove("critical");
        securityIndicatorBarEl.classList.add("warning");
        securityIndicatorBarEl.classList.remove("safe");
    }else{
        securityIndicatorBarEl.classList.add("critical");
        securityIndicatorBarEl.classList.remove("warning");
        securityIndicatorBarEl.classList.remove("safe");
    }

    if (percent >= 100){
        securityIndicatorBarEl.classList.add("completed");
    }else{
        securityIndicatorBarEl.classList.remove("completed");
    }
}

function calculateFontSize(){
    if (passwordLength > 45){
        inputEl.classList.remove("font-sm");
        inputEl.classList.remove("font-xs");
        inputEl.classList.add("font-xxs");
    }else if (passwordLength > 32){
        inputEl.classList.remove("font-sm");
        inputEl.classList.add("font-xs");
        inputEl.classList.remove("font-xxs");
    }else if(passwordLength > 22){
        inputEl.classList.add("font-sm");
        inputEl.classList.remove("font-xs");
        inputEl.classList.remove("font-xxs");
    }else{
        inputEl.classList.remove("font-sm");
        inputEl.classList.remove("font-xs");
        inputEl.classList.remove("font-xxs");
    }
}

function copy(){
    navigator.clipboard.writeText(inputEl.value);
};



const passwordlengthEl1 = document.querySelector("#password-length");
passwordlengthEl1.addEventListener("input", () => {

    passwordLength = passwordlengthEl1.value;
    document.querySelector('#password-length-text').innerHTML = passwordLength;

    genPass();
});

genPass();