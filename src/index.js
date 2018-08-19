const server = require('./server');
const models = require('./models');

/**
 * DISCLAIMER: using sequelize#sync is not recommended for production use. Please, please
 * use migrations. This method of creating a database is used in this demo for simplicity's sake.
 */
async function start() {
  // Make sure the database tables are up to date
  await models.sequelize.sync({ force: true });
  
  // Create sample data
  const foo = await models.User.create({ name: 'Foo' });  
  
  const bar = await models.User.create({ name: 'Bar' });

  const place = await models.Place.create({ title: 'Xanadu: 8BR/6BA Ocean-to-River PALACE with Pool', description: 'Xanadu: “An idyllic, exotic, luxurious place" (Webster’s Dictionary) 8BR/6BA Ocean-to-River paradise. Room for 20! Heated oceanfront pool. Private elevator. Private dock & more. Directly ON the beach! 4 floors of luxury living, oceanfront chef\'s kitchen, & so much more. Minutes from major international airports. Complimentary kayaks, paddleboards, bicycles, snorkel & fishing gear & more. (Jetskis & boats also available). FULLY STOCKED. Selected Monday nights only $129!'});  
  
  const mutatedPlace = await place.createLocation({directions: 'First House on the left', latitude: -70, longitude: 20 })
  // place.createLocation()
  //await models.Place.create({ title: 'Aquarius: 5BR/4BA heated-pool FL beach-house', description: `Introducing 'Aquarius', the newest member of our "Beach Houses in Paradise" family. 5+ bedrooms. 4+ baths. Heated waterfront pool+ spa, Private dock. Nestled on a narrow 100-foot strip of land between the Atlantic Ocean & N.America's most bio-diverse estuary. Minutes from major international airports. Complimentary kayaks, paddleboards, snorkel & fishing gear. (Jetskis & boats also available!)` });  
  

  console.dir(foo.__proto__)
  // console.dir(place.__proto__)
 // console.dir(mutatedPlace)
  await foo.createPet({ name: 'Bat' });
  await bar.createPet({ name: 'Baz' });

  // Start the GraphQL server

  server.start(() => {
    console.log('Server is running on localhost:4000');
  });
}

start();

