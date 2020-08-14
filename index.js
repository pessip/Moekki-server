const express = require('express');
const mqtt = require('mqtt');

const Express = new express;
const client = mqtt.connect('mqtt://test.mosquitto.org');

client.on('connect', () => {
    console.log('Connected to broker at: ' + client.options.host);
    client.subscribe('/moekki');
})

client.on('message', (topic, message) => {
    // message is Buffer
    console.log(message.toString())
})