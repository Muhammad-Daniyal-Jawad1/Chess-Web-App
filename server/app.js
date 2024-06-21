const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDB = require('./database/dbConnection');
const {Chess} = require('chess.js');

const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true
    }
  });




const cors = require("cors");
const apiRoutes = require('./routes')
const cookieParser = require('cookie-parser');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//Connecting to Database
connectDB();

// Routing
app.use("/api", apiRoutes);

let players = [];
let playerColors = {};

const game =  new Chess();

io.on('connection', (socket) => {
    console.log('A user connected');

    // Add player to the list
    players.push(socket.id);

    // Assign color to player
    if (players.length <= 2) {
        playerColors[socket.id] = players.length === 1 ? 'white' : 'black';
    }

    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected');
        players = players.filter(playerId => playerId !== socket.id);
        delete playerColors[socket.id];
    });

    // Emit event to prompt player selection
    if (players.length === 2) {
        const initialFEN = game.fen(); // Get initial FEN position
        io.emit('playersReady', { playerColors, initialFEN });
    }

    // Handle time format selection
    socket.on('timeFormatSelected', (timeFormat) => {
        io.emit('startGame', { timeFormat, playerColors });
    });

    // Handle player moves
    socket.on('move', (move) => {
        const isLegalMove = game.move(move);

        if (isLegalMove) {
            io.emit('move', { fen: game.fen(), move });
            
            // Check for game over condition
            if (game.game_over()) {
                io.emit('gameOver');
            }
        }
    });
});

//Only listen on port if the DB connection is successful
mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB");

    http.listen(4000, () => {
        console.log("server started listening on port 4000");
    });
})