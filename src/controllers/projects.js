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
const projectpath = path.join(__dirname, '..', 'projects');
const jsonpath = path.join(projectpath, 'json');
const markdownpath = path.join(projectpath, 'markdown');
const projects = {
		all: {},
		important: {},
		normal: {}
};

loadProjects();

function loadProjects() {
	
	//Load all files in the projects path
	let files = fs.readdirSync(jsonpath);
	
	//Iterate through the 'files' object and run 
	files.forEach(function (filename) {
		
		if(!fs.statSync(path.join(jsonpath, filename)).isDirectory()) {
			
			//Validate and add the project file
			readProjectFile(filename);			
		}
	});
	
	var importantpath = path.join(projectpath, 'important.json');
	
	if (fs.existsSync(importantpath)) {
		
		let important = require(importantpath);
		
		//Add any projects in the important files to the 'important' array
		important.forEach(function (id) {
			
			let project = projects.all[id];
			
			if (project !== undefined) {
				projects.important[id] = project;
			}
		});
	}
}

function clearObject(object) {
    for (const property of Object.keys(object)) {
        delete object[property];
    }
}

exports.reloadProjects = () => {
	
	/*projects.all = {};
	projects.important = {};
	projects.normal = {};*/
    
    clearObject(projects.all);
    clearObject(projects.important);
    clearObject(projects.normal);
	
	loadProjects();
	
	console.log('Reloaded projects!');
}

function readProjectFile(filename) {
	
	var filelocation = path.join(jsonpath, filename);
	
	//Load the data in the given file as JSON
	let data = require(filelocation);
	
	//Only add the project if the contents is valid
	if (validateProject(filename, data)) {
		
		//The 'content' field of the data file can be the name of a markdown file in the projects path
		//If so, read the file and replace the 'content' field with the file's contents
		let contentfile = data.content;
		
		let contentlocation = path.join(markdownpath, contentfile);
		
		//Check the markdown file exists
		if (fs.existsSync(contentlocation)) {
			
			//Read the markdown from the given filepath;
			let contents = fs.readFileSync(contentlocation, 'utf8');
			
			//Render the markdown into HTML
			let render = renderMarkdown(contents);
			
			//Replace the 'content' field in the project with the rendered markdown
			data.content = render;
		}
		
		//Add the project to the projects store
		projects.all[data.id] = data;
		
		//If the project is marked as important, add it to the important projects list
		/*if (data.important) {
			projects.important[data.id] = data;
		} else {
			projects.normal[data.id] = data;
		}*/
		
	} else {
		//Notify the console if the project was invalid
		console.log(`The project at ${filename} was invalid, skipping`);
	}
}

function addMarkdownFile(id, content) {
    
    let filelocation = path.join(markdownpath, id + '.md');
    
    //let data = 
    
}

function validateProject(filename, project) {
	
	//The list of fields to check for
	const fields = ['id', 'name', 'description', 'content'];
	
	let valid = true;
	
	//Iterate through every field
	for (let index = 0; index < fields.length; index++) {

		//Get the current field
		let field = fields[index];
		
		//If 'contents' doesn't have a given field, notify the console and change the 'valid' flag
		if (!project[field]) {
			console.log(`Project file at ${filename} missing ${field} field`);
			valid = false;
		}
	}
	
	//If all fields are present, this will return true, otherwise it will return false
	return valid;
}

exports.addNewProject = (id, name, description, tags, content) => {
    
    let errors = [];
    let warnings = [];
    
    if (!id || id === '') {
        errors.push('id');
    }
    
    if (!name || name === '') {
        errors.push('name');
    }
    
    if (!description || description === '') {
        errors.push('description');
    }
    
    if (!markdown || markdown === '') {
        errors.push('markdown');
    } 
    
    if (!tags || tags.length === 0) {
        warnings.push('tags');
    }
    
    if (errors.length > 0 || warnings.length > 0) {
        return { errors: errors, warnings: warnings };
    }
    
    
    
};

//Putting this into function lets us also use it externally
function renderMarkdown(content) {
    return markdown.render(content);
}

exports.renderMarkdown = renderMarkdown;

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