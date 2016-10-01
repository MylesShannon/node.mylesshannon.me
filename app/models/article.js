var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var articleSchema = new Schema({
  uid: { type: String, unique: true },
  title: { type: String, default: '' },
  url: { type: String, default: '' },
  photo: { type: String, default: '' },
  description: { type: String, default: '' },
  published: { type: Date },
  source: { type: String, default: '' },
  _feed: { type: Schema.Types.ObjectId, ref: 'Feed' }
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

module.exports = mongoose.model('Article', articleSchema);
