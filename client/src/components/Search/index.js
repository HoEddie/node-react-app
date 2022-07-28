import * as React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import history from '../Navigation/history';

const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3062";
//const serverURL = "";
const MainGridContainer = styled(Grid)(({ theme }) => ({
    margin: theme.spacing(4),
}))
const Search = () => {

    // Stateful Lists
    const [enteredMovie, setEnteredMovie] = React.useState('');
    const [enteredActor, setEnteredActor] = React.useState('');
    const [enteredDirector, setEnteredDirector] = React.useState('');
    const [movieList, setMovieList] = React.useState([]);

    // Call APIs

    const callApiMovieSearch = async () => {
        const url = serverURL + "/api/movieSearch";
        console.log(url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: enteredMovie,
                actor: enteredActor,
                director: enteredDirector
            })
        });

        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("Sent review: ", body);
        return body;
    };


    // Handlers

    const handleEnteredMovie = (event) => {
        setEnteredMovie(event.target.value);
    };

    const handleEnteredActor = (event) => {
        setEnteredActor(event.target.value);
    };

    const handleEnteredDirector = (event) => {
        setEnteredDirector(event.target.value);
    };

    const handleMovieSearch = () => {
        callApiMovieSearch()
            .then(res => {
                console.log("callApiMovieSearch returned: ", res);
                var parsed = JSON.parse(res.express);
                console.log("callApiMovieSearch parsed: ", parsed);
                setMovieList(parsed);
            });
    };




    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" onClick={() => history.push('/MyPage')}>
                        Find Cast
                    </Button>
                    <Button color="inherit" onClick={() => history.push('/Reviews')}>
                        Reviews
                    </Button>
                    <Button color="inherit" onClick={() => history.push('/')}>
                        Landing
                    </Button>

                </Toolbar>

            </AppBar>

            <MainGridContainer
                container
                spacing={1}
                style={{ maxWidth: '50%' }}
                direction="column"
                justify="flex-start"
                alignItems="stretch"
            >



                <Typography variant="h3" gutterBottom>
                    Search For A Movie
                </Typography>

                <p>
                    <MovieField
                        label="Search by Movie"
                        searchTerm={enteredMovie}
                        onChange={handleEnteredMovie}
                    />
                </p>
                <ActorField
                    label="Search by Actor"
                    searchTerm={enteredActor}
                    onChange={handleEnteredActor}
                />
                <p>
                    <DirectorField
                        label="Search by Director"
                        searchTerm={enteredDirector}
                        onChange={handleEnteredDirector}
                    />
                </p>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => { handleMovieSearch() }}
                >
                    Submit
                </Button>

                <ul>
                    {movieList.map(function (movie) {
                        let reviews = movie.reviews;
                        let list = [];
                        if (reviews !== null) {
                            list = reviews.split(",");
                        };

                        return (
                            <li>

                                <Typography
                                    variant="h6"
                                    component="div">
                                    Movie: {movie.name} <br></br>
                                    Director: {movie.director_name} <br></br>
                                    Average Score: {movie.avg_score}
                                </Typography>


                                {list.map(function (review) {
                                    let text = review.split(" - ");
                                    return (
                                        <li>
                                            <Typography
                                                variant="h8"
                                                component="div">
                                                {text[0]} <br></br>
                                                {text[1]}
                                            </Typography>
                                        </li>
                                    )
                                })}

                            </li>
                        )
                    })}
                </ul>
            </MainGridContainer>
        </div>
    )
};
const MovieField = (props) => {
    return (
        <div>
            <TextField
                id="search"
                label="Search Movie"
                value={props.searchTerm}
                onChange={props.onChange}
                variant="outlined"
                fullWidth
            ></TextField>
        </div>
    )
};

const ActorField = (props) => {
    return (
        <div>
            <TextField
                id="search"
                label="Search Actor"
                value={props.searchTerm}
                onChange={props.onChange}
                variant="outlined"
                fullWidth
            ></TextField>
        </div>
    )
};

const DirectorField = (props) => {
    return (
        <div>
            <TextField
                id="search"
                label="Search Director"
                value={props.searchTerm}
                onChange={props.onChange}
                variant="outlined"
                fullWidth
            ></TextField>
        </div>
    )
};

export default Search;