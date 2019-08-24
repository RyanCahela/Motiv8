process.env.JWT_SECRET = 'secret-test-password';
process.env.NODE_ENV = 'test';


require('dotenv').config();
const { expect, assert } = require('chai');
const supertest = require('supertest');

global.assert = assert;
global.expect = expect;
global.supertest = supertest;