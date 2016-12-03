var schedule = require('node-schedule'),
  htmlparser = require('htmlparser2'),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article'),
  Bill = mongoose.model('Bill'),
  BillText = mongoose.model('BillText');

var FeedParser = require('feedparser'),
  request = require('request');

module.exports = () => {

  var saveBillText = (billText, savedBill) => {
    new BillText( Object.assign({}, {'_bill': savedBill._id}, billText) ).save((err, doc) => {
      if(err) {

      } else {
        // console.log('saved bill text');
        Bill.update({'_id': savedBill._id}, { $set: { '_text': doc._id }}, (err, doc) => {
          // console.log('updated bill');
        })
      }
    })
  }

  var getBillText = (savedBill) => {
    var billType = savedBill.bill_type_label.replace(new RegExp(/\./g), '').toLowerCase();
    var url = savedBill.data_source_link+'data/congress/'+savedBill.congress+'/bills/'+billType+'/'+billType+savedBill.number+'/data.json';
    request.get(url, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        // console.log('got bill text')
        saveBillText(JSON.parse(body), savedBill);
      }
    })
  }

  var saveBills = (bills) => {
    bills.forEach((bill) => {
      Bill.find({id: bill.id}, (err, doc) => {
        if(!err && doc.length) {
          // console.log('bill already exists');
        } else if(!err) {
          new Bill( Object.assign({}, {data_source_link: source.link, data_source_title: source.title}, bill) ).save((err, doc) => {
            if(err) {
              // console.log('error saving new bill');
            } else {
              // console.log('new bill saved!');
              getBillText(doc);
            }
          })
        }
      })
    })
  };

  var getBills = (source) => {
    console.log('GET BILLS FROM: '+source.title);
    request.get(source.url, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        saveBills(JSON.parse(body).objects);
      }
    })
  };

  var source = {
    url: 'https://www.govtrack.us/api/v2/bill?order_by=-current_status_date&limit=25',
    title: 'GovTrack',
    link: 'https://www.govtrack.us/'
  }

  getBills(source);
  setInterval(() => { getBills(source) }, 6000000);
}
