import { UsersApi } from '../../server/app';
import Immutable from 'immutable';
import { userReducer } from '../../reactApp/reducers/userReducer';
import UserActions from '../../reactApp/actions/userActions';
import runImports from "../../modules/rebuild-collections";
import { Config } from "../../server/modules/database/config";

describe('Testing UserActions.loadUsers', () => {
   
    test('It should response the GET method', async (done) => {
        
        await runImports([
            'users'
        ], "JestDb/Imports/", Config[process.env.CONFIG].db);

        UsersApi.users.request()
        .query({ pageSize: '1', pageNumber: '1' }) // used for get query     
        // .send({ email: 'Manny', password: 'cat' }) //used for body post and put             
        // ForgeryToken: "64c4904242c55773f949d73ee96ba0de"
        .set('cookie', 'UserToken=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI1YTE0NzA0YmMxOGQ1OTQ3MmQzZjY4ODciLCJpYXQiOjE1MTgwMTIwNjcsIkZvcmdlcnlUb2tlbiI6IjY0YzQ5MDQyNDJjNTU3NzNmOTQ5ZDczZWU5NmJhMGRlIn0.Vll51zi6l38S0JDxx5JL6A31bEV4KBjdaqPDYMVkgTI')
        .set('accept', 'json')
        .then((response) => {

            let state = Immutable.fromJS({
                "users": []
            });

            let expected = Immutable.fromJS({
                "users": [{
                        "_id": "5a14704bc18d59472d3f6887",
                        "firstName": "Eddie",
                        "lastName": "Butler",
                        "userName": "eddie",
                        "email": "ebutler@ethamatics.com",
                        "permissions": {       
                            "users": {
                                "update": {},
                                "read": {},
                                "create": {},
                                "delete": {}
                            }
                        },
                        "users": {
                            "create": {}
                        },
                        "updates": true                  
                }]
            });

            expect(response.statusCode).toBe(200);
            expect(userReducer(state, UserActions.loadUsers(response.body))).toEqual(expected);
            done();
        })
        .catch(err => {
            console.log(err);
        })
    });
});


describe('Testing createUser', () => {

    test('Testing POST method', async (done) => {

        await runImports([
            'users'
        ], "JestDb/Imports/", Config[process.env.CONFIG].db);

        let body = {
            firstName: 'Testing',
            lastName: 'Last Name Testing',
            password: 'test',
            email: 'eddie@microsoft.com',
            permissions: {}
        }

        UsersApi.createUser.request()
            .send(body)
            .set('cookie', 'UserToken=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI1YTE0NzA0YmMxOGQ1OTQ3MmQzZjY4ODciLCJpYXQiOjE1MTgwMTIwNjcsIkZvcmdlcnlUb2tlbiI6IjY0YzQ5MDQyNDJjNTU3NzNmOTQ5ZDczZWU5NmJhMGRlIn0.Vll51zi6l38S0JDxx5JL6A31bEV4KBjdaqPDYMVkgTI')
            .set('accept', 'json')
            .then((response) => {
                expect(response.statusCode).toBe(200);
                done();
            })
            .catch(err => {
                console.log(err);
            })
    });
});


describe('Testing updateUserData', () => {

    test('Testing PUT method', async (done) => {
         
        await runImports([
            'users'
        ], "JestDb/Imports/", Config[process.env.CONFIG].db);
        
        let body = {
            _id: '5a14704bc18d59472d3f6887',
            firstName: 'Eddie',
            lastName: 'Butler',
            email: 'eddieb@ethamatics.com',
            permissions: {                
                companies: {
                    remove: {},
                    add: {},
                    update: {},
                    view: {}
                },
                users: {
                    create: {},
                    read: {},
                    update: {},
                    'delete': {}
                }
            }
        }

        UsersApi.updateUserData.request({ id: '5a14704bc18d59472d3f6887' })
            .send(body)
            .set('cookie', 'UserToken=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI1YTE0NzA0YmMxOGQ1OTQ3MmQzZjY4ODciLCJpYXQiOjE1MTgwMTIwNjcsIkZvcmdlcnlUb2tlbiI6IjY0YzQ5MDQyNDJjNTU3NzNmOTQ5ZDczZWU5NmJhMGRlIn0.Vll51zi6l38S0JDxx5JL6A31bEV4KBjdaqPDYMVkgTI')
            .set('accept', 'json')
            .then((response) => {
                expect(response.statusCode).toBe(200);
                done();
            })
            .catch(err => {
                console.log(err);
            })
    });
});


describe('Testing successful login', () => {
    
    test('Testing successful login method', async (done) => {

        await runImports([
            'users'
        ], "JestDb/Imports/", Config[process.env.CONFIG].db);

        let body = {
            email: 'ebutler@ethamatics.com',
            password: 'test'
        }

        UsersApi.login.request()
            .send(body)
            .set('accept', 'json')
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toEqual(true);
                done();
            })
            .catch(err => {
                console.log(err);
            })
    });
});

describe('Testing bad login', () => {
    
    test('Testing bad login method', async (done) => {

        await runImports([
            'users'
        ], "JestDb/Imports/", Config[process.env.CONFIG].db);

        let body = {
            password: 'wrong',
            email:    'mgreen@microsoft.com'
        }

        UsersApi.login.request()
            .send(body)
            .set('accept', 'json')
            .then((response) => {
                console.log('response.statusCode', response.statusCode) 
                expect(response.statusCode).toBe(401);
                expect(response.body).toEqual(false);
                done();
            })
            .catch(err => {
                console.log(err);
            })
    });
});
