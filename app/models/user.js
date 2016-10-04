var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var userSchema = new Schema({
  email: { type: String, default: '' },
  provider: { type: String, default: '' },
  uid: { type: String, unique: true, required: true },
  name: {
    first: { type: String, default: '' },
    last: { type: String, default: '' }
  },
  profile_picture: { type: String, default: '' },
  access_token: { type: String, default: '' },
  _votes_by_bill: [{type: Schema.Types.ObjectId, ref: 'Bill', index: { unique: true } }],
},
{
  timestamps: true,
  toObject: {
    virtuals: true,
    transform: (doc, ret, options) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.access_token;
      return ret;
    }
  }
});

userSchema.virtual('name.full').get(function () {
  return this.name.first + ' ' + this.name.last;
});

module.exports = mongoose.model('User', userSchema);
