import fs from 'fs';
import md5 from "md5";
import mongojs from 'mongoist';
import db from '../modules/database';
import { JWTAsync } from '../modules/jwt-async';
import { Get, Post } from '../modules/express-decorator';

class BootstrapApi {

	@Get('/lib/aos.css')
	aos(req, res) {
		var file = req.params.file;
		res.setHeader('Content-Type', 'text/css');
		var stream = fs.createReadStream('./listo/lib/aos.css');
		stream.on("error", ()=>{res.send("No File");});	stream.pipe(res);
	}
	
	@Get('/lib/selectric/selectric.css')
	selectricCss(req, res) {
		var file = req.params.file;
		res.setHeader('Content-Type', 'text/css');
		var stream = fs.createReadStream('./listo/lib/selectric/selectric.css');
		stream.on("error", ()=>{res.send("No File");});	stream.pipe(res);
	}

	@Get('/lib/animate.css')
	animateCss(req, res) {
		var file = req.params.file;
		res.setHeader('Content-Type', 'text/css');
		var stream = fs.createReadStream('./listo/lib/animate.css');
		stream.on("error", ()=>{res.send("No File");});	stream.pipe(res);
	}
	
	@Get('/lib/bootstrap/css/bootstrap.min.css')
	bootStrapMin(req, res) {
		var file = req.params.file;
		res.setHeader('Content-Type', 'text/css');
		var stream = fs.createReadStream('./listo/lib/bootstrap/css/bootstrap.min.css');
		stream.on("error", ()=>{res.send("No File");});	stream.pipe(res);
	}

	@Get('/lib/bootstrap/css/bootstrap.css')
	bootStrap(req, res) {
		var file = req.params.file;
		res.setHeader('Content-Type', 'text/css');
		var stream = fs.createReadStream('./listo/lib/bootstrap/css/bootstrap.css');
		stream.on("error", ()=>{res.send("No File");});	stream.pipe(res);
	}

	@Get('/assets/global/plugins/font-awesome/fonts/:file')
	favicon(req, res) {
		var file = req.params.file;
		res.setHeader('Content-Type', 'text/css');
		var stream = fs.createReadStream('./html/assets/global/plugins/font-awesome/fonts/' + file);
		stream.on("error", ()=>{res.send("No File");});	stream.pipe(res);
	}

	@Get('/assets/global/plugins/font-awesome/fonts/:file')
	cssGlobal(req, res) {
		var file = req.params.file;
		res.setHeader('Content-Type', 'text/css');
		var stream = fs.createReadStream('./html/assets/global/plugins/font-awesome/fonts/' + file);
		stream.on("error", ()=>{res.send("No File");});	stream.pipe(res);
	}

	@Get('/css/style.css')
	cssStyle(req, res) {
		var file = req.params.file;
		res.setHeader('Content-Type', 'text/css');
		var stream = fs.createReadStream('./html/css/style.css');
		stream.on('error', (err)=>{       
            res.send("no file")
        });
		stream.on("error", ()=>{res.send("No File");});	stream.pipe(res);
	}

	@Get('/fonts/:file')
	fontFile(req, res) {
		var file = req.params.file;
		res.setHeader('Content-Type', '');
		var stream = fs.createReadStream('./listo/lib/font-awesome/fonts/' + file);
		stream.on("error", ()=>{res.send("No File");});	stream.pipe(res);
	}

	@Get('/assets/global/plugins/font-awesome/css/:file')
	fontAwesome(req, res) {
		var file = req.params.file;
		res.setHeader('Content-Type', 'text/css');
		var stream = fs.createReadStream('./html/assets/global/plugins/font-awesome/css/' + file);
		stream.on("error", ()=>{res.send("No File");});	stream.pipe(res);
	}

	@Get('/css/:file')
	cssFile(req, res) {
		var file = req.params.file;
		res.setHeader('Content-Type', 'text/css');
		var stream = fs.createReadStream('./html/css/' + file);
		stream.on('error', (err)=>{       
            res.send("no file")
        });
		stream.on("error", ()=>{res.send("No File");});	stream.pipe(res);
	}

	@Get('/assets/global/plugins/bootstrap/css/:file')
	bootStrapPlugins(req, res) {
		var file = req.params.file;
		res.setHeader('Content-Type', 'text/css');
		var stream = fs.createReadStream('./html/assets/global/plugins/bootstrap/css/' + file);
		stream.on("error", ()=>{res.send("No File");});	stream.pipe(res);
	}

	@Get('/assets/global/plugins/bootstrap-switch/css/:file')
	bootstrapSwitch(req, res) {
		var file = req.params.file;
		res.setHeader('Content-Type', 'text/css');
		var stream = fs.createReadStream('./html/assets/global/plugins/bootstrap-switch/css/' + file);
		stream.on("error", ()=>{res.send("No File");});	stream.pipe(res);
	}

	@Get('/assets/pages/css/:file')
	cssAssets(req, res) {
		var file = req.params.file;
		res.setHeader('Content-Type', 'text/css');
		var stream = fs.createReadStream('./html/assets/pages/css/' + file);
		stream.on("error", ()=>{res.send("No File");});	stream.pipe(res);
	}

	@Get('/assets/global/css/:file')
	globalCss(req, res) {
		var file = req.params.file;
		res.setHeader('Content-Type', 'text/css');
		var stream = fs.createReadStream('./html/assets/global/css/' + file);
		stream.on("error", ()=>{res.send("No File");});	stream.pipe(res);
	}

