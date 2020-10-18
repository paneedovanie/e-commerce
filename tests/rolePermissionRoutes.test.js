const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../server')

let server, rolePermission_id;

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

describe('POST /api/v1/rolePermission', () => {
    it('should have return JSON with status code 201', async () => {
        const res = await request(app).post('/api/v1/rolePermission')
            .send({
                role: '5f66def1acebe16f5aaae3e2',
                permission: '5f66def2acebe16f5aaae3e6'
            });
        rolePermission_id = res.body._id
        expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(res.statusCode).toBe(201)
    })
})

describe('GET /api/v1/rolePermission/', () => {
    it('should have return JSON with status code 200', async () => {
        const res = await request(app).get('/api/v1/rolePermission')
        
        expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(res.statusCode).toBe(200)
    })
})

describe('GET /api/v1/rolePermission/trashed', () => {
    it('should have return JSON with status code 200', async () => {
        const res = await request(app).get('/api/v1/rolePermission/trashed')
        
        expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(res.statusCode).toBe(200)
    })
})

describe('GET /api/v1/rolePermission/:id' , () => {
    it('should have return JSON with status code 200', async () => {
        const res = await request(app).get('/api/v1/rolePermission/' + rolePermission_id)
        
        expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(res.statusCode).toBe(200)
    })
})

describe('PATCH /api/v1/rolePermission/:id' , () => {
    it('should have return JSON with status code 202', async () => {
        const res = await request(app).patch('/api/v1/rolePermission/' + rolePermission_id)
            .send({
                role: '5f66def1acebe16f5aaae3e2',
                permission: '5f66def2acebe16f5aaae3e6'
            });
            
        expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(res.statusCode).toBe(202)
    })
})

describe('PATCH /api/v1/rolePermission/:id/trash' , () => {
    it('should have return JSON with status code 202', async () => {
        const res = await request(app).patch('/api/v1/rolePermission/' + rolePermission_id + "/trash")
            
        expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(res.statusCode).toBe(202)
    })
})

describe('PATCH /api/v1/rolePermission/:id/restore' , () => {
    it('should have return JSON with status code 202', async () => {
        const res = await request(app).patch('/api/v1/rolePermission/' + rolePermission_id + "/restore")
            
        expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(res.statusCode).toBe(202)
    })
})

describe('DELETE /api/v1/rolePermission/:id/delete' , () => {
    it('should have return status code 204', async () => {
        const res = await request(app).delete('/api/v1/rolePermission/' + rolePermission_id)
            
        expect(res.statusCode).toBe(204)
    })
})