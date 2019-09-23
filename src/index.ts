import './styles.css';
import { calculateTipAmount, calculateTotalBill } from './math';

const billamountinputcontrol = document.getElementById('billamountinput') as HTMLInputElement;
const billamountdisplaycontrol = document.getElementById('billamountdisplay');
const tippercentagecontrol = document.getElementById('tippercentage');
let tipAmounts: number;
tipAmounts = 0;
let selectedtippercent: number;
selectedtippercent = 0;
let totalBillAmount: number;
totalBillAmount = 0;

const tip10 = document.getElementById('button1') as HTMLInputElement;
const tip15 = document.getElementById('button2') as HTMLInputElement;
const tip20 = document.getElementById('button3') as HTMLInputElement;

const amountOfTipControl = document.getElementById('amountOfTip') as HTMLSpanElement;
const totalBill = document.getElementById('totalBill') as HTMLSpanElement;

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

// when user types, add event listener to that event
billamountinputcontrol.addEventListener('keyup', () => {
    // add the listener to the event that's actually changing
    // read the value out of text box
    // convert into number for calculate function
    // print result into totalBill textbox
    // turn the innertext of totalbill to a string

    if (billamountinputcontrol.valueAsNumber < 0) {
        billamountinputcontrol.classList.add('error');
    } else {
        updateDisplay();
    }
});

function updateDisplay() {
    tipAmounts = calculateTipAmount(billamountinputcontrol.valueAsNumber, selectedtippercent);
    const billamount = billamountinputcontrol.valueAsNumber;
    const totalSum = calculateTotalBill(billamount, tipAmounts);
    totalBill.innerText = totalSum.toString();
    amountOfTipControl.innerText = tipAmounts.toString();
    tippercentagecontrol.innerText = `${(selectedtippercent * 100)}%`;
    billamountdisplaycontrol.innerText = billamount.toString();
}

// turn all controls inner text into empty strings
//
