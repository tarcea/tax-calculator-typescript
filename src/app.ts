import express, { Application, Request, Response } from 'express';
import { getTax } from '../congestionTaxCalculator';
import { getDatesById, getMonthlyDates, getTypeById } from '../db/dbActions';
import { vehicleMiddleware } from './vehicleMiddleware';

const app: Application = express();
app.use(express.json());

/* GET request example: '/vehicles/1/date?month=2'
       1 is the vehicle id in the data base
       month=1 is January
  can get a monthly fee for a certain vehicle
*/
app.get(
  '/vehicles/:id/date',
  vehicleMiddleware,
  (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { month } = req.query;
      const { vehicle } = res.locals;
      const dates = getMonthlyDates(Number(month), Number(id));
      const formatedDates = dates.map((date: string) => new Date(date));
      const total = getTax(vehicle, formatedDates);
      res.status(200).json({ total, dates });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'something went wrong' });
    }
  }
);

/* GET request example: '/vehicles/1'
       1 is the vehicle id in the data base
  can get a total fee for a certain car
*/
app.get('/vehicles/:id', vehicleMiddleware, (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { vehicle } = res.locals;
    const dates = getDatesById(Number(id));
    const formatedDates = dates.map((date: string) => new Date(date));
    const total = getTax(vehicle, formatedDates);
    res.status(200).json({ total, dates });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'something went wrong' });
  }
});

export default app;
