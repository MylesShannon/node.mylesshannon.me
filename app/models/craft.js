var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var craftSchema = new Schema({
  _pilot: { type: Schema.Types.ObjectId, ref: 'User' },
  _logs_by_craft: [{type: Schema.Types.ObjectId, ref: 'Craft', index: { unique: true } }],
  craft_name: { type: String },
  flight_controller: { type: String },
  power_distribution_board: { type: String },
  transmitter: { type: String },
  receiver: { type: String },
  motors: { type: String },
  electronic_speed_controllers: { type: String },
  video_transmitter: { type: String },
  fpv_camera: { type: String }
},
{
  strict: true,
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

module.exports = mongoose.model('Craft', craftSchema);
