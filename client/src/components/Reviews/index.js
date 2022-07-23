import React, { useState, Component } from 'react';
import {Router, Switch, Route} from "react-router-dom";
import { createTheme, ThemeProvider, styled, makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button'
import history from '../Navigation/history';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import PropTypes from 'prop-types';
//Dev mode
//const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3062"; //enable for dev mode
const serverURL = ""; //enable for local development
//Deployment mode instructions
//const serverURL = "http://ov-research-4.uwaterloo.ca:PORT"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number: 
//ssh to ov-research-4.uwaterloo.ca and run the following command: 
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";

/*const fetch = require("node-fetch");

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: 1,
      mode: 0
    }
  };*/

  // componentDidMount() {
  //   //this.loadUserSettings();
  // }


  // loadUserSettings() {
  //   this.callApiLoadUserSettings()
  //     .then(res => {
  //       //console.log("loadUserSettings returned: ", res)
  //       var parsed = JSON.parse(res.express);
  //       console.log("loadUserSettings parsed: ", parsed[0].mode)
  //       this.setState({ mode: parsed[0].mode });
  //     });
  // }

  // componentDidMount() {
  //   this.loadGetMovies();
  // }

  // loadGetMovies() {
  //   this.callApiGetMovie()
  //   .then(res => {
  //     //console.log("loadUserSettings returned: ", res)
  //     var parsed = JSON.parse(res.express);
  //     console.log("loadGetMovies parsed: ", parsed[0].mode)
  //     this.setMovieList(parsed);
  //   });
  // }
  
  // callApiAddReview = async () => {
  //   const url = serverURL + "/api/addReview";
  //   console.log(url);

  //   // add some stuff to response varaible
  //   const response = await fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",

  //     },
  //     body: JSON.stringify({
  //       // something here
  //       movies_id: selectedMovie,
  //       reviewTitle: enteredTitle,
  //       reviewContent: enteredReview,
  //       reviewScore: selectedRating,
  //       user_userID: userID
  //     })
  //   });

  //   const body = await response.json();
  //   if(response.status !== 200) throw Error(body.message);
  //   console.log("Movies: ", body);
  //   return body;
    
  // }

  // callApiGetMovie = async () => {
  //   const url = serverURL + "/api/getMovie";
  //   console.log(url);

  //   const response = await fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",

  //     }
  //   });
  //   const body = await response.json();
  //   if(response.status !== 200) throw Error(body.message);
  //   console.log("Movies: ", body);
  //   return body;
  // }

  // callApiLoadUserSettings = async () => {
  //   const url = serverURL + "/api/loadUserSettings";

  //   const response = await fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       //authorization: `Bearer ${this.state.token}`
  //     },
  //     body: JSON.stringify({
  //       userID: this.state.userID
  //     })
  //   });
  //   const body = await response.json();
  //   if (response.status !== 200) throw Error(body.message);
  //   console.log("User settings: ", body);
  //   return body;
  // }

  /*render() {
    const { classes } = this.props;

    return (
      <Review></Review>
    );
  }*/
//}
/*
Home.propTypes = {
  classes: PropTypes.object.isRequired
};*/

const lightTheme = createTheme({
  palette: {
    type: 'light',
    background: {
      default: "#ffffff"
    },
    primary: {
      main: '#ef9a9a',
      light: '#ffcccb',
      dark: '#ba6b6c',
      background: '#eeeeee'
    },
    secondary: {
      main: "#b71c1c",
      light: '#f05545',
      dark: '#7f0000'
    },
  },
});

const MainGridContainer = styled(Grid)(({ theme }) => ({
  margin: theme.spacing(4),
}))

const Review = () => {

  const [selectedMovie, setSelectedMovie] = React.useState('');
  const [enteredTitle, setEnteredTitle] = React.useState('');
  const [enteredReview, setEnteredReview] = React.useState('');
  const [selectedRating, setSelectedRating] = React.useState('');
  const [movieValidation, setMovieValidation] = React.useState('');
  const [titleValidation, setTitleValidation] = React.useState('');
  const [reviewValidation, setReviewValidation] = React.useState('');
  const [ratingValidation, setRatingValidation] = React.useState('');
  const [submissionValidation, setSubmissionValidation] = React.useState('');
  const [userState, setUserState] = React.useState(false);
  //movieList is empty
  const [movieList, setMovieList] = React.useState([]);
  const [movieID, setMovieID] = React.useState();
  const [userID, setUserID] = React.useState(1);
  
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

  //Call handleAddReview after you submit and validation
  const handleAddReview = () => {
    callApiAddReview()
    .then(res => {
      console.log("loadUserSettings returned: ", res);
      var parsed = JSON.parse(res.express);
      console.log("loadGetMovies parsed: ", parsed);
    })
  }


  // const handleMovieID = (movieList, selectedMovie) => {
  //   movieList.map((movieID) => {
  //     if (movieID.name === selectedMovie){
  //         return setMovieID(movieID.id);
  //     }})}
  


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
    if(response.status !== 200) throw Error(body.message);
    console.log("Movies: ", body);
    return body;
  }

  //Calls addReview API
  const callApiAddReview = async () => {
    const url = serverURL + "/api/addReview";
    console.log(url);

    // add some stuff to response varaible
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify({
        movies_id: movieID,
        reviewTitle: enteredTitle,
        reviewContent: enteredReview,
        reviewScore: selectedRating,
        user_userID: userID

        // reviewTitle: enteredTitle,
        // reviewContent: enteredReview,
        // reviewScore: selectedRating,
        // user_userID: userID,
        // movies_id: 1
      })
    });

    const body = await response.json();
    if(response.status !== 200) throw Error(body.message);
    console.log("Movies: ", body);
    return body;
    
  }


 /* callApiLoadUserSettings = async () => {
    const url = serverURL + "/api/loadUserSettings";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        userID: this.state.userID
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("User settings: ", body);
    return body;
  }*/

  //Input handlers
  //Issue: Handlers MIGHT not be updating to changes to initial field inputs, use console.log to see if event values are changing properly
  const handleSelectedMovie = (event) => {
    setSelectedMovie(event.target.value);
    console.log(event.target.value);
    //Compares selected movie to movie map and returns the movie id
    movieList.map((movieID) => {
      if (movieID.name === event.target.value){
        return setMovieID(movieID.id);
      }
    })
  };

  const handleEnteredTitle = (event) => {
    setEnteredTitle(event.target.value);
    console.log(event.target.value);

  };

  const handleEnteredReview = (event) => {
    setEnteredReview(event.target.value);
    console.log(event.target.value);

  };

  const handleSelectedRating = (event) => {
    setSelectedRating(event.target.value);
    console.log(event.target.value);

  };

  //Input Validation
  function validateInputs() {
    if (selectedMovie === "") {
      setMovieValidation("Please select a movie")
    } else {
      setMovieValidation("");
      
    }
    if (enteredTitle === "") {
      setTitleValidation("Please enter your review title")
    } else {
      setTitleValidation("")

    }

    if (enteredReview === "") {
      setReviewValidation("Please enter your review")
    } else {
      setReviewValidation("")

    }
    if (selectedRating === "") {
      setRatingValidation("Please select the rating")
    } else {
      setRatingValidation("")

    }

    //Call handleAddReview if validation is cleared (send data to Users table)
    //Issue: userReview doesn't update when another submission is inputted, use console.log(userReview) maybe?
    if (enteredTitle && enteredReview && selectedRating && selectedMovie) {
      setSubmissionValidation("Your review has been recieved")
      const d =
        {
          movie: selectedMovie,
          title: enteredTitle,
          review: enteredReview,
          rating: selectedRating
        }
      userReview.push(d)
      handleAddReview();
      // handleMovieID(movieList, selectedMovie);
      // console.log(handleMovieID(movieList, selectedMovie));
      // console.log(movieID);
    }

  }


  return (
    <div>
      <AppBar position="static">
            <Toolbar>
                <Button color= "inherit" onClick={() => history.push('/MyPage')}>
                    MyPage
                </Button>
                <Button color= "inherit" onClick={() => history.push('/Reviews')}>
                    Reviews
                </Button>
                <Button color= "inherit" onClick={() => history.push('/')}>
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
          Review a Movie
        </Typography>

        <p>
          {movieValidation}
        </p>
        <MovieSelection 
        onSearch={handleSelectedMovie} 
        movieList = {movieList} 
        movieName = {selectedMovie}
        />
        

        <p>
          {titleValidation}
        </p>

        <ReviewTitle onSearch={handleEnteredTitle} />

        <p>
          {reviewValidation}
        </p>

        <ReviewBody onSearch={handleEnteredReview} />

        <p>
          {ratingValidation}

        </p>
        <ReviewRating onSearch={handleSelectedRating} />

        <p>
          {submissionValidation}
        </p>

        <Button
          variant="contained"
          color="primary"
          onClick={validateInputs}
        >
          Submit
        </Button>

       
        <Reviews />

      </MainGridContainer>
    </div>

  );
}

