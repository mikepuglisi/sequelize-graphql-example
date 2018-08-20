// https://codewithhugo.com/using-es6-classes-for-sequelize-4-models/
const Sequelize = require('sequelize');

class Place extends Sequelize.Model {
  static associate(models) {
    Place.Owner = Place.belongsTo(models.User, {
      as: 'owner',
    });
    Place.Location = Place.hasOne(models.Location, {
      // as: 'location',
      foreignKey: 'placeId', 
      constraints: false
    });    
  }
}

module.exports = (sequelize) => {
  Place.init({
    title: Sequelize.STRING,
    description: Sequelize.STRING,    
    ownerId: {
      type: Sequelize.INTEGER,
    },
    locationId: {
      type: Sequelize.INTEGER,
    },    
  }, {
    sequelize,
    tableName: 'places',
  });

  return Place;
};
