// https://codewithhugo.com/using-es6-classes-for-sequelize-4-models/
const Sequelize = require('sequelize');

class Location extends Sequelize.Model {

  static associate(models) {
    // Location.Place = Location.hasOne(models.Place, {
    //   as: 'location',
    //   foreignKey: 'locationId', 
    //   constraints: false
    // });

    // Location.Place = Location.belongsTo(models.Place, {
    //   foreignKey: 'locationId',
    //   as: 'location',
    // });        
    // Location.Place = Location.hasOne(models.Place, {
    //     as: 'location'
    // });      
    // Place.Owner = Place.belongsTo(models.User, {
    //   as: 'owner',
    // });
  }
}

module.exports = (sequelize) => {  
  Location.init({
    directions: Sequelize.STRING,
    latitude: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        validate: { min: -90, max: 90 }
      },    
    longitude: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        validate: { min: -180, max: 180 }
    },   
    placeId: {
      type: Sequelize.INTEGER,
    },          
    // description: Sequelize.STRING,    
    // ownerId: {
    //   type: Sequelize.INTEGER,
    // },
  }, {
    sequelize,
    tableName: 'locations',
    validate: {
        bothCoordsOrNone() {
            if ((this.latitude === null) !== (this.longitude === null)) {
            throw new Error('Require either both latitude and longitude or neither')
            }
        }    
    }
  });

  return Location;
};
