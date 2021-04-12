const mongoose = require('mongoose');
const dbName = process.env.DB_NAME;
const dbPass = process.env.DB_PWD;

function connectMongo() {
	try {
		var mongouri = `mongodb://db:27017/${dbName}:${dbPass}`; //! FOR DOCKER

		mongoose.connect(
			mongouri,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			},
			(err) => {
				if (err) console.log(err);
				else console.log('Connected to MongoDB');
			}
		);
	} catch (e) {
		console.log(e);
	}
}
async function disconnectMongo() {
	try {
		await mongoose.connection.close();
		console.log('DB connection terminated');
	} catch (error) {
		console.log(e);
	}
}
module.exports = { connectMongo, disconnectMongo };
