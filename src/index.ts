import './styles.css';
import { calculateTipAmount, calculateTotalBill, calculateBillAmountPerPerson } from './math';

const billamountinputcontrol = document.getElementById('billamountinput') as HTMLInputElement;
const billamountdisplaycontrol = document.getElementById('billamountdisplay');
const tippercentagecontrol = document.getElementById('tippercentage');
const customtippercentageinput = document.getElementById('customtippercentageinput') as HTMLInputElement;
const customtipbuttondisplay = document.getElementById('customtipbuttondisplay');
const totalpeoplecontrol = document.getElementById('totalpeople') as HTMLInputElement;
const totalperperson = document.getElementById('totalPerPerson') as HTMLSpanElement;
const tip10 = document.getElementById('button1') as HTMLInputElement;
const tip15 = document.getElementById('button2') as HTMLInputElement;
const tip20 = document.getElementById('button3') as HTMLInputElement;
const tipcustom = document.getElementById('button4') as HTMLInputElement;
const amountoftipcontrol = document.getElementById('amountOfTip') as HTMLSpanElement;
const totalbill = document.getElementById('totalBill') as HTMLSpanElement;

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
setcustomtip(selectedtippercent);

function assigntip(tippercentage: number, tipcontrol: HTMLInputElement) {
    tip10.disabled = false;
    tip15.disabled = false;
    tip20.disabled = false;
    tipcustom.disabled = false;
    tipcontrol.disabled = true;
    setTipPercentage(tippercentage);
    updateDisplay();
}

tip10.addEventListener('click', function () {
    assigntip(.10, tip10);
});

tip15.addEventListener('click', function () {
    assigntip(.15, tip15);
});

tip20.addEventListener('click', function () {
    assigntip(.20, tip20);
});

tipcustom.addEventListener('click', function () {
    setcustomtip(customtippercentageinput.valueAsNumber * .01);
});

function setcustomtip(customtippercent: number) {
    customtip = isNaN(customtippercent) ? 0 : customtippercent;
    customtipbuttondisplay.innerText = (customtip * 100).toFixed(0).toString();
    tipcustom.disabled = true;
    tip20.disabled = false;
    tip15.disabled = false;
    tip10.disabled = false;
    setTipPercentage(customtip);
    updateDisplay();
}


customtippercentageinput.addEventListener('keyup', () => {
    setcustomtip(customtippercentageinput.valueAsNumber * .01);
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
        tippercentagecontrol.innerText = `${(selectedtippercent * 100).toFixed(0)}%`;
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
