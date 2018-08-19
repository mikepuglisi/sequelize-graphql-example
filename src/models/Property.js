import Sequelize, { Model } from 'sequelize';

class Place extends Model {
  static tableName = 'places';

  static associate(models) {
    Place.Owner = Place.belongsTo(models.User, {
      as: 'owner',
    });
  }
}

export default (sequelize) => {
  Place.init({
    address: Sequelize.STRING,
    ownerId: {
      type: Sequelize.INTEGER,
    },
  }, {
    sequelize,
    tableName: Place.tableName,
  });

  return Place;
};
