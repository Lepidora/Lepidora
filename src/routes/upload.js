/*
 * GET upload page.
 */

var storage = require('../controllers/storage');

exports.render = function(fileID) {
	return renderPage;
};
	
function renderPage(req, res) {
	res.render('upload', { title: 'Upload' });
}