import Delivery from '../models/Delivery';

class DeliveredController {
  async update(req, res) {
    const { id: deliveryman_id, delivery_id } = req.params;

    const delivery = await Delivery.findByPk(delivery_id, {
      where: {
        deliveryman_id,
      },
    });

    delivery.end_date = new Date();

    await delivery.save();

    return res.json(delivery);
  }
}

export default new DeliveredController();
