const app = require("express")();
const http = require("http");
const mqtt = require("mqtt");

const server = http.createServer(app);
server.listen(5000, () => {
    console.log("Server running on Port 5000")
});

//MQTT CONNECT LIST
const client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", () => {
    console.log("Connected to broker");
    client.subscribe("esp/command", (err) => {
        try {
            console.log("Subscribed to commands");
        } catch (err) {
            console.log(err)
        }
    });
});

client.on("message", async (topic, message) => {
    if (topic === "esp/command"){
        let data = JSON.parse(message.toString());
        let espId = data.espId;

        console.log(`Received data from ESP with id ${espId}`);
        client.publish(`esp/${espId}/response`, 100);
    }
});