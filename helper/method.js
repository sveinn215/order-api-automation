/* eslint-disable no-unused-vars */
const supertest = require('supertest');

const getAuth = (url,body) => {
  return supertest(url).post('/auth/login').set('Content-Type', 'application/json').send(body);
}

const create = (http) =>{
  return supertest(http.url).post(http.path).set(http.headers).send(http.body);
}

const readBy = (http) => {
  return supertest(http.url).get(http.path).set(http.headers).send();
}

const readList = (http) => { 
  return supertest(http.url).post(http.path).set(http.headers).send(http.body);
}

const update = (http) => { 
  return supertest(http.url).put(http.path).set(http.headers).send(http.body);
}

const patch = (http) => {
  return supertest(http.url).patch(http.path).set(http.headers).send(http.body);
}

const remove = (http) => {
  return supertest(http.url).delete(http.path).set(http.headers).send();
}

module.exports = {
  getAuth, create, readBy, readList, update, remove, patch
};
