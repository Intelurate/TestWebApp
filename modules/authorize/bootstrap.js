var fs = require('fs');
var jwt = require('jsonwebtoken');
var md5 = require('md5');

module.exports.set = function (app) {

	// ************************************************
	// Theme and CSS files
	// ************************************************
	app.get('/assets/global/plugins/font-awesome/fonts/:file', function (req, res) {
		var file = req.params.file;
		res.setHeader('Content-Type', 'text/css');
		var stream = fs.createReadStream('./html/assets/global/plugins/font-awesome/fonts/' + file);
		stream.pipe(res);
	});	

	app.get('/assets/global/plugins/font-awesome/css/:file', function (req, res) {
		var file = req.params.file;
		res.setHeader('Content-Type', 'text/css');
		var stream = fs.createReadStream('./html/assets/global/plugins/font-awesome/css/' + file);
		stream.pipe(res);
	});	

	app.get('/css/:file', function (req, res) {
		var file = req.params.file;
		res.setHeader('Content-Type', 'text/css');
		var stream = fs.createReadStream('./html/css/' + file);
		stream.pipe(res);
	});

	app.get('/assets/global/plugins/bootstrap/css/:file', function (req, res) {
		var file = req.params.file;
		res.setHeader('Content-Type', 'text/css');
		var stream = fs.createReadStream('./html/assets/global/plugins/bootstrap/css/' + file);
		stream.pipe(res);
	});

	app.get('/assets/global/plugins/bootstrap-switch/css/:file', function (req, res) {
		var file = req.params.file;
		res.setHeader('Content-Type', 'text/css');
		var stream = fs.createReadStream('./html/assets/global/plugins/bootstrap-switch/css/' + file);
		stream.pipe(res);
	});	

	app.get('/assets/pages/css/:file', function (req, res) {
		var file = req.params.file;
		res.setHeader('Content-Type', 'text/css');
		var stream = fs.createReadStream('./html/assets/pages/css/' + file);
		stream.pipe(res);
	});

	app.get('/assets/global/css/:file', function (req, res) {
		var file = req.params.file;
		res.setHeader('Content-Type', 'text/css');
		var stream = fs.createReadStream('./html/assets/global/css/' + file);
		stream.pipe(res);
	});

	app.get('/assets/layouts/layout/css/:file', function (req, res) {
		var file = req.params.file;
		res.setHeader('Content-Type', 'text/css');
		var stream = fs.createReadStream('./html/assets/layouts/layout/css/' + file);
		stream.pipe(res);
	});
	
	app.get('/assets/layouts/layout/css/:file', function (req, res) {
		var file = req.params.file;
		res.setHeader('Content-Type', 'text/css');
		var stream = fs.createReadStream('./html/assets/layouts/layout/css/' + file);
		stream.pipe(res);
	});

	app.get('/assets/layouts/layout/css/themes/:file', function (req, res) {
		var file = req.params.file;
		res.setHeader('Content-Type', 'text/css');
		var stream = fs.createReadStream('./html/assets/layouts/layout/css/themes/' + file);
		stream.pipe(res);
	});

	app.get('/assets/pages/css/:file', function (req, res) {
		var file = req.params.file;
		res.setHeader('Content-Type', 'text/css');
		var stream = fs.createReadStream('./html/assets/pages/css/' + file);
		stream.pipe(res);
	});

	app.get('/css/:path/:file', function (req, res) {
		var file = req.params.file;
		var path = req.params.path;
		res.setHeader('Content-Type', 'text/css');
		var stream = fs.createReadStream('./html/css/' + path + '/' + file);
		stream.pipe(res);
	});

	app.get('/scripts/:bundle', function (req, res) {
		var bundle = req.params.bundle;
		res.setHeader('Content-Type', '');
		var stream = fs.createReadStream('./html/scripts/' + bundle);
		stream.pipe(res);
	});

	app.get('/img/:file', function (req, res) {
		var file = req.params.file;
		res.setHeader('Content-Type', '');
		var stream = fs.createReadStream('./html/img/' + file);
		stream.pipe(res);
	});

	app.get('/img/:path/:file', function (req, res) {
		var file = req.params.file;
		var path = req.params.path;
		res.setHeader('Content-Type', '');
		var stream = fs.createReadStream('./html/img/' + path + "/" + file);
		stream.pipe(res);
	});

	app.get('/reports/:file', function (req, res) {
		var file = req.params.file;
		res.setHeader('Content-Type', 'application/octet-stream');
		var stream = fs.createReadStream('./tmp_reports/' + file);
		stream.pipe(res);
	});	

	app.get('/login', function (req, res) {
		res.setHeader('Content-Type', 'text/html');
		var stream = fs.createReadStream('./html/login.html');
		stream.pipe(res);
	});

	app.get('/getForgeryToken', function (req, res) {

        jwt.verify( req.cookies["UserToken"], 'e8vh745v9o875w9v', function(err, decoded) {			
			if(decoded) {  			
				decoded.ForgeryToken = md5(new Date().getTime() + decoded.userId);
				var token = jwt.sign(decoded, 'e8vh745v9o875w9v');                        		
				res.cookie("UserToken", token);							
				res.send({ ForgeryToken: "5f653vw4q56fgw675gqw3o65" });
			}
		});
	});

	app.get('/*', function (req, res) {
		res.setHeader('Content-Type', 'text/html');
		var stream = fs.createReadStream('./html/index.html');
		stream.pipe(res);
	});

};