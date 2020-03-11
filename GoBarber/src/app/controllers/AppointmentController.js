import User from '../models/User';
import Appointment from '../models/Appointment';

import { startOfHour, parseISO, isBefore } from 'date-fns';
import * as Yup from 'yup';

class AppointmentController {
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

    return res.json(appointment);
  }
}

export default new AppointmentController();
