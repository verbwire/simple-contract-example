const verbwire = require("verbwire")(process.env.VERBWIRE_API_KEY);
const fs = require('fs');



async function mintSimpleContractNFT(walletAddress) {

    let mintParams = {
        filePath: fs.createReadStream("./assets/VerbwireIconBlack.png"),
        name: "nftName",
        description: "yourDescription",
        // Define your metadata below or remove entirely for no metadata
        data: "[{\"trait_type\":\"TraitType1\",\"value\":\"TraitValue1\"},{\"trait_type\":\"TraitType2\",\"value\":\"TraitValue2\"}]",
        contractAddress: process.env.CONTRACT_ADDRESS,
        chain: process.env.CHAIN,

    }
    if (walletAddress) {
        mintParams.recipientAddress = walletAddress;
    }

    return verbwire.mint.mintFromFile(mintParams);
}



export default function handler(req, res) {
    const { walletAddress } = JSON.parse(req.body);

    //mintNFT(walletAddress).then(async function (response) {
    mintSimpleContractNFT(walletAddress).then(async function (response) {
        console.log("Response: ", response);

        if (!response.transaction_details || !response.transaction_details.transactionID) {
            console.log("Data: ", response.response.data);
            const error = response.response.data;
            res.status(400)
                .json({
                    error
                })
        } else {
            const transactionId = response.transaction_details.transactionID;
            const transactionHash = response.transaction_details.transactionHash;
            res.status(200)
                .json({
                    response
                })

        }
    }).catch((error) => {
        console.error(error);
    })

}