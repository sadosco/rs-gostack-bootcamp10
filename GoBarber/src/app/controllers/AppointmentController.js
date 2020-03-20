import User from '../models/User';
import File from '../models/File';
import Appointment from '../models/Appointment';
import Notification from '../schemas/NotificationSchema';

import { startOfHour, parseISO, isBefore, format } from 'date-fns';
import pt from 'date-fns/locale/pt'
import * as Yup from 'yup';

class AppointmentController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const appointment = await Appointment.findAll({
      where: {
        user_id: req.userId,
        canceled_at: null,
      },
      order: ['date'],
      attributes: ['id', 'date', 'provider_id'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email', 'avatar_id'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
      ],
    });

    return res.json(appointment);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(401).json({ Error: 'Validations fails' });

    const { provider_id, date } = req.body;

    const isProvider = await User.findOne({
      where: {
        id: provider_id,
        provider: true,
      },
    });

    if (!isProvider)
      return res.status(401).json({ Error: 'This user is not a provider!' });

    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date()))
      return res.status(401).json({ Error: 'Past date is not permitted' });

    const hasAppointment = await Appointment.findOne({
      where: {
        date,
        provider_id,
        canceled_at: null,
      },
    });

    if (hasAppointment)
      return res.status(400).json({ Error: 'Appointment already exists' });

    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date,
    });

    const user = await User.findByPk(req.userId);
    const formattedData = format(
      hourStart,
      "dd 'de' MMMM', às' hh:mm'h'",
      { locale: pt }
    );

    const notification = await Notification.create({
      content: `Novo agendamento para ${user.name} no dia ${formattedData}`,
      user: req.userId
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
