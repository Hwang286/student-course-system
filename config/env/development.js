//Development configuration options
//To sign the session identifier, use a secret string
module.exports = {
    db: 'mongodb://localhost/course-db',

    sessionSecret: 'developmentSession-nSecret',
    secretKey: 'real_secret'
};
