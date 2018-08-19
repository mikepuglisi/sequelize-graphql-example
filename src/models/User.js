const Sequelize = require('sequelize');

class User extends Sequelize.Model {
  static associate(models) {
    User.Pets = User.hasMany(models.Pet, {
      foreignKey: 'ownerId',
      as: 'pets',
    });
    User.Places = User.hasMany(models.Place, {
      foreignKey: 'ownerId',
      as: 'places',
    });    
  }
}

const schema = {
  name: Sequelize.STRING,
};

module.exports = (sequelize) => {
  User.init(schema, {
    sequelize,
    tableName: 'users',
  });

  return User;
};
