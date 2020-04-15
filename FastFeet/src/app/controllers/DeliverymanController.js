import Deliveryman from '../models/Deliveryman';

class DeliverymanController {
  async index(req, res) {
    const deliveryman = await Deliveryman.findAll({
      attributes: ['id', 'name', 'email'],
    });

    return res.json(deliveryman);
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
