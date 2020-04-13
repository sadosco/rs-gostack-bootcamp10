import { Op } from 'sequelize';

import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';

class DeliveriesController {
  async index(req, res) {
    const { id } = req.params;
    const { delivered } = req.query;

    const deliveries = await Delivery.findAll({
      where: {
        id,
        canceled_at: null,
        start_date: delivered ? { [Op.not]: null } : null,
      },
      attributes: ['id', 'product', 'recipient_id'],
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
      ],
    });

    return res.json(deliveries);
  }
}

export default new DeliveriesController();
