var schedule = require('node-schedule'),
  htmlparser = require('htmlparser2'),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article'),
  Feed = mongoose.model('Feed');

var FeedParser = require('feedparser'),
  request = require('request');

module.exports = () => {
  var getNewsFeed = (feed, callback) => {
    var articles = [],
      data;

    request.get(feed.rss)
      .on('error', function (error) {
        console.error(error);
      })
      .pipe(new FeedParser())
      .on('error', function (error) {
        console.error(error);
      })
      // .on('meta', function (meta) {
      //   console.log('===== %s =====', meta.title);
      // })
      .on('readable', function() {
        var stream = this, item;
        while (item = stream.read()) {
          // console.log(item);
          articles.push({ uid: item.guid, title: item.title, description: item.description, url: item.link, photo: item.image.url, published: item.pubDate});
        }
      })
      .on('end', function() {
        return callback(articles);
      });
  };

  var getNewsFeeds = () => {
    Feed.find({}, (err, feeds) => {
      if(err) {
        // console.log(err);
      } else {
        var feedNames = [];
        feeds.forEach((feed) => {
          feedNames.push(feed.name);
        });
        console.log('GET NEWS: '+feedNames.join(', '));
        feeds.forEach((feed) => {
          var saveArticlesCallback = (articles) => {
            articles.forEach((article) => {
              Article.find({uid: article.uid}, (err, art) => {
                if(!err && art.length) {
                  // console.log('article already exists');
                } else if(!err) {
                  if(article.description && article.description.charAt(0) === '<') {
                    var desc = "";
                    var parser = new htmlparser.Parser({
                      onopentag: (name, attribs) => {
                        if(name === "img") {
                          article.photo = attribs.src;
                        }
                      },
                      ontext: (text) => {
                        if(!new RegExp(/\b[rR]ead\s\b[mM]ore(...|\b)/g).test(text)) {
                          desc = desc.concat(text);
                        }
                      }
                    }, {decodeEntities: true});
                    parser.write(article.description);
                    parser.end();
                    article.description = desc;
                  }
                  new Article( Object.assign({}, article, { _feed: feed._id }) ).save((err, saved) => {
                    if(err) {
                      // console.log('article save error');
                    } else {
                      // console.log('article saved!');
                    }
                  })
                }
              })
            })
          };

          getNewsFeed(feed, saveArticlesCallback);
        })
      }
    });
  }
  getNewsFeeds();
  setInterval(getNewsFeeds, 6000000);
}
