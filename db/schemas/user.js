const mongoose = require('mongoose')
const bcrypt = require('mongoose-bcrypt')
const { Schema } = mongoose

// Field User table
// username, password

const userSchema = new Schema({
  username: {
    type: String,
    required: true, // การบอกว่า ต้องส่งค่ามานะ
    unique: true // การบอกว่า ห้ามเพิ่มข้อมูลซ้ำ
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

userSchema.plugin(bcrypt)

module.exports = userSchema
