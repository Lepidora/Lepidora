/*
 * Routing for pages
 */

var index = require('./routes/index')
  , pages = require('./routes/pages')
  , toys = require('./routes/toys');

module.exports = function(app) {
	
	app.get('/', index.render);
	app.get('/toys/emojitext', toys.emojitext)
	//app.get('/download', pages.download);
	//app.get('/upload', pages.upload);
};