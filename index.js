// Normal
// const app = require("express")();
// const port = 8080;

// With middleware.
const express = require("express");
const app = express();
const port = 8080;

app.use(express.json())

// App variable.
// app.listen(port_variable, desired_function () => code)
app.listen(
	port,
	() => console.log(`It's alive on http://localhost:${port}`)
)

// `node .` to run index.js

// Endpoint 1.
// app_variable.endpoint(link, function (request_data, response))
app.get("/shirts", (req, res) => {
	res.status(200).send({
		tshirt: "Shirt",
		size: "Large"
	})
});

app.post("/shirts/:id", (req, res) => {
	const id = req.params;
	const logo = req.body;

	if (!logo) {
		res.stats(418).send({message: `We need a logo!`})
	}

	res.send({
		tshirt: `Tshirt added`
	});
});