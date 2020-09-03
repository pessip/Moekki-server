// Import libraries
import * as Express from "express";
import * as mqtt from "mqtt";
import { Sequelize, Model, DataTypes } from "sequelize";

// Get config
const config = require("./config.json");

// Init Express
const express = Express();
const port = 3000;

// Init sequelize
const sequelize = new Sequelize(
  `postgres://${config.postgres.user}:${config.postgres.password}@${config.postgres.host}`,
);

try {
  await sequelize.authenticate();
  console.log('Connection to database established!');
} catch (err) {
  console.error('Unable to connect to database', err);
}

// Connect to MQTT Broker
// Fancy shiftr broker:
// var client = mqtt.connect("mqtt://6399d7ef:63f8bd575c152d5f@broker.shiftr.io", {
//   clientId: "Moekki-Server",
//   username: "6399d7ef",
//   password: "63f8bd575c152d5f",
// });
// Mosquitto for testing
const client = mqtt.connect(config.MQTT.host);

client.on("connect", () => {
  console.log("Connected to broker at: " + client.options.host);
  client.subscribe("/moekki");
});

// Init sequelize models
// Sensor
class Sensor extends Model { }

Sensor.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'Sensor'
});
console.log(Sensor === sequelize.models.User);



// Init variables
var laituri = {
  tempCurrent: undefined,
  tempHistory: undefined,
};

// Get data from database
const getData = (sensorName) => {
};

express.get("/:sensor/current", (req, res) => {
  // Return current temperature
});

express.get("/:sensor/history", (res, req) => {
  // Get data history
});

express.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

client.on("message", (topic, message) => {
  console.log(message.toString());
  // Save message to database
});
