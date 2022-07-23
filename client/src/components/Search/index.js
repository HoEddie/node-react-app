import React from 'react';
import history from '../Navigation/history';
import Grid from '@material-ui/core/Grid';
import { createTheme, ThemeProvider, styled, makeStyles, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/icons/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

const serverURL = "";
const MainGridContainer = styled(Grid)(({ theme }) => ({
    margin: theme.spacing(4),
}))







const Search = () => {

    const [selectedMovie, setSelectedMovie] = React.useState('');
    const [enteredActor, setEnteredActor] = React.useState('');
    const [enteredDirector, setEnteredDirector] = React.useState('');
    const [movieList, setMovieList] = React.useState([]);
    const [movieID, setMovieID] = React.useState();

    React.useEffect(() => {
        loadGetMovies();
    }, []);

    //Loads apis
    const loadGetMovies = () => {
        callApiGetMovies()
            .then(res => {
                console.log("loadUserSettings returned: ", res);
                var parsed = JSON.parse(res.express);
                console.log("loadGetMovies parsed: ", parsed);
                setMovieList(parsed);
                console.log(movieList);
            })
    }

    //Calls getMovie API
    const callApiGetMovies = async () => {
        const url = serverURL + "/api/getMovies";
        console.log(url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            }
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("Movies: ", body);
        return body;
    }

    const handleSelectedMovie = (event) => {
        setSelectedMovie(event.target.value);
        console.log(event.target.value);
        //Compares selected movie to movie map and returns the movie id
        movieList.map((movieID) => {
            if (movieID.name === event.target.value) {
                return setMovieID(movieID.id);
            }
        })
    };

    const handleEnteredActor = (event) => {
        setEnteredActor(event.target.value);
        console.log(event.target.value);

    };

    const handleEnteredDirector = (event) => {
        setEnteredDirector(event.target.value);
        console.log(event.target.value);

    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" onClick={() => history.push('/MyPage')}>
                        MyPage
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

                </p>
                <MovieSelection
                    onSearch={handleSelectedMovie}
                    movieList={movieList}
                    movieName={selectedMovie}
                />
                <p>

                </p>

                <Actor onSearch={handleEnteredActor} />
                <p>

                </p>
                <Director onSearch={handleEnteredDirector} />
                <p>

                </p>
                <Button
                    variant="contained"
                    color="primary"
                    
                >
                    Search
                </Button>
            </MainGridContainer>
        </div>

    )
}

//Movie Select Element; dropdown includes all movies from movies table
const MovieSelection = (props) => {
    return (
        <div>
            <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Select a Movie
                </InputLabel>
                <Select
                    yarn
                    labelId="movie-select"
                    id="movie-select"
                    label="Select Movie"
                    value={props.movieName}
                    onChange={props.onSearch}
                >

                    <MenuItem value=""> </MenuItem>

                    {props.movieList.map((movie) => {
                        return (<MenuItem value={movie.name}> {movie.name} </MenuItem>)
                    })};

                </Select>
            </FormControl>
        </div>
    )
}

const Actor = (props) => {
    return (
        <div>
            <form>
                <TextField
                    id="Actor-Name"
                    label="Actor Name"
                    variant="outlined"
                    fullWidth
                    onChange={props.onSearch}
                />

            </form>
        </div>
    )
}

const Director = (props) => {
    return (
        <div>
            <form>
                <TextField
                    id="Director-Name"
                    label="Review Name"
                    variant="outlined"
                    fullWidth
                    onChange={props.onSearch}
                />

            </form>
        </div>
    )
}
export default Search;