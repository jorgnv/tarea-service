// Dependencies
import mockingoose from 'mockingoose'

// Model
import Todo from '@models/Todo'

describe('#Todo', () => {
  it('should have correct model name', () => {
    expect(Todo.modelName).toBe('todos')
  })

  it('should return the doc with findById', () => {
    // eslint-disable-next-line no-underscore-dangle
    const _doc = {
      _id: '507f191e810c19729de860ea',
      title: 'Title test',
      description: 'Description test'
    }

    mockingoose(Todo).toReturn(_doc, 'findOne')

    return Todo.findById({ _id: '507f191e810c19729de860ea' }).then(doc => {
      expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc)
    })
  })

  it('should return the doc with update', () => {
    // eslint-disable-next-line no-underscore-dangle
    const _doc = {
      _id: '507f191e810c19729de860ea',
      title: 'Title test',
      description: 'Description test'
    }

    mockingoose(Todo).toReturn(_doc, 'update')

    return Todo.update({ title: 'changed' }) // this won't really change anything
      .where({ _id: '507f191e810c19729de860ea' })
      .then(doc => {
        expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc)
      })
  })
})
