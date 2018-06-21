import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongojs from 'mongoist'; //https://www.npmjs.com/package/mongoist
import db from '../modules/database';
import { Get, Post, Put, Delete } from '../modules/express-decorator';

class UsersApi {

    @Get("/logout")
    logout(req, res) {
        res.clearCookie('UserToken');
        res.redirect("/login");
    }

    // GET: http://<host><host>:####/api/login
    @Post("/api/login/")
    async login(req, res) {
        try{

            let user = await db.collection('users').findOne({ email: req.body.email }, { password: 1 });

            if (!user) {
                throw "Username and password is incorrect"
            }

            bcrypt.compare(req.body.password, user.password, (err, password) => {

                if (password === true) {
                    var token = jwt.sign({ userId: user._id.toString() }, 'e8vh745v9o875w9v');
                    res.cookie("UserToken", token);
                    return res.send(true);
                } else {
                    throw "Password Error"
                }
            });
            
        }catch(err){
            return res.status(401).send(false);
        }
    }

    // GET: http://<host>:####/api/users
    @Get("/api/users/", true)
    async users(req, res) {
        try {
            if (!req.query.pageSize) {
                throw "pageSize is required"
            }

            var pageSize = req.query.pageSize;

            let items = await db.collection('users').findAsCursor({ 'deleted': { $exists: false } }, { 'password': 0 })
                .limit(parseInt(pageSize))
                .sort({ firstName: 1 }).toArray();

            res.send(items);
        } catch (err) {
            res.status(400).send({ 'error': 'An error has occurred loading users ' });
        }
    }

    @Get("/api/user/:id", true)
    async getUser(req, res) {
        try {
            let user = await db.collection('users').findOne({ _id: mongojs.ObjectId(req.params.id) }, { permissions: 1, firstName: 1, lastName: 1, email: 1 })
            res.send(user);
        } catch (err) {
            console.log('Error getUser ', err)
            res.status(400).send({ 'error': 'An error has occurred getUser' });
        }
    }

    // GET: http://localhost:####/api/users/loadUserCounter/
    @Get("/api/users/loadUserCounter",true)
    async loadUserCounter(req, res) {
        try {
            let counters = await db.collection('users').runCommand('count', function (err, count) {
                if (err) {
                    res.send({ 'error': 'An error has occurred loading user counters' });
                } else {
                    console.log('Counters ', counters)
                    res.send(counters);
                }
            });
        } catch (err) {
            console.log('Error getUser ', err)
            res.status(400).send({ 'error': 'An error has occurred getUser' });
        }
    }

    // GET: http://<host>:####/api/users/query?pageNumber=100&pageSize=5&sortColumn=firstName&sortOrder=desc&search=user*a
    //app.use('/api/users/query', Auth("GET", { users : { get: {} } }));       
    @Get("/api/users/query", true)
    async userQuery(req, res) {
        var pageNumber = req.query.pageNumber;
        var pageSize = req.query.pageSize;
        var sortColumn = req.query.sortColumn;
        var sortOrder = req.query.sortOrder;
        var search = req.query.search;

        var sortBy = {};
        if (sortColumn !== undefined) {
            if (sortOrder === 'asc') {
                sortBy[sortColumn] = 1;
            } else {
                sortBy[sortColumn] = -1;
            }
        } else {
            sortBy['firstName'] = 1; // TODO - Pass sortColumn Name per parameter
        }

        var searchBy = {};
        // filtering only active users (delete = false)
        searchBy['deleted'] = { $exists: false };
        if (search !== undefined) {
            var field = search.split('*');
            searchBy[field[0]] = new RegExp(".*" + field[1] + ".*", "i")
        }

        let items = await db.collection('users')
            .findAsCursor(eval(searchBy))
            .skip(parseInt(pageSize * (pageNumber - 1)))
            .limit(parseInt(pageSize))
            .sort(sortBy).toArray();

        try {
            res.send(items);
        } catch (err) {
            res.status(400).send({ 'error': 'An error has occurred loading users ' + err });
        }

    }

    // POST: http://<host><host>:####/api/user
    @Post("/api/user")
    async createUser(req, res) {
        const saltRounds = 10;
        var salt = bcrypt.genSaltSync(saltRounds);
        let crypted = bcrypt.hashSync(req.body.password, salt)

        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: crypted,
            email: req.body.email,
            deleted: false,
            permissions: {}
        }

        try {
            let result = await db.users.insert(user)
            res.send(user)
        } catch (err) {
            res.status(400).send({ 'error': "An error posting user has occurred. " + err });
        }

    }

    // PUT: http://<host>:####/api/user/{id}
    @Put("/api/user/:id")
    async updateUserData(req, res) {

        const id = req.params.id;
        const filter = { '_id': mongojs.ObjectId(id) };
        const userUpdate = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            permissions: req.body.permissions
        };

        try {
            let user = await db.collection('users').update(filter, { $set: userUpdate });
            res.send(user);
        } catch (err) {
            res.status(400).send({ 'error': 'An error has occurred loading users ' + err });
        }

    }

    // PUT: http://<host>:####/api/user/delete/{id}
    @Put('/api/user/delete/:id')
    async removeUser(req, res) {

        const id = req.params.id;
        const filter = { '_id': mongojs.ObjectId(id) };
        const userUpdate = {
            delete: true
        };

        try {
            let result = await db.collection('users').update(filter, { $set: userUpdate });
            res.send(result);
        } catch (err) {
            res.status(400).send({ 'error': 'An error has occured deleting User' + err })
        }
    }

}

export { UsersApi }