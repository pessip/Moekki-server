// Import libraries
const express = require("express");
const mqtt = require("mqtt");
const Datastore = require("nedb");

// Init Express
const Express = express();
const port = 3000;

// Connect to MQTT Broker
// Fancy shifter broker:
// var client = mqtt.connect("mqtt://6399d7ef:63f8bd575c152d5f@broker.shiftr.io", {
//   clientId: "Moekki-Server",
//   username: "6399d7ef",
//   password: "63f8bd575c152d5f",
// });
// Mosquitto for testing
const client = mqtt.connect("mqtt://test.mosquitto.org")

client.on("connect", () => {
  console.log("Connected to broker at: " + client.options.host);
  client.subscribe("/moekki");
});

// Init nedb
const db = new Datastore({
  filename: "./database.db",
  autoload: true
});

db.loadDatabase();

// Init variables
var laituri = {
  tempCurrent: undefined,
  tempHistory: undefined
}

// Get data from database
const getData = (sensorName) => {
  function isSensorName(item) {
    return item.sensor === sensorName;
  }
  allData = db.getAllData


  return {
    tempCurrent,
    tempHistory
  }
}


Express.get("/current", (req, res) => {
  if (!laituri.tempCurrent) {
    laituri.tempCurrent = getData('laituri').tempCurrent;
  }
  data = {
    laituri: laituri.tempCurrent
  };
  res.send(JSON.stringify(data));
});

Express.get("/history", (res, req) => {
  laituri.tempHistory = getData('laituri').tempHistory;
  data = {
    laituri: laituri.tempHistory
  };
  res.send(JSON.stringify(data));
})

Express.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

client.on("message", (topic, message) => {
  // message is Buffer
  console.log(message.toString());
  const data = JSON.parse(message.toString())
  if (topic = "moekki/laituri") {
    db.insert({
      sensor: 'laituri',
      time: data.time,
      temperature: data.temperature
    })
  }
});