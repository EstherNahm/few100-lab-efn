import { calculateTipAmount, calculateTotalBill, calculateBillAmountPerPerson } from './utils';

describe('calculating tip amount', () => {
    it('can multiply', () => {
        expect(calculateTipAmount(100, .10)).toBe(10);
    });
});

describe('calculating total bill', () => {
    it('can add tip to bill', () => {
        expect(calculateTotalBill(200, 20)).toBe(220);
    });
});

describe('calculate cost of bill per person', () => {
    it('can divide bill by number of people', () => {
        expect(calculateBillAmountPerPerson(25, 5)).toBe(5);
    });
});
