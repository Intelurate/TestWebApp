import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongojs from 'mongoist'; //https://www.npmjs.com/package/mongoist
import db from '../modules/database';
import { Get, Post, Put, Delete } from '../modules/express-decorator';

class EventsApi {
    @Get("/api/event/getEvents")
    async getEvents(req, res) {
        try
        {
            let events = await db.eventRequests.find({ status: 'approved' });
            res.send(events);
        }
        catch (e)
        {
            res.status(400).send({ 'error': 'An error has occurred' });
        }
    }
    
    @Get("/api/event/getEventDetails/:id")
    async getEventDetails(req, res) {
        try
        {
            let eventDetail = await db.eventRequests.findOne({_id: mongojs.ObjectId(req.params.id)});
            res.send(eventDetail);
        }
        catch (e)
        {
            res.status(400).send({ 'error': 'An error has occurred' });
        }
    }

    @Post("/api/event/sendJoinEventRequest")
    async sendJoinEventRequest(req, res) {
        try
        {
            let jeReq = await db.eventRequests.update(
                { _id: mongojs.ObjectId(req.body.eventId) },
                { $addToSet: {attendees: req.body} }
            );
            let isUpdated = jeReq.n > 0 ? true : false
            res.send(isUpdated);
        }
        catch (e)
        {
            res.status(400).send({ 'error': 'An error has occurred adding the Join Event Request' });
        }
    }

    @Post("/api/event/addEventRequest")
    async addEventRequest(req, res) {
        try
        {
            let result = await db.collection('eventRequests').insert(req.body);
            res.send(result);
        }
        catch (e)
        {
            console.log('Error addEventRequest ', e)
            res.status(400).send({ 'error': 'An error has occurred adding an Event request' });
        }
    }    

    @Get("/api/event/loadEventRequest")
    async loadEventRequest(req,res) {
        try {
            let results = await db.eventRequests.find({ status: "approved" })
            res.send(results);
        } catch (err) {
            res.status(400).send({ 'error': 'An error has occurred' })
        }
    }

}

export { EventsApi }