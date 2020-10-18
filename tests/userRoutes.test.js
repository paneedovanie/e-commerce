const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../server')

let server, user_id;

beforeAll(async (done) => {
    await mongoose.connect(
        'mongodb+srv://admin:admin@cluster0.jnvah.mongodb.net/test',
        { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
    );

    const collections = await mongoose.connection.db.collections()
  
    for (let collection of collections) {
      await collection.drop()
    }

    server = app.listen(4000, () => {
        global.agent = request.agent(server);
        done();
    });
});

afterAll(async () => {
  await server.close();
  await mongoose.disconnect();
});

describe('POST /api/v1/user', () => {
    it('should have return JSON with status code 201', async () => {
        const res = await request(app).post('/api/v1/user')
            .send({
                firstName: 'Ed',
                lastName: 'Hiramis',
                email: 'edovanie@yahoo.com',
                username: 'admin1',
                password: 'Admin123',
                role: '5f53b3ca6914970017071dd2'
            });
        user_id = res.body._id
        expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(res.statusCode).toBe(201)
    })
})

describe('GET /api/v1/user/', () => {
    it('should have return JSON with status code 200', async () => {
        const res = await request(app).get('/api/v1/user')
        
        expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(res.statusCode).toBe(200)
    })
})

describe('GET /api/v1/user/trashed', () => {
    it('should have return JSON with status code 200', async () => {
        const res = await request(app).get('/api/v1/user/trashed')
        
        expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(res.statusCode).toBe(200)
    })
})

describe('GET /api/v1/user/:id' , () => {
    it('should have return JSON with status code 200', async () => {
        const res = await request(app).get('/api/v1/user/' + user_id)
        
        expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(res.statusCode).toBe(200)
    })
})

describe('PATCH /api/v1/user/:id' , () => {
    it('should have return JSON with status code 202', async () => {
        const res = await request(app).patch('/api/v1/user/' + user_id)
            .send({
                firstName: 'Ed',
                lastName: 'Hiramis',
                email: 'edovanie@yahoo.com',
                username: 'admin1',
                role: '5f53b3ca6914970017071dd2'
            });
            
        expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(res.statusCode).toBe(202)
    })
})

describe('PATCH /api/v1/user/:id/trash' , () => {
    it('should have return JSON with status code 202', async () => {
        const res = await request(app).patch('/api/v1/user/' + user_id + "/trash")
            
        expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(res.statusCode).toBe(202)
    })
})

describe('PATCH /api/v1/user/:id/restore' , () => {
    it('should have return JSON with status code 202', async () => {
        const res = await request(app).patch('/api/v1/user/' + user_id + "/restore")
            
        expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(res.statusCode).toBe(202)
    })
})

describe('DELETE /api/v1/user/:id/delete' , () => {
    it('should have return status code 204', async () => {
        const res = await request(app).delete('/api/v1/user/' + user_id)
            
        expect(res.statusCode).toBe(204)
    })
})