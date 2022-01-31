import express from 'express';
import mongoose from 'mongoose';
import Cors from 'cors';
import bodyParser from 'body-parser';
import Campaigns from './campaignModel.js';

const MONGODB_URI =
	'mongodb://127.0.0.1:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';

const app = express();
const port = process.env.PORT || 9000;

// Middleware
app.use(bodyParser.json());
app.use(Cors());

// DB Config
mongoose
	.connect(MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('MongoDB Connected...'))
	.catch(err => console.log(err));

// API endpoints
app.get('/', (req, res) =>
	res.status(200).send('Hello from Social Awareness Server')
);

app.get('/campaigns', (req, res) => {
	Campaigns.find((err, data) => {
		if (err) res.status(500).send(err);
		else res.status(200).send(data);
	});
});

// Listener
app.listen(port, () => console.log(`Server listening on port: ${port}`));
