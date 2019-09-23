import './styles.css';
import { calculateTipAmount, calculateTotalBill, calculateBillAmountPerPerson } from './math';

const billamountinputcontrol = document.getElementById('billamountinput') as HTMLInputElement;
const billamountdisplaycontrol = document.getElementById('billamountdisplay');
const tippercentagecontrol = document.getElementById('tippercentage');
const customtippercentageinput = document.getElementById('customtippercentageinput') as HTMLInputElement;
const customtipbuttondisplay = document.getElementById('customtipbuttondisplay');
const totalpeoplecontrol = document.getElementById('totalpeople') as HTMLInputElement;
const totalperperson = document.getElementById('totalPerPerson') as HTMLSpanElement;

let totalperson: number;
totalperson = 1;
let totalbillamountperperson: number;
totalbillamountperperson = 0;
let tipAmounts: number;
tipAmounts = 0;
let selectedtippercent: number;
selectedtippercent = retrieveLocalStorage();
let totalbillamount: number;
totalbillamount = 0;
let customtip: number;
customtip = 0;

const tip10 = document.getElementById('button1') as HTMLInputElement;
const tip15 = document.getElementById('button2') as HTMLInputElement;
const tip20 = document.getElementById('button3') as HTMLInputElement;
const tipcustom = document.getElementById('button4') as HTMLInputElement;

const amountoftipcontrol = document.getElementById('amountOfTip') as HTMLSpanElement;
const totalbill = document.getElementById('totalBill') as HTMLSpanElement;

tip10.addEventListener('click', function (args: any) {
    console.log(args);
    clearCustomTipDisplay();
    tip10.disabled = true;
    tip15.disabled = false;
    tip20.disabled = false;
    tipcustom.disabled = false;
    setTipPercentage(.10);

    updateDisplay();
});

tip15.addEventListener('click', function () {
    // clearCustomTipDisplay();
    tip15.disabled = true;
    tip20.disabled = false;
    tip10.disabled = false;
    tipcustom.disabled = false;
    setTipPercentage(.15);

    updateDisplay();
});

tip20.addEventListener('click', function () {
    // clearCustomTipDisplay();
    tip20.disabled = true;
    tip15.disabled = false;
    tip10.disabled = false;
    tipcustom.disabled = false;
    setTipPercentage(.2);
    updateDisplay();
});

tipcustom.addEventListener('click', function () {
    // pull the number out of the text box
    // use this number to be set to the set tip percentage
    tipcustom.disabled = true;
    tip10.disabled = false;
    tip15.disabled = false;
    tip20.disabled = false;
    updateDisplay();

});

customtippercentageinput.addEventListener('keyup', () => {
    customtip = customtippercentageinput.valueAsNumber * .01;
    if (isNaN(customtip)) {
        customtip = 0;
    } else {
        customtipbuttondisplay.innerText = (customtip * 100).toString();
        tipcustom.disabled = true;
        tip20.disabled = false;
        tip15.disabled = false;
        tip10.disabled = false;
        setTipPercentage(customtip);
        updateDisplay();
    }
});

totalpeoplecontrol.addEventListener('keyup', () => {
    updateDisplay();
});

billamountinputcontrol.addEventListener('keyup', () => {
    clearDisplay();
    updateDisplay();
});

// sets tippercentage; stores the local in the browser
function setTipPercentage(a: number) {
    selectedtippercent = a;
    window.localStorage.setItem('tippercentage', a.toString());
}

function retrieveLocalStorage(): number {
    const previouslyselectedtippercent = window.localStorage.getItem('tippercentage');
    if (!previouslyselectedtippercent) {
        return 0;
    } else {
        // returns number or undefined
        const returnval = parseFloat(previouslyselectedtippercent);
        if (!returnval) {
            return 0;
        } else {
            return returnval;
        }
    }
}

function updateDisplay() {
    if (billamountinputcontrol.valueAsNumber < 0) {
        billamountinputcontrol.classList.add('error');
        clearDisplay();
        billamountdisplaycontrol.innerText = 'ERROR! Number must be greater than 0.';
        return;
    }
    if (totalpeoplecontrol.valueAsNumber < 0) {
        totalpeoplecontrol.classList.add('error');
        clearDisplay();
        totalperperson.innerText = 'ERROR! Number must be greater than 0.';
        return;
    }
    if (customtippercentageinput.valueAsNumber < 0) {
        customtippercentageinput.classList.add('error');
        clearDisplay();
        billamountdisplaycontrol.innerText = 'ERROR! Number must be greater than 0.';
        return;
    }
    let billamount = billamountinputcontrol.valueAsNumber;
    if (isNaN(billamount)) {
        billamount = 0;
    } else {
        tipAmounts = calculateTipAmount(billamountinputcontrol.valueAsNumber, selectedtippercent);
        billamountdisplaycontrol.innerText = '$' + billamount.toString();
        const totalSum = calculateTotalBill(billamount, tipAmounts);
        totalbill.innerText = '$' + totalSum.toFixed(2).toString();
        amountoftipcontrol.innerText = '$' + tipAmounts.toFixed(2).toString();
        tippercentagecontrol.innerText = `${(selectedtippercent * 100).toFixed(2)}%`;
        totalbillamountperperson = calculateBillAmountPerPerson(totalSum, totalpeoplecontrol.valueAsNumber);
    }
    let numberofpeople = totalpeoplecontrol.valueAsNumber;
    if (isNaN(numberofpeople)) {
        numberofpeople = 0;
    } else {
        totalpeoplecontrol.innerText = numberofpeople.toString();
        totalperperson.innerText = '$' + (totalbillamountperperson.toFixed(2));
    }
}

// function clearTotalPerPersonDisplay() {
//     const clearform = ' ';
//     totalperperson.innerText = clearform.toString();
// }

function clearDisplay() {
    const clearform = ' ';
    billamountdisplaycontrol.innerText = clearform.toString();
    tippercentagecontrol.innerText = clearform.toString();
    amountoftipcontrol.innerText = clearform.toString();
    totalbill.innerText = clearform.toString();
    customtippercentageinput.innerText = clearform.toString();
    totalperperson.innerText = clearform.toString();
}

function clearCustomTipDisplay() {
    const clearform = ' ';
    customtipbuttondisplay.innerText = clearform.toString();
}
