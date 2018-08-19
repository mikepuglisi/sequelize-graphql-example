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
    title: Sequelize.STRING,
    description: Sequelize.STRING,    
    ownerId: {
      type: Sequelize.INTEGER,
    },
  }, {
    sequelize,
    tableName: Place.tableName,
  });

  return Place;
};
