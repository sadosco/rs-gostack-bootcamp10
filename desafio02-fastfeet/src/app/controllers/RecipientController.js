import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const { cep, number } = req.body;

    const recipientExist = await Recipient.findOne({ where: { cep, number } });

    if (recipientExist)
      return res.status(400).json({ Error: 'Recipient Exists!' });

    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  async update(req, res) {
    const { cep, number } = req.body;

    const recipient = await Recipient.findOne({ where: { cep, number } });

    if (!recipient)
      return res.status(400).json({ Error: 'Recipient not found' });

    recipient.update(req.body);

    return res.json(recipient);
  }
}

export default new RecipientController();
