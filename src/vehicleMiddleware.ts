import { NextFunction, Request, Response } from 'express';
import { Car } from '../car';
import { getTypeById } from '../db/dbActions';
import Motorbike from '../motorbike';

/* a midlewarre that rturns a vehicle
 */
export const vehicleMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const car = new Car();
    const motorbike = new Motorbike();
    let auto;
    const { id } = req.params;
    const vehicle = getTypeById(Number(id));

    if (!vehicle) {
      return res.status(400).json({ message: 'no car found with that id' });
    }

    if (
      vehicle !== car.getVehicleType() &&
      vehicle !== motorbike.getVehicleType()
    ) {
      return res
        .status(400)
        .json({ message: 'please provide a vehicle, Car or Motorbike' });
    }
    switch (vehicle) {
      case 'Car':
        auto = car;
        break;
      case 'Motorbike':
        auto = motorbike;
        break;
      default:
    }
    res.locals.vehicle = auto;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'something went wrong in middleware' });
  }
};
