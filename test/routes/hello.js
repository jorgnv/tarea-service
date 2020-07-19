// Dependencies
import supertest from 'supertest'

// Init express app
import app from '../../src/server'

/**
 * Testing get a Hello World
 */
describe(`GET /`, () => {
  it(`respond with a 200 code Hello World`, (done) => {
    supertest(app)
      .get(`/`)
      .set(`Accept`, `application/json`)
      .expect(`Content-Type`, `text/html; charset=utf-8`)
      .expect(200)
      .end((err) => {
        if (err) return done(err)

        return done()
      })
  })
})
