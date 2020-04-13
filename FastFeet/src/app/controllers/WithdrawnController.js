import { isAfter, isBefore } from 'date-fns';

import { Op } from 'sequelize';
import Delivery from '../models/Delivery';

import commom from '../../utils/common';

class WithdrawnController {
  async update(req, res) {
    const { id: deliveryman_id, delivery_id } = req.params;

    if (
      isBefore(new Date(), commom.startBusinessHour) ||
      isAfter(new Date(), commom.endBusinessHour)
    )
      return res.status(401).json({
        Error: 'You just can withdrawn an product in business hours',
      });

    const totalDeliveries = await Delivery.count({
      where: {
        deliveryman_id,
        start_date: {
          [Op.between]: [commom.startBusinessHour, commom.endBusinessHour],
        },
      },
    });

    if (totalDeliveries >= commom.maxPermited)
      return res
        .status(401)
        .json({ Error: 'You just can delivery 5 products by day' });

    const delivery = await Delivery.findByPk(delivery_id);

    delivery.start_date = new Date();

    await delivery.save();

    return res.json(delivery);
  }
}

export default new WithdrawnController();
