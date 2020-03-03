import Sequelize, { Model } from 'sequelize';

class Recipient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        address: Sequelize.STRING,
        number: Sequelize.INTEGER,
        complements: Sequelize.STRING,
        state: Sequelize.STRING(2),
        city: Sequelize.STRING,
        cep: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
  }
}

export default Recipient;
