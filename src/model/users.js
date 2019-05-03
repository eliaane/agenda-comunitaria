const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb://cintia:teste123@ds219095.mlab.com:19095/crude-teste";


module.exports = class User {
    static find() {
        return MongoClient.connect(uri, { useNewUrlParser: true }).then((client) => {
            let db = client.db('crude-teste');
            return db.collection('user').find({}).toArray();
        });
    }
}