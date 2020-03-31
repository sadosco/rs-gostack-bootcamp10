import Deliveryman from '../models/Deliveryman';

class DeliverymanController {
  async index(req, res) {
    return res.json({ id: req.id });
  }

  async store(req, res) {
    const { name, email } = req.body;

    const deliverymanExists = await Deliveryman.findOne({ where: { email } });

    if (deliverymanExists)
      return res
        .status(400)
        .json({ Error: 'This deliveryman already exists!' });

    const deliveryman = await Deliveryman.create({
      name,
      email,
    });

    return res.json(deliveryman);
  }
}

export default new DeliverymanController();
