const request = require('supertest');
const { app } = require('../../backend/app');
const { Case } = require('../../backend/models/Case');
const { User } = require('../../backend/models/User');
const mongoose = require('mongoose');
const { database } = require('../../backend/utilities/database');

beforeAll(async () => {
  await database.connect();
});

afterAll(async () => {
  await database.disconnect();
});

describe('Case Management', () => {
  let user;
  let token;

  beforeAll(async () => {
    user = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'Lawyer'
    });
    await user.save();
    token = user.generateAuthToken();
  });

  afterAll(async () => {
    await User.deleteMany({});
  });

  describe('POST /cases', () => {
    it('should create a new case', async () => {
      const caseData = {
        title: 'New Case',
        description: 'Description of the new case',
        status: 'Open',
        client: mongoose.Types.ObjectId(),
        assignedTo: user._id
      };

      const response = await request(app)
        .post('/api/cases')
        .set('Authorization', `Bearer ${token}`)
        .send(caseData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('_id');
      expect(response.body.title).toBe(caseData.title);
    });
  });

  describe('GET /cases', () => {
    it('should retrieve all cases', async () => {
      const response = await request(app)
        .get('/api/cases')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
    });
  });

  describe('GET /cases/:id', () => {
    it('should retrieve a case by id', async () => {
      const caseInstance = new Case({
        title: 'Specific Case',
        description: 'A specific case description',
        status: 'Open',
        client: mongoose.Types.ObjectId(),
        assignedTo: user._id
      });
      await caseInstance.save();

      const response = await request(app)
        .get(`/api/cases/${caseInstance._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.title).toBe(caseInstance.title);
    });
  });

  describe('PUT /cases/:id', () => {
    it('should update a case', async () => {
      const caseInstance = new Case({
        title: 'Case to Update',
        description: 'Case description before update',
        status: 'Open',
        client: mongoose.Types.ObjectId(),
        assignedTo: user._id
      });
      await caseInstance.save();

      const updatedData = {
        title: 'Updated Case Title',
        description: 'Updated case description',
        status: 'Closed'
      };

      const response = await request(app)
        .put(`/api/cases/${caseInstance._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedData);

      expect(response.status).toBe(200);
      expect(response.body.title).toBe(updatedData.title);
    });
  });

  describe('DELETE /cases/:id', () => {
    it('should delete a case', async () => {
      const caseInstance = new Case({
        title: 'Case to Delete',
        description: 'Case description to delete',
        status: 'Open',
        client: mongoose.Types.ObjectId(),
        assignedTo: user._id
      });
      await caseInstance.save();

      const response = await request(app)
        .delete(`/api/cases/${caseInstance._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Case deleted successfully');
    });
  });
});