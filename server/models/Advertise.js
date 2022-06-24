const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  items: [{
    image: { type: String },
    url: { type: String },
    hero: { type: mongoose.Schema.Types.ObjectId, ref: 'Hero' },
    article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
  }]
})

module.exports = mongoose.model('Advertise', schema)