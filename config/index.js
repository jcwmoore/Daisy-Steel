/**
 * The default configuration object that is overridden by an environmental configuration object
 */
var config = module.exports = {
    /**
     * Environment name
     */
    env: 'development',
    /**
     * Database configuration
     */
    db: {
        name: 'daisy',
        username: null,
        password: null,
        options: { dialect: 'sqlite', storage: 'daisy.db3', logging: false }
    }
};
try{
    var env = require('./config.' + (process.env.NODE_ENV || 'development'));
    for(var key in env){
        config[key] = env[key];
    }
} catch (err) {}