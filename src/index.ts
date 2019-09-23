import './styles.css';
import { calculateTipAmount, calculateTotalBill, calculateBillAmountPerPerson } from './math';

const billamountinputcontrol = document.getElementById('billamountinput') as HTMLInputElement;
const billamountdisplaycontrol = document.getElementById('billamountdisplay');
const tippercentagecontrol = document.getElementById('tippercentage');
const customtippercentageinput = document.getElementById('customtippercentageinput') as HTMLInputElement;

const totalpeoplecontrol = document.getElementById('totalpeople') as HTMLInputElement;
const totalPerPerson = document.getElementById('totalPerPerson') as HTMLSpanElement;

let totalperson: number;
totalperson = 1;
let totalbillamountperperson: number;
totalbillamountperperson = 0;

let tipAmounts: number;
tipAmounts = 0;
let selectedtippercent: number;
selectedtippercent = 0;
let totalBillAmount: number;
totalBillAmount = 0;

let customtip: number;
customtip = 0;

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

customtippercentageinput.addEventListener('keyup', () => {
    // once user's custom amount is added, pull it out of text box
    // turn it into a number
    // have the function of calculate tip process this new input
    // have the new result updated in display
    if (customtippercentageinput.valueAsNumber < 0) {
        customtippercentageinput.classList.add('error');
    } else {
        customtip = customtippercentageinput.valueAsNumber * .01;
        selectedtippercent = customtip;
        updateDisplay();
    }
});

totalpeoplecontrol.addEventListener('keyup', () => {
    // once total people is added, pull it out of text box
    // turn it into a number
    // use it to run the function calculate bill per person
    // have display updated with this info
    if (totalpeoplecontrol.valueAsNumber < 0) {
        totalpeoplecontrol.classList.add('error');
    } else {
        updateDisplay();
    }
});

billamountinputcontrol.addEventListener('keyup', () => {

    if (billamountinputcontrol.valueAsNumber < 0) {
        billamountinputcontrol.classList.add('error');
    } else {
        updateDisplay();
    }
});



function updateDisplay() {
    // total of calculated tip
    tipAmounts = calculateTipAmount(billamountinputcontrol.valueAsNumber, selectedtippercent);
    // take input of bill amount and rename it
    const billamount = billamountinputcontrol.valueAsNumber;
    // take bill amount and tip amount and add it together
    const totalSum = calculateTotalBill(billamount, tipAmounts);
    // display the inner text of the total bill as string
    totalBill.innerText = totalSum.toString();
    // display total tip amount as string
    amountOfTipControl.innerText = tipAmounts.toString();
    // display amount of tip as string
    tippercentagecontrol.innerText = `${(selectedtippercent * 100)}%`;
    // display the bill amount as string
    billamountdisplaycontrol.innerText = billamount.toString();

    // total of bill per person
    totalbillamountperperson = calculateBillAmountPerPerson(totalSum, totalpeoplecontrol.valueAsNumber);
    // take input of people and rename it
    const numberofpeople = totalpeoplecontrol.valueAsNumber;
    // display the total people as string
    totalpeoplecontrol.innerText = numberofpeople.toString();
    // display the bill per person as string
    totalPerPerson.innerText = totalbillamountperperson.toString();

}


// to clear out, turn all controls inner text into empty strings upon erroring
//
