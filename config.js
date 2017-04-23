/**
 * api's config 
 */
const config = {
    "database": "mongodb://root:abc123@ds161580.mlab.com:61580/user_story",
    "port": process.env.PORT || 3001,
    "env": "dev",
    "secretKey": "YourSecretKey"
};

module.exports = config;