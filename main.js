#!/usr/bin/node

const Discord = require('discord.js');
const Command = require('./commands.js');
const fs = require('fs');

const client = new Discord.Client();
const commands = new Command.Commands();
let rawdata = fs.readFileSync('data.json');
let data = JSON.parse(rawdata);

client.on('ready', () => {
    console.log(`Connected as ${client.user.tag}`);
});

client.on('message', msg => {
    if (msg.author.id === client.user.id)
        return;
    var content = msg.content.split(' ');
    for (var item of commands.cmd) {
        if (content[0] === `${data.flag}${Object.keys(item)}`) {
            Object.values(item)[0](msg, client);
            break;
        }
    }
});

client.login(`${data.token}`);