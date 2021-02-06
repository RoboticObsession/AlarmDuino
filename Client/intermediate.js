const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
var fetch = require("node-fetch");

const config = require("./config.json");
const port = new SerialPort("/dev/cu.usbserial-0001", { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));

console.log("Your alarm ID is: " + config.alarmid);

fetch(config.api)
    .then(res => res.text())
    .then(body => console.log("Server status " + body));

port.on("open", () => {
  console.log("Listening to Arduino!");
});

parser.on('data', data =>{
  fetch(config.api, { method: "POST", headers: { ID: config.alarmid } });
});
