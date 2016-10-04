var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var billSchema = new Schema({
  "_text": { type: Schema.Types.ObjectId, ref: 'BillText' },
  "_votes_by_user": [{type: Schema.Types.ObjectId, ref: 'User', index: { unique: true } }],
  "bill_resolution_type": { type: String, default: '' },
  "bill_type": { type: String, default: '' },
  "bill_type_label": { type: String, default: '' },
  "congress": { type: Number },
  "current_status": { type: String, default: '' },
  "current_status_date": { type: Date },
  "current_status_description": { type: String, default: '' },
  "current_status_label": { type: String, default: '' },
  "data_source_title": { type: String, default: '' },
  "data_source_link": { type: String, default: '' },
  "display_number": { type: String, default: '' },
  "docs_house_gov_postdate": { type: Date },
  "id": { type: Number, unique: true },
  "introduced_date": { type: Date },
  "is_alive": { type: Boolean },
  "is_current": { type: Boolean },
  "link": { type: String, default: '' },
  "lock_title": { type: Boolean },
  "major_actions": { type: Array },//[
  //  [
  //   "datetime.datetime(2012, 4, 19, 0, 0)",
  //   2,
  //   "Read twice and referred to the Committee on Foreign Relations.",
  //   "<action datetime=\"2012-04-19\" state=\"REFERRED\">\n      <text>Read twice and referred to the Committee on Foreign Relations.</text>\n    </action>\n    "
  //  ],
  //  [
  //   "datetime.datetime(2012, 9, 19, 0, 0)",
  //   3,
  //   "Committee on Foreign Relations. Ordered to be reported with an amendment in the nature of a substitute favorably.",
  //   "<calendar datetime=\"2012-09-19\" state=\"REPORTED\">\n      <text>Committee on Foreign Relations. Ordered to be reported with an amendment in the nature of a substitute favorably.</text>\n    </calendar>\n    "
  //  ],
  //  [
  //   "datetime.datetime(2012, 12, 19, 0, 0)",
  //   5,
  //   "Passed Senate with an amendment by Voice Vote.",
  //   "<vote how=\"by Voice Vote\" type=\"vote\" datetime=\"2012-12-19\" where=\"s\" result=\"pass\" state=\"PASS_OVER:SENATE\">\n      <text>Passed Senate with an amendment by Voice Vote.</text>\n      <reference ref=\"CR S8230-8231\" label=\"consideration\"/>\n      <reference ref=\"CR S8230-8231\" label=\"text as passed\"/>\n    </vote>\n    "
  //  ],
  //  [
  //   "datetime.datetime(2013, 1, 1, 23, 15)",
  //   9,
  //   "On motion to suspend the rules and pass the bill Agreed to by voice vote.",
  //   "<vote how=\"by voice vote\" type=\"vote2\" datetime=\"2013-01-01T23:15:00-05:00\" where=\"h\" result=\"pass\" state=\"PASSED:BILL\">\n      <text>On motion to suspend the rules and pass the bill Agreed to by voice vote.</text>\n      <reference ref=\"CR 12/30/2012 H7461\" label=\"text\"/>\n    </vote>\n    "
  //  ],
  //  [
  //   "datetime.datetime(2013, 1, 15, 0, 0)",
  //   28,
  //   "Signed by President.",
  //   "<signed datetime=\"2013-01-15\" state=\"ENACTED:SIGNED\">\n      <text>Signed by President.</text>\n    </signed>\n    "
  //  ]
  // ]
  "noun": { type: String, default: '' },
  "number": { type: Number },
  "related_bills": { type: Array },//[
  //  {
  //   "bill": 251203,
  //   "relation": "unknown"
  //  }
  // ],
  "senate_floor_schedule_postdate": { type: Date },
  "sliplawnum": { type: Number },
  "sliplawpubpriv": { type: String, default: '' },
  "source": { type: String, default: '' },
  "source_link": { type: String, default: '' },
  "sponsor": { type: Array, default: '' }, //{
  //  "bioguideid": "K000148",
  //  "birthday": "1943-12-11",
  //  "cspanid": 1485,
  //  "firstname": "John",
  //  "gender": "male",
  //  "gender_label": "Male",
  //  "id": 300060,
  //  "lastname": "Kerry",
  //  "link": "https://www.govtrack.us/congress/members/john_kerry/300060",
  //  "middlename": "Forbes",
  //  "name": "Sen. John Kerry [D-MA, 1985-2013]",
  //  "namemod": "",
  //  "nickname": "",
  //  "osid": "N00000245",
  //  "pvsid": "53306",
  //  "sortname": "Kerry, John (Sen.) [D-MA, 1985-2013]",
  //  "twitterid": null,
  //  "youtubeid": null
  // },
  "sponsor_role": { type: Array },//{
  //  "caucus": null,
  //  "congress_numbers": [
  //   111,
  //   112,
  //   113
  //  ],
  //  "current": false,
  //  "description": "Senator from Massachusetts",
  //  "district": null,
  //  "enddate": "2013-02-01",
  //  "extra": {
  //   "address": "218 RUSSELL SENATE OFFICE BUILDING WASHINGTON DC 20510",
  //   "contact_form": "http://www.kerry.senate.gov/contact/",
  //   "fax": "202-224-8525",
  //   "office": "218 Russell Senate Office Building"
  //  },
  //  "id": 4125,
  //  "leadership_title": null,
  //  "party": "Democrat",
  //  "person": 300060,
  //  "phone": "202-224-2742",
  //  "role_type": "senator",
  //  "role_type_label": "Senator",
  //  "senator_class": "class2",
  //  "senator_class_label": "Class 2",
  //  "senator_rank": "senior",
  //  "senator_rank_label": "Senior",
  //  "startdate": "2009-01-06",
  //  "state": "MA",
  //  "title": "Sen.",
  //  "title_long": "Senator",
  //  "website": "http://www.kerry.senate.gov"
  // },
  "title": { type: String, default: '' },
  "title_without_number": { type: String, default: '' },
  "titles": { type: Array }//[
  //  [
  //   "short",
  //   "introduced",
  //   "Department of State Rewards Program Update and Technical Corrections Act of 2012"
  //  ],
  //  [
  //   "short",
  //   "passed house",
  //   "Department of State Rewards Program Update and Technical Corrections Act of 2012"
  //  ],
  //  [
  //   "short",
  //   "reported to senate",
  //   "Department of State Rewards Program Update and Technical Corrections Act of 2012"
  //  ],
  //  [
  //   "short",
  //   "passed senate",
  //   "Department of State Rewards Program Update and Technical Corrections Act of 2012"
  //  ],
  //  [
  //   "short",
  //   "enacted",
  //   "Department of State Rewards Program Update and Technical Corrections Act of 2012"
  //  ],
  //  [
  //   "official",
  //   "introduced",
  //   "A bill to authorize the Secretary of State to pay a reward to combat transnational organized crime and for information concerning foreign nationals wanted by international criminal tribunals, and for other purposes."
  //  ]
  // ]
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

module.exports = mongoose.model('Bill', billSchema);