const userReview = []

//Outputs user review to site 
//Issue: Doesn't update when another review is submitted, use console.log(userReview) to check if the reviews are updating
const Reviews = () => {
  return (
    <ul>
      {userReview.map(function (item) {
        return (
          <li>
          <p> {"Movie: " + item.movie}</p>
          <p> {"Review Title: " + item.title}</p>
          <p>{"Review: " + item.review}</p>
          <p>{"Rating: " + item.rating}</p>
        </li>)
      })}
    </ul>

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
          value =  {props.movieName}
          onChange={props.onSearch}
        >
          
          <MenuItem value = ""> </MenuItem>

          {props.movieList.map((movie) => {
            return ( <MenuItem value = {movie.name}> {movie.name} </MenuItem> )
          })}; 

        </Select>
      </FormControl>
    </div>
  )
}

//Review Title
const ReviewTitle = (props) => {
  return (
    <div>
      <form>
        <TextField
          id="review-title"
          label="Review Title"
          variant="outlined"
          fullWidth
          onChange={props.onSearch}
        />

      </form>
    </div>
  )
}

//Review Body
const ReviewBody = (props) => {
  return (
    <div>
      <TextField
        id="standard-multiline-flexible"
        label="Enter Review"
        multiline
        variant="outlined"
        maxRows={4}
        fullWidth
        onChange={props.onSearch}
      />

    </div>
  )
}

