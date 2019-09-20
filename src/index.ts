import './styles.css';
import { calculateTipAmount, calculateTotalBill } from './math';

const billamount = document.getElementById('billamount') as HTMLInputElement;
const billamount1 = document.getElementById('billamount1');
const tipamount = document.getElementById('tipamount');
let tipAmounts: number;

const tip10 = document.getElementById('button1') as HTMLInputElement;
const tip15 = document.getElementById('button2') as HTMLInputElement;
const tip20 = document.getElementById('button3') as HTMLInputElement;

const amountOfTip = document.getElementById('amountOfTip') as HTMLSpanElement;
const totalBill = document.getElementById('totalBill') as HTMLSpanElement;

tip10.addEventListener('click', function () {
    tip10.disabled = true;
    tip10.disabled = false;
    tip10.disabled = false;
    tipAmounts = calculateTipAmount(billamount.valueAsNumber, .10);

    amountOfTip.innerText = tipAmounts.toString();
    tipamount.innerText = '10%';
});

tip15.addEventListener('click', function () {
    tip15.disabled = true;
    tip15.disabled = false;
    tip15.disabled = false;
    tipAmounts = calculateTipAmount(billamount.valueAsNumber, .15);

    amountOfTip.innerText = tipAmounts.toString();
    tipamount.innerText = '15%';
});

tip20.addEventListener('click', function () {
    tip20.disabled = true;
    tip20.disabled = false;
    tip20.disabled = false;
    tipAmounts = calculateTipAmount(billamount.valueAsNumber, .20);

    amountOfTip.innerText = tipAmounts.toString();
    tipamount.innerText = '20%';
});

// when user types, add event listener to that event
billamount.addEventListener('keyup', () => {
    // add the listener to the event that's actually changing
    // read the value out of text box
    // convert into number for calculate function
    // print result into totalBill textbox
    // turn the innertext of totalbill to a string
    if (billamount.valueAsNumber < 0) {
        billamount.classList.add('error');
    } else {
        billamount1.innerText = billamount.valueAsNumber.toString();
        const totalSum = calculateTotalBill(billamount.valueAsNumber, tipAmounts);
        totalBill.innerText = totalSum.toString();
    }
});




