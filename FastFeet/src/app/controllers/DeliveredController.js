import Delivery from '../models/Delivery';

class DeliveredController {
  async update(req, res) {
    const { id: deliveryman_id, delivery_id } = req.params;

    const { signature_id } = req.body;

    const delivery = await Delivery.update(
      {
        end_date: new Date(),
        signature_id,
      },
      {
        where: {
          id: delivery_id,
          deliveryman_id,
        },
        returning: true,
        limit: 1,
      }
    );

    return res.json(delivery[1]);
  }
}

export default new DeliveredController();
