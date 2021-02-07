const express = require('express');
const Discord = require("discord.js");
const fs = require('fs');

const client = new Discord.Client();
const app = express();
const port = 3000

let today = new Date();
let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

client.on('ready', () => {
   console.log("Bot up!");
});

app.get("/", (req, res) => {
  res.send("200 (OK)");
});

app.post("/", (req, res) => {
var ID = req.header("ID");

const embed = new Discord.MessageEmbed()
.setTitle("Alert!")
.setDescription("Intruder detected!")
.addField("Alarm ID", ID)
.setColor("RED")

client.channels.cache.get(process.env.Alerts).send(embed).then(message => message.crosspost());

res.send("POST Sucessfull with ID " + ID);
});

app.listen(port, () => {
  console.log("API Listening on port " + port)
});

client.login(process.env.Token)