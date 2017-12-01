
/*
 * GET home page.
 */

const projects = require('../controllers/projects.js');

exports.render = function(req, res) {
	
	//Get all projects
	var projectlist = projects.getAll();
	
	//Render the index template with all projects
	res.render('index', { title: 'Lepidora', projects: projectlist });
};