import 'jest';
import { Car } from '../car';
import { getTax, getTollFee, isTollFreeDate } from '../congestionTaxCalculator';
import Motorbike from '../motorbike';
import Vehicle from '../vehicle';

let car: Vehicle;
let motorbike: Vehicle;

beforeAll(() => {
  car = new Car();
  motorbike = new Motorbike();
});

const dates1: any = [
  ['2013-01-14 21:00:00', 0, false],
  ['2013-01-15 21:00:00', 0, false],
  ['2013-02-07 06:23:27', 8, false],
  ['2013-02-07 15:27:00', 13, false],
  ['2013-02-08 06:27:00', 8, false],
  ['2013-02-08 06:20:27', 8, false],
  ['2013-02-08 14:35:00', 8, false],
  ['2013-02-08 15:29:00', 13, false],
  ['2013-02-08 15:47:00', 18, false],
  ['2013-02-08 16:01:00', 18, false],
  ['2013-02-08 16:48:00', 18, false],
  ['2013-02-08 17:49:00', 13, false],
  ['2013-02-08 18:29:00', 8, false],
  ['2013-02-08 18:35:00', 0, false],
  ['2013-03-26 14:25:00', 8, false],
  ['2013-03-28 14:07:27', 0, true],
];
const dates: any = [
  '2013-01-14 21:00:00',
  '2013-01-15 21:00:00',
  '2013-02-07 06:23:27',
  '2013-02-07 15:27:00',
  '2013-02-08 06:27:00',
  '2013-02-08 06:20:27',
  '2013-02-08 14:35:00',
  '2013-02-08 15:29:00',
  '2013-02-08 15:47:00',
  '2013-02-08 16:01:00',
  '2013-02-08 16:48:00',
  '2013-02-08 17:49:00',
  '2013-02-08 18:29:00',
  '2013-02-08 18:35:00',
  '2013-03-26 14:25:00',
  '2013-03-28 14:07:27',
];

describe('congestionTaxCalculator function', () => {
  dates1.forEach((date: any) => {
    test.skip('getTollFee', () => {
      const fee = getTollFee(new Date(date[0]), motorbike);
      expect(fee).toBe(date[1]);
    });
    test.skip('isTollFreeDate', () => {
      const fee = isTollFreeDate(new Date(date[0]));
      expect(fee).toBe(date[2]);
    });
  });
  test.skip('getTollFee', () => {
    const fee = getTollFee(new Date('2013-02-26 14:2:00'), motorbike);
    expect(fee).toBe(8);
  });
  test('getTax', () => {
    const tax = getTax(
      car,
      dates.map((d: string) => new Date(d))
    );
    expect(tax).toBe(8);
  });
});
