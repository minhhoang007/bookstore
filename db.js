const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

 
const adapter = new FileSync('books.json')
const db = low(adapter)

// Set some defaults
db.defaults({  books: [] , users: [], transactions: []})
  .write()

  module.exports = db