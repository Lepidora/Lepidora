
/*
 * GET home page.
 */

const path = require('path');

const projects = require('../controllers/projects.js');
const skills = require('../projects/skills.json');

skills.forEach((skill) => {
	if (skill.image) {
		skill.image = path.join('/images', 'skills', skill.image);
	}
});

exports.render = function(req, res) {
	
	//Get all projects
	var projectlist = projects.getImportant();
	
	//Render the index template with all projects
	res.render('index', { title: 'Lepidora', projects: projectlist, skills: skills });
};