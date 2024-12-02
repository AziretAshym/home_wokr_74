import express from "express";
import messagesRouter from "./routers/messages";
import fileDb from "./fileDb";

const app = express();
const port = 8000;

app.use(express.json());

app.use('/messages', messagesRouter);

const run = async () => {
    try {
        await fileDb.init();
        app.listen(port, () => {
            console.log(`Server started on port http://localhost:${port}`);
        });
    } catch (e) {
        console.error(e);
    }
};

run().catch((e) => {
    console.error(e);
});
