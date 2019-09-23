import './styles.css';
import { calculateTipAmount, calculateTotalBill, calculateBillAmountPerPerson } from './math';

const billamountinputcontrol = document.getElementById('billamountinput') as HTMLInputElement;
const billamountdisplaycontrol = document.getElementById('billamountdisplay');
const tippercentagecontrol = document.getElementById('tippercentage');
const customtippercentageinput = document.getElementById('customtippercentageinput') as HTMLInputElement;
const totalpeoplecontrol = document.getElementById('totalpeople') as HTMLInputElement;
const totalperperson = document.getElementById('totalPerPerson') as HTMLSpanElement;

let totalperson: number;
totalperson = 1;
let totalbillamountperperson: number;
totalbillamountperperson = 0;
let tipAmounts: number;
tipAmounts = 0;
let selectedtippercent: number;
selectedtippercent = 0;
let totalbillamount: number;
totalbillamount = 0;
let customtip: number;
customtip = 0;

const tip10 = document.getElementById('button1') as HTMLInputElement;
const tip15 = document.getElementById('button2') as HTMLInputElement;
const tip20 = document.getElementById('button3') as HTMLInputElement;

const amountoftipcontrol = document.getElementById('amountOfTip') as HTMLSpanElement;
const totalbill = document.getElementById('totalBill') as HTMLSpanElement;

tip10.addEventListener('click', function () {
    tip10.disabled = true;
    tip15.disabled = false;
    tip20.disabled = false;
    selectedtippercent = .10;
    updateDisplay();
});

tip15.addEventListener('click', function () {
    tip15.disabled = true;
    tip20.disabled = false;
    tip10.disabled = false;
    selectedtippercent = .15;
    updateDisplay();
});

tip20.addEventListener('click', function () {
    tip20.disabled = true;
    tip15.disabled = false;
    tip10.disabled = false;
    selectedtippercent = .20;
    updateDisplay();
});

customtippercentageinput.addEventListener('keyup', () => {
    customtip = customtippercentageinput.valueAsNumber * .01;
    selectedtippercent = customtip;
    updateDisplay();
});

totalpeoplecontrol.addEventListener('keyup', () => {
    updateDisplay();
});

billamountinputcontrol.addEventListener('keyup', () => {
    updateDisplay();
});

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
    tipAmounts = calculateTipAmount(billamountinputcontrol.valueAsNumber, selectedtippercent);
    const billamount = billamountinputcontrol.valueAsNumber;
    billamountdisplaycontrol.innerText = '$' + billamount.toString();
    const totalSum = calculateTotalBill(billamount, tipAmounts);
    totalbill.innerText = '$' + totalSum.toFixed(2).toString();
    amountoftipcontrol.innerText = '$' + tipAmounts.toFixed(2).toString();
    tippercentagecontrol.innerText = `${(selectedtippercent * 100).toFixed(2)}%`;
    totalbillamountperperson = calculateBillAmountPerPerson(totalSum, totalpeoplecontrol.valueAsNumber);
    const numberofpeople = totalpeoplecontrol.valueAsNumber;
    totalpeoplecontrol.innerText = numberofpeople.toString();
    totalperperson.innerText = '$' + (totalbillamountperperson.toFixed(2));
}

function clearDisplay() {
    const clearform = ' ';
    billamountdisplaycontrol.innerText = clearform.toString();
    tippercentagecontrol.innerText = clearform.toString();
    amountoftipcontrol.innerText = clearform.toString();
    totalbill.innerText = clearform.toString();
}
