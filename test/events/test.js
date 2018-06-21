import { EventsApi } from '../../server/app';
import Immutable from 'immutable';
import eventReducer from '../../reactApp/reducers/eventReducer';
import EventActions from '../../reactApp/actions/eventActions';
import runImports from "../../modules/rebuild-collections";
import { Config } from "../../server/modules/database/config";

describe('Testing getting Events', () => {
   
    test('It should response the GET method', async (done) => {
        
        await runImports([
            'users',
            'eventRequests'
        ], "JestDb/Imports/", Config[process.env.CONFIG].db);

        EventsApi.getEvents.request()
        .query()
        .set('cookie', 'UserToken=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI1YTE0NzA0YmMxOGQ1OTQ3MmQzZjY4ODciLCJpYXQiOjE1MTgwMTIwNjcsIkZvcmdlcnlUb2tlbiI6IjY0YzQ5MDQyNDJjNTU3NzNmOTQ5ZDczZWU5NmJhMGRlIn0.Vll51zi6l38S0JDxx5JL6A31bEV4KBjdaqPDYMVkgTI')
        .set('accept', 'json')
        .then((response) => {

            let state = Immutable.fromJS({
                "eventsList": []
            });

            let expected = Immutable.fromJS({
                "eventsList": [{
                    "_id" : "5b2b06d86e4da85078d96d1b",
                    "start" : "2018-06-21T01:57:26.527Z",
                    "directorate" : "test",
                    "classification" : "Classified",
                    "smallDescription" : "Teach mechanics how to adjust the timing on desmodromic engines ",
                    "fullDescription" : [
                        "Teach mechanics how to adjust the timing on desmodromic engines "
                    ],
                    "organization" : "Ducati Winchester",
                    "taskerNum" : 3,
                    "personOfContact" : "test@gmail.com",
                    "alternatePersonOfContactPhone" : "943-473-8765",
                    "title" : "Duacti Training",
                    "alternatePersonOfContact" : "test@gmail.com",
                    "personOfContactPhone" : "943-473-5237",
                    "end" : "2018-06-21T01:57:26.527Z",
                    "category" : "Category 4",
                    "secondBreakoutParticipants" : "9",
                    "purposeOfEvent" : "test",
                    "fourthBreakoutParticipants" : "10",
                    "numberOfBreakoutRooms" : "8",
                    "coffeeBreak" : "Coffee Break 1",
                    "mainRoomParticipants" : "7",
                    "roomPreference" : "none",
                    "thirdBreakoutParticipants" : "9",
                    "protocolSupportRequested" : "test",
                    "catering" : "No",
                    "firstBreakoutParticipants" : "11",
                    "screen" : false,
                    "podium" : true,
                    "projector" : true,
                    "microphone" : false,
                    "laptops" : false,
                    "printers" : true,
                    "additionalAudioRequirements" : "Test Requirements",
                    "pocEmail" : "test@gmail.com",
                    "altPocEmail" : "test@gmail.com",
                    "additionalRequirements" : "none",
                    "id" : "rk-JDFuWQ",
                    "status" : "approved"               
                }]
            });

            expect(response.statusCode).toBe(200);
            expect(eventReducer(state, EventActions.loadEvents(response.body))).toEqual(expected);
            done();
        })
        .catch(err => {
            console.log(err);
        })
    });
});

