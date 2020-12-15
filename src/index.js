"use strict";
exports.__esModule = true;
var discord_js_1 = require("discord.js");
var mongoose_1 = require("mongoose");
var Harvey = /** @class */ (function () {
    //private readonly database: Mongoose;
    function Harvey() {
        this.client = new discord_js_1.Client();
        this.connectToDatabase();
    }
    Harvey.prototype.connectToDatabase = function () {
        mongoose_1["default"].connect('mongodb://localhost/harvey', { useNewUrlParser: true })
            .then(function () { return console.log('Database Connected.'); })["catch"](function (e) {
            console.error(e);
            process.exit(5);
        });
    };
    Harvey.prototype.listen = function () {
        return this.client.login('Nzg4MjI1MjM4NjMwMjY4OTU4.X9gZ9Q.FwazrCdhfxcAfkgc6dTKJ61PG68');
    };
    return Harvey;
}());
exports["default"] = Harvey;
