var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var logSchema = new Schema({
  _craft: { type: Schema.Types.ObjectId, ref: 'Craft' },
  Product: { type: String },
  Data_version: { type: Number },
  I_interval: { type: Number },
  Field_I_name: { type: String },
  Field_I_signed: { type: String },
  Field_I_predictor: { type: String },
  Field_I_encoding: { type: String },
  Field_P_predictor: { type: String },
  Field_P_encoding: { type: String },
  Field_S_name: { type: String },
  Field_S_signed: { type: String },
  Field_S_predictor: { type: String },
  Field_S_encoding: { type: String },
  Firmware_type: { type: String },
  Firmware_revision: { type: String },
  Firmware_date: { type: Date },
  Craft_name: { type: String },
  P_interval: { type: String },
  minthrottle: { type: Number },
  maxthrottle: { type: Number },
  gyro_scale: { type: Number },
  motorOutput: { type: String },
  acc_1G: { type: Number },
  vbatscale: { type: Number },
  vbatcellvoltage: { type: String },
  vbatref: { type: Number },
  currentMeter: { type: String },
  looptime: { type: Number },
  gyro_sync_denom: { type: Number },
  pid_process_denom: { type: Number },
  rcRate: { type: Number },
  rcExpo: { type: Number },
  rcYawRate: { type: Number },
  rcYawExpo: { type: Number },
  thrMid: { type: Number },
  thrExpo: { type: Number },
  dynThrPID: { type: Number },
  tpa_breakpoint: { type: Number },
  rates: { type: String },
  rollPID: { type: String },
  pitchPID: { type: String },
  yawPID: { type: String },
  altPID: { type: String },
  posPID: { type: String },
  posrPID: { type: String },
  navrPID: { type: String },
  levelPID: { type: String },
  magPID: { type: Number },
  velPID: { type: String },
  dterm_filter_type: { type: Number },
  dterm_lpf_hz: { type: Number },
  yaw_lpf_hz: { type: Number },
  dterm_notch_hz: { type: Number },
  dterm_notch_cutoff: { type: Number },
  itermWindupPointPercent: { type: Number },
  yaw_p_limit: { type: Number },
  dterm_average_count: { type: Number },
  vbat_pid_compensation: { type: Number },
  pidAtMinThrottle: { type: Number },
  anti_gravity_threshold: { type: Number },
  anti_gravity_gain: { type: Number },
  setpointRelaxRatio: { type: Number },
  dtermSetpointWeight: { type: Number },
  yawRateAccelLimit: { type: Number },
  rateAccelLimit: { type: Number },
  deadband: { type: Number },
  yaw_deadband: { type: Number },
  gyro_lpf: { type: Number },
  gyro_soft_type: { type: Number },
  gyro_lowpass_hz: { type: Number },
  gyro_notch_hz:{ type: String },
  gyro_notch_cutoff:{ type: String },
  acc_lpf_hz: { type: Number },
  acc_hardware: { type: Number },
  baro_hardware: { type: Number },
  mag_hardware: { type: Number },
  gyro_cal_on_first_arm: { type: Number },
  rc_interpolation: { type: Number },
  rc_interpolation_interval: { type: Number },
  airmode_activate_throttle: { type: Number },
  serialrx_provider: { type: Number },
  unsynced_fast_pwm: { type: Number },
  fast_pwm_protocol: { type: Number },
  motor_pwm_rate: { type: Number },
  digitalIdleOffset: { type: Number },
  debug_mode: { type: Number },
  features: { type: Number },
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

module.exports = mongoose.model('Log', logSchema);
