const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = (blogs) => {
  if (blogs.length === 1) {
    return blogs[0]
  } else if (blogs.length > 1) {
    let topBlog = blogs[0]

    blogs.forEach(blog => {
      if (blog.likes > topBlog.likes) {
        topBlog = blog
      }
    })

    return topBlog
  } else {
    return {}
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}