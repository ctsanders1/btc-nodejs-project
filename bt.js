var key = "71f49e19555ffe50a4df2cccce6a08e2cc8aa660";
var secret = "2d5a3e5455e6be4b89ced3e14ccbdcd995d62d8e";

blocktrail = require('blocktrail-sdk');
client = blocktrail.BlocktrailSDK({
    apiKey: key,
    apiSecret: secret,
    network: "BTC",
    testnet: false
});

// client.address('1NcXPMRaanz43b1kokpPuYDdk6GGDvxT2T',
//     function (err, address) {
//         console.log(address.balance);
//     });
// client.blockLatest(
//     function (err, block) {
//         console.log(block.hash);
//     });


//add password for wallet Wally to work
// client.createNewWallet("Wally", "-----------",
//     function (err, wallet, backupInfo) {
//         console.log(wallet);
//         console.log("-------------------");
//         console.log(backupInfo);
//     });

client.initWallet("Wally", "KugelMal99",
    function (err, wallet) {
        //console.log(wallet);
        wallet.getNewAddress(function (err, address) {
            console.log(address);
        });
    });