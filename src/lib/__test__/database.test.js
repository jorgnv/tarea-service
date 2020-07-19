// Dependencies
import mongoose from 'mongoose'

// Configuration
import db from '@lib/database'

describe(`#DB`, () => {
  it(`proves that one equals one to successfully connect to database`, async done => {
    let dbConnection

    await db()
      .then(() => {
        dbConnection = mongoose.connection.readyState

        return done()
      })
      .catch(err => done(err))

    expect(dbConnection).toBe(1)
  })
})
