let mysql = require('mysql');
let config = require('./config.js');
const fetch = require('node-fetch');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { response } = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

/*const recipes = [
	{
		title: 'Fruit Salad',
		difficulty: '2',
		ingredients: ['apple', 'banana', 'blueberries', 'raisins', 'walnuts'],
		calories: "200",
		instructions: "Wash fresh fruit. Slice fruit into pieces. Mix all ingredients in a bowl.",
		recipeID: 1,
	}, {
		title: 'Avocado Wrap',
		difficulty: '3',
		ingredients: ['avocado', 'spinach', 'pine nuts', 'mayo', 'apple', 'tortilla bread'],
		calories: "400",
		instructions: "Wash all fruits and vegetables. Slice avocados and apples. Mix all ingredients and wrap them in a tortilla bread.",
		recipeID: 2
	},
];*/

/*
app.post('/api/getMovies', (req, res) => {
	let string = JSON.stringify(movies);
	console.log(string);
	res.send({express: string});
});
*/

//Recieves POST req and retrieve all records of movies from MySQL
app.post('/api/getMovies', (req, res) => {
	let connection = mysql.createConnection(config);
	
	let sql = 'SELECT * FROM movies';

	let data = [];
	console.log(sql);

	connection.query(sql, data, (error, results, fields) => {
		if (error){
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
		res.send({ express: string});
	});

	connection.end();
});

//Recieves user-created review and inserts data into db
app.post('/api/addReview', (req, res) => {
	let connection = mysql.createConnection(config);

	//let sql = 'INSERT INTO Review (reviewTitle, reviewContent, reviewScore, user_userID, movies_id) VALUES (?,?,?,?,?)';
	//let data = [req.body.reviewTitle,req.body.reviewContent,req.body.reviewScore,req.body.user_userID,req.body.movies_id];
	let sql = 'INSERT INTO Review (user_userID, movies_id, reviewTitle, reviewContent, reviewScore) VALUES (?,?,?,?,?)';
	let data = [req.body.user_userID,req.body.movies_id,req.body.reviewTitle,req.body.reviewContent,req.body.reviewScore];
	console.log(sql);
	connection.query(sql, data, (error, results, fields) => {
		if (error){
			return console.error(error.message);
		}

		let object = JSON.parse(results);
		res.send({ express: object});
	});

	connection.end();
})
/*
app.post('/api/loadRecipes', (req, res) => {
	let string = JSON.stringify(recipes);
	console.log(string);
	res.send({ express: string });
});*/

/*
app.post('/api/findRecipe', (req, res) => {
	let ingredientSearchTerm = req.body.searchTerm;
	console.log("ingredientSearchTerm: ", ingredientSearchTerm);

	const foundRecipesByIngredients = recipes.filter(function (recipe) {
		if (ingredientSearchTerm) {
			console.log('Filtered by: ', ingredientSearchTerm);
			return recipe.ingredients.includes(ingredientSearchTerm);
		} else {
			return recipe;
		}
	});
	let string = JSON.stringify(foundRecipesByIngredients);
	console.log(string);
	let obj = JSON.parse(string);
	res.send({ express: string });
});*/
/*
app.post('/api/loadUserSettings', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;
	console.log("UserID: ", userID);

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();

});*/


//for the dev version
//app.listen(port, () => console.log(`Listening on port ${port}`)); //for local testing
//app.listen(3000, '129.97.25.211'); //for the deployed version, specify the IP address of the server
app.listen(port, '172.31.31.77'); // for deployment 