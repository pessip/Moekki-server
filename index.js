const express = require('express');
const mqtt = require('mqtt');

const Express = new express;
var client = mqtt.connect('mqtt://try:try@broker.shiftr.io', {
    clientId: 'Node'
});

client.on('connect', () => {
    console.log('Connected to broker at: ' + client.options.host);
    client.subscribe('/moekki');
})

client.on('message', (topic, message) => {
    // message is Buffer
    console.log(message.toString())
})