
/*
 * GET general page.
 */

const projects = require('../controllers/projects.js');

exports.admin = (req, res) => {
    res.render('admin', {});
}

exports.adminPost = (req, res) => {
    
    let body = req.body;
    
    if (body) {
        
        let content = body.content;
        let type = body.type;
        
        if (type === 'preview') {
            res.send(JSON.stringify({ html: projects.renderMarkdown(content) }));            
        }
        
        if (type === 'submit') {
            //projects.
        }
        
    }   
}