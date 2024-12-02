import express = require('express');
import fileDb from "../fileDb";
import {MessageWithoutId} from "../types";

const messagesRouter = express.Router();

messagesRouter.get('/', async (req, res) => {
    const messages = await fileDb.getMessages();
    res.send(messages);
});

messagesRouter.post('/', async (req, res) => {
    const message: MessageWithoutId = {
        message: req.body.message,
        date: req.body.date
    };

    const savedMessage = await fileDb.addMessage(message);
    res.send(savedMessage);
});

messagesRouter.get('/:id', async (req, res) => {
    const messages = await fileDb.getMessages();
    const message = messages.find(message => message.id === req.params.id);
    res.send(message);
});

export default messagesRouter;