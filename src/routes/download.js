/*
 * GET download page.
 */

var storage = require('../controllers/storage');

exports.render = function(fileID) {
	return renderPage;
};
	
function renderPage(req, res) {
	res.render('download', { title: 'Download' });
}