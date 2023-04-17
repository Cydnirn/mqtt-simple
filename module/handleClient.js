const fs = require("fs");

function IntoClientList(arr, espId){
    const isExist = arr.find((id) => id === espId);
    if(!isExist){
        arr.push(espId);
    }
}

function InsertESP(client, arr = []){
    client.on("message", async(topic, message) => {
        if(topic == "esp/init"){
            const data = JSON.parse(message.toString());
            const id = data.espId;
            IntoClientList(arr, id);
        }
    });
} 

function InsertPersistESP(client, arr = []){
    client.on("message", async(topic, message) => {
        if(topic == "esp/init"){
            const data = JSON.parse(message.toString());
            const id = data.espId;
            IntoClientList(arr, id);
        }
    });
    arr = JSON.stringify(arr);
    fs.writeFileSync("client.json", arr, "utf-8");
}

module.exports = {
    InsertESP,
    InsertPersistESP
}