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

test('likes default to 0 if missing', async () => {
  const newBlog = {
    "title": "No likes :c",
    "author": "Johnny Test",
    "url": "no"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const blogs = await helper.blogsInDb()
  const lastBlog = blogs[blogs.length - 1]
  // const response = await api.get('/api/blogs')
  // const lastBlog = response.body[response.body.length - 1]
  assert.strictEqual(lastBlog.likes, 0)
})

test('Bad request on missing title or url', async () => {
  const testBlogs = [
    {
      "author": "test1"
    },
    {
      "author": "test2",
      "url": "exists"
    },
    {
      "author": "test3",
      "title": "exists"
    }
  ]
  console.log("works1")
  for(let blog of testBlogs) {
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(400)
  }
})

test('deleting a single blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)


  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

  const titles = blogsAtEnd.map(blog => blog.title)
  const urls = blogsAtEnd.map(blog => blog.url)
  assert(!titles.includes(blogToDelete.title))
  assert(!urls.includes(blogToDelete.url))
})

test('updating a single blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  blogToUpdate.likes = 7

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogs = await helper.blogsInDb()
  const updatedBlog = blogs[0]
  assert.strictEqual(blogToUpdate.likes, updatedBlog.likes)
})

after(async () => {
  await mongoose.connection.close()
})