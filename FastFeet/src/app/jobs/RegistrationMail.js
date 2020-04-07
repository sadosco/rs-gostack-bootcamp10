import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const { deliveryman, recipient, product } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Nova entrega cadastrada',
      template: 'registration',
      context: {
        deliveryman: deliveryman.name,
        product,
        recipient: recipient.name,
        address: recipient.address,
        number: recipient.number,
        complements: recipient.complements,
        cep: recipient.cep,
        state: recipient.state,
        city: recipient.city,
      },
    });
  }
}

export default new RegistrationMail();
