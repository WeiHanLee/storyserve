/**
 * api's config 
 */
const config = {
    //"database": "mongodb://root:abc123@ds161580.mlab.com:61580/user_story",
    "database": "mongodb://root:abc123@127.0.0.1:27017/user_story",
    "port": process.env.PORT || 3001,
    "env": "dev",
    "secretKey": "YourSecretKey"
};

module.exports = config;