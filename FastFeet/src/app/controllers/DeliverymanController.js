import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';

class DeliverymanController {
  async index(req, res) {
    const deliveryman_id = req.params.id;

    if (deliveryman_id) {
      const deliveries = await Delivery.findAll({
        where: {
          deliveryman_id,
          canceled_at: null,
          start_date: null,
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

    const deliverymans = await Deliveryman.findAll({
      attributes: ['id', 'name', 'email'],
    });

    return res.json(deliverymans);
  }

  async store(req, res) {
    const deliverymanExists = await Deliveryman.findOne({
      where: { email: req.body.email },
    });

    if (deliverymanExists)
      return res
        .status(400)
        .json({ Error: 'This deliveryman already exists!' });

    const { id, name, email } = await Deliveryman.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (!deliveryman)
      return res.status(400).json({ Error: 'Deliveryman not exists!' });

    const { id, name, email } = await deliveryman.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async delete(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (!deliveryman)
      return res.status(400).json({ Error: 'Deliveryman not exists! ' });

    await deliveryman.destroy();

    return res.send();
  }
}

export default new DeliverymanController();