//Review Rating
const ReviewRating = (props) => {
  return (
    <div>
      <FormLabel id="movie-rating-radio-buttons">
        Movie Rating (1-Lowest, 5-Highest)
      </FormLabel>
      <RadioGroup
        name="Movie rating"
        aria-label="rating"
        row
        onChange={props.onSearch}
      >
        <FormControlLabel value="1" control={<Radio />} label="1" />
        <FormControlLabel value="2" control={<Radio />} label="2" />
        <FormControlLabel value="3" control={<Radio />} label="3" />
        <FormControlLabel value="4" control={<Radio />} label="4" />
        <FormControlLabel value="5" control={<Radio />} label="5" />

      </RadioGroup>
    </div>
  )
}

/*
const List = (props) => {
  return (
    <ul>
      {props.list.map((item) => {
        return (
          <Item item={item} />
        );
      })}
    </ul>

  )
}*/

// const Item = (props) => {
//   return (
//     <li>
//       <p> {"Movie: " + props.item.movie}</p>
//       {/* <p> {"Review Title: " + props.item.title}</p> */}
//       <p> {"Review Title: " + props.item.name}</p>
//       <p>{"Review: " + props.item.review}</p>
//       <p>{"Rating: " + props.item.rating}</p>
//     </li>
//   )
// }

export default Review;