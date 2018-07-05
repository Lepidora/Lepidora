/*
 * Routing for pages
 */

var path = require('path');

var index = require('./routes/index')
  , pages = require('./routes/pages')
  , toys = require('./routes/toys')
  , projects = require('./controllers/projects.js');

module.exports = function(app) {
	
	app.get('/', index.render);
	app.get('/emojitext', toys.emojitext);
	app.get('/project/:project', renderProject());
	app.get('/reloadprojects', projects.reloadProjects);
	
	//app.get('/download', pages.download);
	//app.get('/upload', pages.upload);
};

function renderProject() {
	return (req, res) => {
		res.render('project', { project: projects.get(req.params.project) });
	};
}