const verbwire = require("verbwire")(process.env.VERBWIRE_API_KEY);

async function getTransactionDetails(transactionId) {

    return verbwire.user.transactionDetails({transactionId: transactionId});
}



export default function handler(req, res) {
    const { transactionId } = JSON.parse(req.body);

    getTransactionDetails(transactionId).then(async function (response) {
        console.log("Response: ", response);
        console.log("Details: ", response['transaction_details']['details'][0]);
        if (!response.transaction_details && !response.transaction_details.details) {
            res.status(400)
                .json({
                    message: response
                })
        } else {
            res.status(200)
                .json({
                    message: JSON.stringify(response.transaction_details.details)
                })

        }

    }).catch((error) => {
        console.error(error);
    })

}