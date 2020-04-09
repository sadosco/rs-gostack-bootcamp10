import {
  isAfter,
  isBefore,
  setSeconds,
  setMinutes,
  setHours,
  addHours,
} from 'date-fns';

import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';
import Queue from '../../lib/Queue';

import RegistrationMail from '../jobs/RegistrationMail';

class DeliveryController {
  async index(req, res) {
    const deliveries = await Delivery.findAll({
      attributes: [
        'id',
        'recipient_id',
        'deliveryman_id',
        'signature_id',
        'product',
        'start_date',
        'end_date',
        'canceled_at',
      ],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'address',
            'number',
            'complements',
            'state',
            'city',
            'cep',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path'],
        },
      ],
    });

    return res.json(deliveries);
  }

  async store(req, res) {
    const { product, recipient_id, deliveryman_id } = req.body;

    const delivery = await Delivery.create({
      product,
      recipient_id,
      deliveryman_id,
    });

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);
    const recipient = await Recipient.findByPk(recipient_id);

    await Queue.add(RegistrationMail.key, {
      product,
      deliveryman,
      recipient,
    });

    return res.json(delivery);
  }

  async update(req, res) {
    const { id, status } = req.params;

    const delivery = await Delivery.findByPk(id);

    if (!delivery)
      return res.status(400).json({ Error: 'Delivery not exists!' });

    const startHours = setSeconds(setMinutes(setHours(new Date(), 8), 0), 0);
    const endHours = addHours(startHours, 10);

    if (
      isBefore(addHours(new Date(), 2), startHours) ||
      isAfter(addHours(new Date(), 2), endHours)
    )
      return res.status(401).json({
        Error: 'You just can withdrawn an product in business hours',
      });

    if (status) delivery.checkProductStatusAndUpdate(status);

    await delivery.save();

    return res.json(delivery);
  }

  async delete(req, res) {
    const delivery = await Delivery.findByPk(req.params.id);

    if (!delivery)
      return res.status(400).json({ Error: 'Delivery not exists!' });

    delivery.canceled_at = new Date();

    await delivery.save();

    return res.send();
  }
}

export default new DeliveryController();
