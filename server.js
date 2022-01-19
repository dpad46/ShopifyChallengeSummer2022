const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;
require('dotenv').config();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');

const port = 3000;

//---Connect to MongoDB---//
mongoClient.connect(process.env.MONGODB_STRING, (err, client) => {
    if (err) return console.error(err);
    console.log('connected to mongodb');

    const db = client.db('inventory');
    const itemCollection = db.collection('items');

    app.listen(port, () => {
        console.log(`listening on ${port}`);
    });

    //---Default Page Render---//
    app.get('/', (req, res) => {
        db.collection('items').find().toArray()
            .then(results => {
                res.render('index.ejs', { items: results });
            })
            .catch(error => console.error(error));
    });

    //---Create Item---//
    app.post('/create', (req, res) => {
        itemCollection.updateOne({ name: req.body.name }, { $setOnInsert: req.body }, { upsert: true })
            .then(results => {
                res.redirect('/');
            })
            .catch(error => console.error(error));
    });

    //---Delete Item---//
    app.post('/delete', (req, res) => {
        itemCollection.findOneAndDelete({ name: req.body.name })
            .then(results => {
                res.redirect('/');
            })
            .catch(error => console.error(error));
    });

    //---Edit Item---//
    app.post('/edit', (req, res) => {
        async function editIfNoConflict(target, newInfo) {
            let results = await itemCollection.findOne({ name: newInfo.name });
            if (results == null || target == newInfo.name) {
                await itemCollection.updateOne({ name: target }, { $set: newInfo });
            }
            res.redirect('/');
        }
        editIfNoConflict(req.body.target, req.body.newInfo)
            .catch(error => console.error(error));
    });

    //---Filter and Sort Items---//
    app.post('/sort', (req, res) => {
        let filter = {};
        let sort = {};
        if (req.body.filter.length > 0) {
            filter = { [req.body.filterType]: req.body.filter };
        }
        if (req.body.filter.sort != 'none') {
            sort = { [req.body.sort]: req.body.order };
        }
        itemCollection.find(filter).sort(sort).toArray()
            .then(results => {
                res.render('index.ejs', { items: results });
            })
            .catch(error => console.error(error));
    });
});