import db from './db';

export const getMonthlyDates = (month: number, id: number) => {
  const car = db.filter((car) => car.id === id);
  const entriesInMonth = car[0].dates.filter((date: string) => {
    const getDate: Date = new Date(date);
    const getMonth: number = getDate.getMonth() + 1;
    return month === getMonth;
  });
  return entriesInMonth;
};

export const getDatesById = (id: number) => {
  const car = db.filter((car) => car.id === id);
  const entries = car[0].dates;
  return entries;
};

export const getTypeById = (id: number) => {
  const car = db.filter((car) => car.id === id);
  return car[0]?.type;
};
