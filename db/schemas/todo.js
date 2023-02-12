const mongoose = require('mongoose')
const { Schema } = mongoose

const todoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  subTitle: String,
  description: String,
  status: { // true หมายถึงทำสำเร็จ, false หมายถึงกำลังทำ
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = todoSchema
