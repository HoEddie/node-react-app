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
		console.log(results);
		
		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
		res.send({ express: string });
		//let object = JSON.parse(results);
		//res.send({ express: object});
	});

	connection.end();
})

app.post('/api/movieInfo' , (req,res) => {
	let connection = mysql.createConnection(config);
	let data = [];
	let sqlFiller = '';
	let movieName = '';
	let sql = 
	`SELECT DISTINCT 
	movies.name, 
	GROUP_CONCAT(DISTINCT CONCAT(actors.first_name, " ", actors.last_name)) AS actors_name
	FROM movies
	JOIN roles ON roles.movie_id = movies.id
	JOIN actors ON actors.id = roles.actor_id
	WHERE `;

	if (req.body.name !== '') {
		movieName = "name LIKE ?";
		data.push("%" + req.body.name + "%");
	}

	if (movieName !== ''){
		if (sqlFiller !== ''){
			sqlFiller += " AND ";
		};
		sqlFiller += movieName;
	};

	sql += sqlFiller + 'GROUP BY name ORDER BY name';
	connection.query(sql, data, (error, results) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);

		res.send({ express: string });
	});

	connection.end();
});

app.post('/api/movieSearch', (req, res) => {

	let connection = mysql.createConnection(config);

	let data = [];

	let sqlFiller = '';
	let nameSearch = '';
	let actorSearch = '';
	let directorSearch = '';

	let sql =
		`SELECT DISTINCT 
		movies.name, 
		GROUP_CONCAT(DISTINCT CONCAT(directors.first_name, " ", directors.last_name)) AS director_name,
		AVG(Review.reviewScore) AS avg_score,
		GROUP_CONCAT(DISTINCT CONCAT("Review: ", Review.reviewContent, " - Score: ", Review.reviewScore)) AS reviews
		FROM movies
		JOIN movies_directors ON movies_directors.movie_id = movies.id
		JOIN directors ON directors.id = movies_directors.director_id
        JOIN roles ON roles.movie_id = movies.id
        JOIN actors ON actors.id = roles.actor_id
		LEFT JOIN Review ON Review.movies_id = movies.id
		WHERE `;


	if (req.body.name !== '') {
		nameSearch = "name LIKE ?";
		data.push("%" + req.body.name + "%");
	}

	if (req.body.actor !== '') {
		actorSearch = 'CONCAT(actors.first_name, \" \", actors.last_name) LIKE ?';
		data.push("%" + req.body.actor + "%");
	}

	if (req.body.director !== '') {
		directorSearch = "CONCAT(directors.first_name, \" \", directors.last_name) LIKE ?";
		data.push("%" + req.body.director + "%");
	}

	let searchBar = [nameSearch, actorSearch, directorSearch];

	searchBar.map(function (filter) {
		if (filter !== '') {
			if (sqlFiller !== '') {
				sqlFiller += " AND ";
			};
			sqlFiller += filter;
		};
	});

	sql += sqlFiller + ` GROUP BY name ORDER BY name`;
	console.log(sql);

	connection.query(sql, data, (error, results) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);

		res.send({ express: string });
	});

	connection.end();
});

//for the dev version
//app.listen(port, () => console.log(`Listening on port ${port}`)); //for local testing
//app.listen(3000, '129.97.25.211'); //for the deployed version, specify the IP address of the server
app.listen(port, '172.31.31.77'); // for deployment 