/**
 * Created by ramor11 on 7/5/2016.
 */
let shell = require('shelljs');


let command = "\"./node_modules/.bin/electron\"",

//build the command script based on config files
    _c = [
        command
        , "."
        , "--version=\"1.2.5\""

    ].join(" ");

console.log(_c);
shell.exec(_c);