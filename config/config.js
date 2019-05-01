require('dotenv').config();
var config = require("./config.json");
class Config {

    //APP SETTINGS
    static get get_app_name() {
        return config.app_name;
    }

    static get get_app_port() {
        return config.port;
    }

    static get get_app_version() {
        return config.app_version;
    }
    static get get_api_version() {
        return config.api_version;
    }

    //RABBIT SETTINGS
    static get get_rabbit_host() {
        return process.env.RABBIT_HOST;
    }

    static get get_rabbit_port() {
        return process.env.RABBIT_PORT;
    }

    static get get_rabbit_user() {
        return process.env.RABBIT_USER;
    }

    static get get_rabbit_pass() {
        return process.env.RABBIT_PASS;
    }


}

module.exports = Config;