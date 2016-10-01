var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var feedSchema = new Schema({
  name: { type: String, default: '' },
  homepage: { type: String, default: '' },
  rss: { type: String, default: '' },
  description: { type: String, default: '' },
  photo: { type: String, default: '' }
},
{
  timestamps: true,
  toObject: {
    transform: (doc, ret, options) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

module.exports = mongoose.model('Feed', feedSchema);
