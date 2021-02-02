const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');

// DATABASE CONNEXION
mongoose.connect(`mongodb+srv://${process.env.DB_HOST}:${process.env.DB_PASSWORD}@cluster-whirriors.sw8z5.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
})
	.then(() => console.log('Connexion à MongoDB réussie !'))
	.catch((error) => console.log('Connexion à MongoDB échouée !' + error));

const { checkUser, requireAuth } = require('./middleware/auth.middleware');

const app = express();

// HEADERS
/*app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});*/
const corsOption = {
	origin: process.env.CLIENT_URL,
	credentials: true,
	'allowedHeaders': ['sessionId', 'Content-Type'],
	'exposedHeaders': ['sessionId'],
	'methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
	'preflightContinue': false
};
app.use(cors(corsOption));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// JWT
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
	res.status(200).send(res.locals.user._id);
});

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// ROUTES
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

module.exports = app;