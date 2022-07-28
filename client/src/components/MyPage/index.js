import React from 'react';
import history from '../Navigation/history';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar'

const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3062"; //enable for dev mode
//const serverURL = "";

const MainGridContainer = styled(Grid)(({ theme }) => ({
    margin: theme.spacing(4),
}))

const MyPage = () => {

    // Stateful Lists
    const [searchedMovie, setSearchedMovie] = React.useState('');
    const [movieList, setMovieList] = React.useState([]);

    // Handlers

    const handleSearchedMovie = (event) => {
        setSearchedMovie(event.target.value);
    };

    const handleMovieInfo = () => {
        CallApiMovieInfo()
            .then(res => {
                console.log("callApiMovieInfo returned: ", res);
                var parsed = JSON.parse(res.express);
                console.log("callApiMovieInfo parsed: ", parsed);
                setMovieList(parsed);
            });
    };



    // Call API

    const CallApiMovieInfo = async () => {
        const url = serverURL + "/api/movieInfo";
        console.log(url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: searchedMovie
            })
        });

        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("Sent review: ", body);
        return body;
    }


    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" onClick={() => history.push('/Search')}>
                        Search
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
                    Find Cast
                </Typography>

                <Typography variant="h6" gutterBottom>
                    Search for a movie and see the cast for the film
                </Typography>

                <p>
                    <MovieSearch
                        label="Find A Movie"
                        searchTerm={searchedMovie}
                        onChange={handleSearchedMovie}
                    />
                </p>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => { handleMovieInfo() }}
                >
                    Submit
                </Button>

                <ul>
                    {movieList.map(function (movie) {

                        return (
                            <li>

                                <Typography
                                    variant="h6"
                                    component="div">
                                    Movie: {movie.name} <br></br>
                                </Typography>

                                <Typography
                                    variant="h8"
                                    component="div">
                                    Cast: {movie.actors_name}
                                </Typography>

                            </li>
                        )
                    })}
                </ul>

            </MainGridContainer>

        </div>
    )
}

const MovieSearch = (props) => {
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
export default MyPage;