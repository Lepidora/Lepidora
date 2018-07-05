/**
 * Module for controlling the content to be displayed on the site
 */

//Dependencies
const fs = require('fs');
const marked = require('marked');
const path = require('path');

const highlight = require('highlight.js');

const markdown = require('markdown-it')({
	
	highlight: (str, lang) => {
		if (lang && highlight.getLanguage(lang)) {
			try {
				return highlight.highlight(lang, str).value;
			} catch (e) {}
		}
		
		return '';
	}
});

//Module variables
const projectpath = __dirname + '/../projects/';
const projects = {
		all: {},
		important: {},
		normal: {}
};

loadProjects();

function loadProjects() {
	
	//Load all files in the projects path
	var files = fs.readdirSync(projectpath);
	
	//Iterate through the 'files' object and run 
	files.forEach(function (filename) {
		
		if(!fs.statSync(projectpath + filename).isDirectory()) {
			
			//Validate and add the project file
			addProjectFile(filename);			
		}
	});
}

exports.reloadProjects = () => {
	
	projects.all = {};
	projects.important = {};
	projects.normal = {};
	
	loadProjects();
	
	console.log('Reloaded projects!');
}

function addProjectFile(filename) {
	
	var filelocation = path.join(projectpath, filename);
	
	//Load the data in the given file as JSON
	var data = require(filelocation);
	
	//Only add the project if the contents is valid
	if (validateProject(filename, data)) {
		
		//The 'content' field of the data file can be the name of a markdown file in the projects path
		//If so, read the file and replace the 'content' field with the file's contents
		var contentfile = data.content;
		
		var contentlocation = path.join(projectpath, 'markdown', contentfile);
		
		//Check the markdown file exists
		if (fs.existsSync(contentlocation)) {
			
			//Read the markdown from the given filepath;
			var contents = fs.readFileSync(contentlocation, 'utf8');
			
			//Render the markdown into HTML
			var render = markdown.render(contents);
			
			//Replace the 'content' field in the project with the rendered markdown
			data.content = render;
		}
		
		//Add the project to the projects store
		projects.all[data.id] = data;
		
		//If the project is marked as important, add it to the important projects list
		if (data.important) {
			projects.important[data.id] = data;
		} else {
			projects.normal[data.id] = data;
		}
		
	} else {
		//Notify the console if the project was invalid
		console.log(`The project at ${filename} was invalid, skipping`);
	}
}

function validateProject(filename, project) {
	
	//The list of fields to check for
	const fields = ['id', 'name', 'description', 'content'];
	
	var valid = true;
	
	//Iterate through every field
	for (var index = 0; index < fields.length; index++) {

		//Get the current field
		var field = fields[index];
		
		//If 'contents' doesn't have a given field, notify the console and change the 'valid' flag
		if (!project[field]) {
			console.log(`Project file at ${filename} missing ${field} field`);
			valid = false;
		}
	}
	
	//If all fields are present, this will return true, otherwise it will return false
	return valid;
}

exports.get = function(id) {
	return projects.all[id];
}

exports.getAll = function() {
	return projects.all;
};

exports.getImportant = function() {
	return projects.important;
}

exports.getNormal = function() {
	return projects.normal;
}