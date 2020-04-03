import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import File from '../models/File';

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

    return res.json(delivery);
  }

  async update(req, res) {
    const delivery = await Delivery.findByPk(req.params.id);

    if (!delivery)
      return res.status(400).json({ Error: 'Delivery not exists!' });

    const { productStatus } = req.query;

    if (productStatus) delivery.checkProductStatusAndUpdate(productStatus);

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
