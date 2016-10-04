var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var billTextSchema = new Schema(
{
  "_bill": { type: Schema.Types.ObjectId, ref: 'Bill' },
  "actions": { type: Array },//[
  //   {
  //     "acted_at": "2013-03-06",
  //     "committees": [
  //       "HSED"
  //     ],
  //     "references": [],
  //     "status": "REFERRED",
  //     "text": "Referred to the House Committee on Education and the Workforce.",
  //     "type": "referral"
  //   },
  //   {
  //     "acted_at": "2013-04-23",
  //     "in_committee": null,
  //     "references": [],
  //     "text": "Referred to the Subcommittee on Early Childhood, Elementary, and Secondary Education.",
  //     "type": "referral"
  //   }
  // ],
  "amendments": { type: Array },
  "bill_id": { type: String, default: '' },
  "bill_type": { type: String, default: '' },
  "by_request": { type: Boolean },
  "committees": { type: Array },//[
  //   {
  //     "activity": [
  //       "referral",
  //       "in committee"
  //     ],
  //     "committee": "House Education and the Workforce",
  //     "committee_id": "HSED"
  //   },
  //   {
  //     "activity": [
  //       "referral"
  //     ],
  //     "committee": "House Education and the Workforce",
  //     "committee_id": "HSED",
  //     "subcommittee": "Subcommittee on Early Childhood, Elementary, and Secondary Education",
  //     "subcommittee_id": "14"
  //   }
  // ],
  "congress": { type: String, default: '' },
  "cosponsors": { type: Array },//[
  //   {
  //     "district": "1",
  //     "name": "Bishop, Timothy H.",
  //     "sponsored_at": "2013-03-06",
  //     "state": "NY",
  //     "thomas_id": "01740",
  //     "title": "Rep",
  //     "withdrawn_at": null
  //   },
  //   {
  //     "district": "1",
  //     "name": "DeGette, Diana",
  //     "sponsored_at": "2013-12-12",
  //     "state": "CO",
  //     "thomas_id": "01479",
  //     "title": "Rep",
  //     "withdrawn_at": null
  //   },
  //   {
  //     "district": "18",
  //     "name": "Jackson Lee, Sheila",
  //     "sponsored_at": "2013-04-10",
  //     "state": "TX",
  //     "thomas_id": "00588",
  //     "title": "Rep",
  //     "withdrawn_at": null
  //   }
  // ],
  "enacted_as": { type: String, default: '' },
  "history": { type: Object },//{
  //   "active": false,
  //   "awaiting_signature": false,
  //   "enacted": false,
  //   "vetoed": false
  // },
  "introduced_at": { type: Date },
  "number": { type: String, default: '' },
  "official_title": { type: String, default: '' },
  "popular_title": { type: String, default: '' },
  "related_bills": { type: Array },
  "short_title": { type: String, default: '' },
  "sponsor": { type: Object },
  "status": { type: String, default: '' },
  "status_at": { type: Date },
  "subjects": { type: Array },
  "subjects_top_term": { type: String, default: '' },
  "summary": { type: Object },
  "titles": { type: Array },
  "updated_at": { type: Date },
  "url": { type: String, default: '' }
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

module.exports = mongoose.model('BillText', billTextSchema);
