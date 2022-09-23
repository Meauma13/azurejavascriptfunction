module.exports = async function (context, req) {
    try {
        context.log("JavaScript HTTP trigger function processed a request.");

        // Read incoming data
        const name = req.query.name || (req.body && req.body.name);
        const sport = req.query.sport || (req.body && req.body.sport);

        // fail if incoming data is required
        if (!name || !sport) {
            context.res = {
                status: 400,
            };
            return;
        }

        // Add or change code here
        const message = `${name} likes ${sport}`;

        // Construct response
        const responseJSON = {
            name: name,
            sport: sport,
            message: message,
            success: true,
        };

        // write to Cosmos DB
        context.bindings.outputDocument = JSON.stringify({
            // create a random ID
            id:
                new Date().toISOString() +
                Math.random().toString().substring(2, 10),
            // name: name
            message: responseJSON,
        });

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: responseJSON.success,
        };
    } catch (err) {
        context.res = {
            status: 500,
        };
    }
};

// code sample to test locally

// module.exports = async function (context, req) {
//     context.log('JavaScript HTTP trigger function processed a request.');

//     const name = (req.query.name || (req.body && req.body.name));
//     const responseMessage = name
//         ? "Hello, " + name + ". This HTTP triggered function executed successfully."
//         : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

//     context.res = {
//         // status: 200, /* Defaults to 200 */
//         body: responseMessage
//     };
// }
