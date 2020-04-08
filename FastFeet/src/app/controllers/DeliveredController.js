import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';

class DeliveredController {
  async index(req, res) {
    const allDelivered = await Delivery.findAll({
      where: {
        deliveryman_id: req.params.id,
        start_date: {
          [Op.not]: null,
        },
        end_date: {
          [Op.not]: null,
        },
      },
      attributes: ['id', 'product', 'start_date', 'end_date'],
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

    return res.json(allDelivered);
  }
}

export default new DeliveredController();
