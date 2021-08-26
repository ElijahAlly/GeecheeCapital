const express = require('express');
const app = express();
const db = require('./config/keys').mongoURI;

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const passport = require('passport');

const User = require('./models/User');

const expressGraphQL = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema');

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('frontend/build'));
	app.get('/', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
	});
}

mongoose
	.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('Connected to MongoDB successfully'))
	.catch((err) => {
		console.log('not connected to MongoDB');
		console.log(err);
	});

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/graphql', expressGraphQL({ graphiql: true, schema }));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
