const express = require('express');
const app = express();
const db = require('./config/keys').mongoURI;

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const passport = require('passport');

const User = require('./models/User');
const Address = require('./models/Address');
const Business = require('./models/Business');
const Category = require('./models/Category');
const Equity = require('./models/Equity');
const File = require('./models/File');
const GumboComment = require('./models/GumboComment');
const GumboPost = require('./models/GumboPost');
const Keyword = require('./models/Keyword');
const PhoneType = require('./models/PhoneType');
const Project = require('./models/Project');
const ProjectComment = require('./models/ProjectComment');
const ProjectFaq = require('./models/ProjectFaq');
const ProjectType = require('./models/ProjectType');
const Tradeline = require('./models/Tradeline');
const Transaction = require('./models/Transaction');

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
app.listen(port, () => {
	console.log(
		`Server is running GraphQL on http://localhost:${port}/graphql`
	);
});
