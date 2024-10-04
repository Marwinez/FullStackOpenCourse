const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const mongoose = require('mongoose')

beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(helper.initialBlogs)
})

test('get all blogs', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('blogs have appropriate id', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body.map(blog => blog)
  for(let blog of blogs) {
    assert(blog.id)
  }
})

test('add a new blog', async () => {
  const newBlog = {
    "title": "Post_test",
    "author": "Post_test",
    "url": "Post_test",
    "likes": 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const lastBlog = blogsAtEnd.at(-1)
  assert.strictEqual(newBlog.title, lastBlog.title)
  assert.strictEqual(newBlog.author, lastBlog.author)
  assert.strictEqual(newBlog.url, lastBlog.url)
  assert.strictEqual(newBlog.likes, lastBlog.likes)

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
})

after(async () => {
  await mongoose.connection.close()
})