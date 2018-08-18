import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static tableName = 'users';

  static associate(models) {
    User.Pets = User.hasMany(models.Pet, {
      foreignKey: 'ownerId',
      as: 'pets',
    });
    User.Properties = User.hasMany(models.Property, {
      foreignKey: 'ownerId',
      as: 'properties',
    });    
  }
}

const schema = {
  name: Sequelize.STRING,
};

export default (sequelize) => {
  User.init(schema, {
    sequelize,
    tableName: User.tableName,
  });

  return User;
};
