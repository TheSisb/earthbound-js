
var Config = {};

Config.load = function (config) {
    this.config = config;
};

Config.getResource = function (id) {
    var data = this.config.resources[id];
    if (!data) {
        throw 'Invalid Resouce ID - ' + id;
    }
    data.id = id;
    return data;
};

Config.getConfig = function (key) {
    return this.config[key];
}

module.exports = Config;
