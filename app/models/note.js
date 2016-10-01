var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var noteSchema = new Schema({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  body: { type: String, default: '' },
  title_color: { type: String, default: '' },
  body_color: { type: String, default: '' },
  _creator: { type: Schema.Types.ObjectId, ref: 'User' },
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

module.exports = mongoose.model('Note', noteSchema);
