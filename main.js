#!/usr/bin/node

const Discord = require('discord.js');
const Command = require('./commands.js');
const fs = require('fs');

const client = new Discord.Client();
const commands = new Command.Commands();
const data = JSON.parse(fs.readFileSync('data.json'));

client.on('ready', () => {
    console.log(`Connected as ${client.user.tag}`);
});

client.on('message', msg => {
    if (msg.author.bot || !(msg.content.startsWith(data.prefix)))
        return;
    var content = msg.content.split(' ');
    for (var item of commands.cmd) {
        if (content[0] === `${data.prefix}${Object.keys(item)}`) {
            Object.values(item)[0](msg, client);
            break;
        }
    }
});

client.login(`${data.token}`);