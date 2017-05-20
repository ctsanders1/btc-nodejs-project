var express = require("express");
var app = express();
var request = require("request");
var bodyparser = require("body-parser");
var bitcore = require("bitcore-lib");

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

app.set("view engine", "ejs");

function brainWallet(userInput, callback) {
    var input = new Buffer(userInput);
    var hash = bitcore.crypto.Hash.sha256(input);
    var bn = bitcore.crypto.BN.fromBuffer(hash);
    var pk = new bitcore.PrivateKey(bn).toWIF();
    var addr = new bitcore.PrivateKey(bn).toAddress();
    callback(pk, addr);
};
function getPrice(returnPrice) {
    request({
        url: "https://www.bitstamp.net/api/v2/ticker/btcusd/",
        json: true
    }, function (err, res, body) {
        returnPrice(body.last);
    });

    app.get("/", function (req, res) {
        getPrice(function (lastPrice) {
            res.render("index", {
                lastPrice: lastPrice
            });
        })
    });
};


app.get("/brain", function (req, res) {
    getPrice(function (lastPrice) {
        res.render("brain", {
            lastPrice: lastPrice
        });
    })
});

app.get("/converter", function (req, res) {
    getPrice(function (lastPrice) {
        res.render("converter", {
            lastPrice: lastPrice
        });
    })
});

app.post("/wallet", function (req, res) {
    var brainsrc = req.body.brainsrc;
    console.log(brainsrc);
    brainWallet(brainsrc, function (privKey, publAddr) {
        res.send("The Brain wallet of: " + brainsrc + "<br>Address: " +
            publAddr + "<br>Private Key: " + privKey);
    });
});


app.listen(80, function () {
    console.log("Server has started!")
})