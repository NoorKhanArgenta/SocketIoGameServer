const Express = require("express");
const app = Express();
const Http = require("http").Server(app);
const Socketio = require("socket.io")(Http);

app.use(Express.json());

var position = {
    x:200,
    y:200
};

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course1' },
    { id: 3, name: 'course1' }
];

Socketio.on("connection", socket => {
    socket.emit("position", position);
    socket.on("move", data => {
        switch(data) {
            case "left":
                position.x = position.x-5;
                Socketio.emit("position", position);
                break;
            case "right":
                position.x = position.x+5;
                Socketio.emit("position", position);
                break;
            case "up":
                position.y = position.y-5;
                Socketio.emit("position", position);
                break;
            case "down":
                position.y = position.y+5;
                Socketio.emit("position", position);
                break;
        }
    });
});

app.post('/api/course/:x/:y', (req,res) => {
    position.x = position.x - parseInt(req.params.x)
    position.y = position.y - parseInt(req.params.y)
    Socketio.emit("position", position);
    res.send("success")
});

Http.listen(3000, () => {
    console.log("listening at :3000...");
});