	@Get('/assets/layouts/layout/css/:file')
	cssLayouts(req, res) {
		var file = req.params.file;
		res.setHeader('Content-Type', 'text/css');
		var stream = fs.createReadStream('./html/assets/layouts/layout/css/' + file);
		stream.on("error", ()=>{res.send("No File");});	stream.pipe(res);
	}

	@Get('/assets/layouts/layout/css/themes/:file')
	cssThemes(req, res) {
		var file = req.params.file;
		res.setHeader('Content-Type', 'text/css');
		var stream = fs.createReadStream('./html/assets/layouts/layout/css/themes/' + file);
		stream.on("error", ()=>{res.send("No File");});	stream.pipe(res);
	}

	@Get('/assets/pages/css/:file')
	cssPages(req, res) {
		var file = req.params.file;
		res.setHeader('Content-Type', 'text/css');
		var stream = fs.createReadStream('./html/assets/pages/css/' + file);
		stream.on("error", ()=>{res.send("No File");});	stream.pipe(res);
	}

	@Get('/css/:path/:file')
	cssFiles(req, res) {
		var file = req.params.file;
		var path = req.params.path;
		res.setHeader('Content-Type', 'text/css');
		var stream = fs.createReadStream('./html/css/' + path + '/' + file);
		stream.on("error", ()=>{res.send("No File");});	stream.pipe(res);
	}

	@Get('/scripts/:bundle')
	bundles(req, res) {
		var bundle = req.params.bundle;
		res.setHeader('Content-Type', '');
		var stream = fs.createReadStream('./html/scripts/' + bundle);
		stream.on("error", ()=>{res.send("No File");});	stream.pipe(res);
	}

	@Get('/electron')
	electronApp(req, res) {
		var bundle = req.params.bundle;
		res.setHeader('Content-Type', '');
		var stream = fs.createReadStream('./html/assets/reactApp.js');
		stream.on("error", ()=>{res.send("No File");});	stream.pipe(res);
	}

	@Get('/img/store/:file')
	storeFile(req, res) {
		var file = req.params.file;
		res.setHeader('Content-Type', '');
		var stream = fs.createReadStream('./listo/img/store/' + file);
		stream.on("error", ()=>{res.send("No File");});	stream.pipe(res);
	}

	@Get('/img/demo/:file')
	demoFiles(req, res) {
		var file = req.params.file;
		res.setHeader('Content-Type', '');
		var stream = fs.createReadStream('./listo/img/demo/' + file);
		stream.on("error", ()=>{res.send("No File");});	stream.pipe(res);
	}


	@Get('/img/demo/icons/:file')
	demoIcons(req, res) {
		var file = req.params.file;
		res.setHeader('Content-Type', '');
		var stream = fs.createReadStream('./listo/img/demo/icons/' + file);
		stream.on("error", ()=>{res.send("No File");});	stream.pipe(res);
	}

	@Get('/img/demo/property/:file')
	proppertyFiles(req, res) {
		var file = req.params.file;
		res.setHeader('Content-Type', '');
		var stream = fs.createReadStream('./listo/img/demo/property/' + file);
		stream.on("error", ()=>{res.send("No File");});	stream.pipe(res);
	}

	@Get('/images/:file')
	getImages(req, res) {
		var file = req.params.file;
		res.setHeader('Content-Type', '');
		var stream = fs.createReadStream('./images/' + file);
		stream.on("error", ()=>{res.send("No File");});	stream.pipe(res);
	}


	@Get('/fav/img/favicon.ico')
	htmlImg(req, res) {
		var file = req.params.file;
		res.setHeader('Content-Type', '');
		var stream = fs.createReadStream('./html/img/favicon.ico');
		stream.on("error", ()=>{res.send("No File");});	stream.pipe(res);
	}


	@Get('/api/getForgeryToken')
	async getForgeryToken(req, res) {

		let jwtAsync = JWTAsync.init('e8vh745v9o875w9v');
		let decoded;

		if (req.cookies["UserToken"]) {
			decoded = await jwtAsync.verify(req.cookies["UserToken"]);
		} else {
			return res.send({ redirect: "/login" });
		}

		if (decoded) {
			decoded.ForgeryToken = md5(new Date().getTime() + decoded.userId);
			var token = await jwtAsync.sign(decoded);
			res.cookie("UserToken", token);
			let user = await db.collection('users').findOne({ _id: mongojs.ObjectId(decoded.userId) }, { permissions: 1 });
			return res.send({ ForgeryToken: decoded.ForgeryToken, permissions: user.permissions });
		} else {
			return res.status(401).send({ message: "UnAuthorized" });
		}
	}
	
	@Get('/admin')
	adminPage(req, res) {
		res.setHeader('Content-Type', 'text/html');
		var stream = fs.createReadStream('./html/admin.html');
		stream.on('error', (err)=>{       
            res.send("no file")
        });		
		stream.on("error", ()=>{res.send("No File");});	stream.pipe(res);
	}

	@Get('/login')
	loginPage(req, res) {
		res.setHeader('Content-Type', 'text/html');
		var stream = fs.createReadStream('./html/login.html');
		stream.on("error", ()=>{res.send("No File");});	stream.pipe(res);
	}

	@Get('/*')
	wildCard(req, res) {
		res.setHeader('Content-Type', 'text/html');
		var stream = fs.createReadStream('./html/index.html');
		stream.on("error", ()=>{res.send("No File");});	stream.pipe(res);
	}

};

export { BootstrapApi }