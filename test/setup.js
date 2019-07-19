process.env.JWT_SECRET = 'secret-test-password';


require('dotenv').config;
const { expect } = require('chai');
const supertest = require('supertest');

global.expect = expect;
global.supertest = supertest;