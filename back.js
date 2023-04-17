const app = require("express")();
const http = require("http");
const {client} = require("./mqclient");
const {InsertESP, InsertPersistESP} = require("./module/handleClient");

const server = http.createServer(app);
server.listen(5000, () => {
    console.log("Server running on Port 5000");
});

const clawRoutes = require("./controllers/claw");
const wheelRoutes = require("./controllers/wheel");
const ledRoutes = require("./controllers/led");

const ESPid = ledRoutes.ClientEsp;
InsertESP(client, ESPid);

app.use("/claw", clawRoutes);
app.use("/wheel", wheelRoutes);
app.use("/led", ledRoutes.router);

app.get("/persist", async(req, res) => {
    InsertPersistESP(client, ESPid);
    res.status(200).send("Success");
});