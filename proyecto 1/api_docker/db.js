import conn from './connection.js'

export async function getAllBlogs () {
  try {
    const [rows] = await conn.query('SELECT * FROM blogs')
    return { status: 200, data: rows }

  } catch (e) {
    console.log(e)
    return { status: 500, error: e }
  }
}

export async function getAllUsers () {
  try {
    const [rows] = await conn.query('SELECT * FROM users')
    return { status: 200, data: rows }

  } catch (e) {
    console.log(e)
    return { status: 500, error: e }
  }
}

export async function createBlog (title, content, item_image, image_description) {
  try {
    const [result] = await conn.query(`INSERT INTO blogs (title, content, item_image, image_description) VALUES ('${title.replace(/'/g, '\'\'')}', '${content.replace(/'/g, '\'\'')}', '${item_image.replace(/'/g, '\'\'')}', '${image_description.replace(/'/g, '\'\'')}')`)
    return { status: 201, data: result }

  } catch (e) {
    console.log(e)
    return { status: '400', error: 'Incorrect body format' }
  }
}

export async function deleteBlog (id) {
  try {
    const [existingBlog] = await conn.query(`SELECT * FROM blogs WHERE id = ${id}`)
    if (existingBlog.length === 0) {
      return { status: 404, error: 'Blog not found' }
    }

    const [result] = await conn.query(`DELETE FROM blogs WHERE id = ${id}`)
    return { status: 204, data: result }
  } catch (e) {
    console.log(e)
    return { status: 500, error: e }
  }
}

export async function getBlogById (id) {
  try {
    const [blog] = await conn.query(`SELECT * FROM blogs WHERE id = ${id}`)
    if (blog.length === 0) {
      return { status: 404, error: 'Blog not found' }
    }
    return { status: 200, data: blog }
  } catch (e) {
    console.log(e)
    return { status: 500, error: e }
  }
}

export async function getUserById (id) {
  try {
    const [user] = await conn.query(`SELECT * FROM users WHERE id = ${id}`)
    if (user.length === 0) {
      return { status: 404, error: 'User not found' }
    }
    return { status: 200, data: user }
  } catch (e) {
    console.log(e)
    return { status: 500, error: e }
  }
}

export async function editBlog (id, title, content, item_image, image_description){
  try {
    const [existingBlog] = await conn.query(`SELECT * FROM blogs WHERE id = ${id}`)
    if (existingBlog.length === 0) {
      return { status: 404, error: 'Blog not found' }
    }

    const [result] = await conn.query(`UPDATE blogs SET title = '${title.replace(/'/g, '\'\'')}', content = '${content.replace(/'/g, '\'\'')}', item_image = '${item_image.replace(/'/g, '\'\'')}', image_description = '${image_description.replace(/'/g, '\'\'')}' WHERE id = ${id}`)
    return { status: 200, data: result }

  } catch (e) {
    console.log(e)
    return { status: '400', error: 'Incorrect body format' }
  }
}
