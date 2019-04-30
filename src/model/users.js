var client = require('mongodb').MongoClient;

module.exports = class User {
    static find() {
        return client.connect('mongodb://127.0.0.1:27017/agenda-comunitaria', { useNewUrlParser: true }).then((client) => {
            let db = client.db('agenda-comunitaria');
            return db.collection('user').find({}).toArray();
        });
    }
}