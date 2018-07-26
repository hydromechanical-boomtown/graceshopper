'use strict'

const db = require('../server/db')
const {User, Puppy} = require('../server/db/models')

/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!
  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123',
      firstName: 'Cody',
      lastName: 'Long',
      address: '1400 River Rd, Virgina'
    }),
    User.create({
      email: 'murphy@email.com',
      password: 'asd123',
      firstName: 'Murphy',
      lastName: 'Smith',
      address: '121 Kanga Way, California'
    }),
    User.create({
      email: 'xanthe@email.com',
      password: 'xcv345',
      firstName: 'Xanthe',
      lastName: 'Coffman',
      address: '7a Clyde St, Colorado'
    }),
    User.create({
      email: 'corina@email.com',
      password: 'poj423',
      firstName: 'Corina',
      lastName: 'Diez',
      address: '900 Waffle Rd, Vermont'
    })
  ])

  const puppies = await Promise.all([
    Puppy.create({
      name: 'Spot',
      price: 2000,
      age: 6,
      breed: 'Labrador',
      description: 'Soft fur, even softer cuddles',
      gender: 'Male',
      imageURL:
        'http://cdn2-www.dogtime.com/assets/uploads/2011/03/puppy-development.jpg',
      sold: false
    }),
    Puppy.create({
      name: 'Sausage',
      price: 2040,
      age: 2,
      breed: 'Sausage Dog',
      description: "Likes long walks on the beach, doesn't like sausages",
      gender: 'Male',
      imageURL:
        'https://78.media.tumblr.com/157f5bffb5f90affa26c979417b9f0f4/tumblr_n1f0zpahkg1t4mpwko1_500.jpg',
      sold: false
    }),
    Puppy.create({
      name: 'Rainbow',
      price: 3000,
      age: 4,
      breed: 'Cockerspaniel',
      description:
        'Not the brightest bulb in the bunch, but is definitely the sweetest',
      gender: 'Female',
      imageURL:
        'http://www.doglib.com/wp-content/uploads/sites/2/cu/cute-buff-american-cocker-spaniel-pup-breed.jpg',
      sold: false
    }),
    Puppy.create({
      name: 'Biscuit',
      price: 5200,
      age: 4,
      breed: 'Cavoodle',
      description: 'Always hungry, never sleepy',
      gender: 'Female',
      imageURL:
        'https://i.pinimg.com/736x/21/6f/79/216f7921cbe5ee218355aac97b3bf659--baby-maltese-maltese-puppies.jpg',
      sold: false
    }),
    Puppy.create({
      name: 'Smuggle',
      price: 3400,
      age: 3,
      breed: 'Pug',
      description:
        "Thinks he's bigger than he is, doesn't know how to turn right",
      gender: 'Male',
      imageURL:
        'https://img.buzzfeed.com/buzzfeed-static/static/2016-11/2/13/asset/buzzfeed-prod-web08/sub-buzz-11149-1478107381-1.png?downsize=715:*&output-format=auto&output-quality=auto',
      sold: false
    })
  ])

  await users[0].addPuppy(puppies[0])
  await users[0].addPuppy(puppies[1])
  await users[0].addPuppy(puppies[2])
  await users[1].addPuppy(puppies[3])

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${puppies.length} puppies`)
  console.log(
    'added puppies using User.addPuppy(puppy) sequelize accessor methods'
  )
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
