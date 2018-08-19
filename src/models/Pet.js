const Sequelize = require('sequelize');

class Pet extends Sequelize.Model {

  static associate(models) {
    Pet.Owner = Pet.belongsTo(models.User, {
      as: 'owner',
    });
  }
}

module.exports = (sequelize) => {
  Pet.init({
    name: Sequelize.STRING,
    ownerId: {
      type: Sequelize.INTEGER,
    },
  }, {
    sequelize,
    tableName: 'pets',
  });

  return Pet;
};
