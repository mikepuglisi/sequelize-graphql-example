import Sequelize, { Model } from 'sequelize';

class Property extends Model {
  static tableName = 'properties';

  static associate(models) {
    Property.Owner = Property.belongsTo(models.User, {
      as: 'owner',
    });
  }
}

export default (sequelize) => {
  Property.init({
    address: Sequelize.STRING,
    ownerId: {
      type: Sequelize.INTEGER,
    },
  }, {
    sequelize,
    tableName: Property.tableName,
  });

  return Property;
};
