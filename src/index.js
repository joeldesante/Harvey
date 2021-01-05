"use strict";
exports.__esModule = true;
var discord_js_1 = require("discord.js");
//import mongoose from 'mongoose';
var Harvey = /** @class */ (function () {
    //private readonly database: Mongoose;
    function Harvey() {
        this.client = new discord_js_1.Client();
        //  this.connectToDatabase();
    }
    /*public connectToDatabase(): void {
    //    mongoose.connect('mongodb://localhost/harvey', { useNewUrlParser: true })
    //        .then(() => console.log('Database Connected.'))
    //        .catch(e => {
    //            console.error(e);
                process.exit(5);
            });
    }*/
    Harvey.prototype.listen = function () {
        return this.client.login(process.env.TOKEN);
    };
    return Harvey;
}());
exports["default"] = Harvey;
var bot = new Harvey();
bot.listen().then(function (r) {
    console.log('Listening');
});
