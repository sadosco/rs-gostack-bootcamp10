import User from '../models/User';

class UserController {
  async store(req, res) {
    const UserExists = await User.findOne({ where: { email: req.body.email } });

    if (UserExists) return res.status(400).json({ Error: 'User exists!' });

    const { id, name, email, provider } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email && email !== user.email) {
      const UserExists = await User.findOne({ where: { email } });

      if (UserExists)
        return res.status(400).json({ Error: 'User already exists!' });
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ Error: 'Password not match!' });
    }

    const { id, name, provider } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
