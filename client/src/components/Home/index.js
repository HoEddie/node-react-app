import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import React, { useState } from 'react';
import { createTheme, ThemeProvider, styled, makeStyles, withStyles, MuiThemeProvider } from '@material-ui/core/styles';
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

//Dev mode
const serverURL = ""; //enable for dev mode

//Deployment mode instructions
//const serverURL = "http://ov-research-4.uwaterloo.ca:PORT"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number: 
//ssh to ov-research-4.uwaterloo.ca and run the following command: 
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";

const fetch = require("node-fetch");

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: 1,
      mode: 0
    }
  };

  componentDidMount() {
    //this.loadUserSettings();
  }


  loadUserSettings() {
    this.callApiLoadUserSettings()
      .then(res => {
        //console.log("loadUserSettings returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("loadUserSettings parsed: ", parsed[0].mode)
        this.setState({ mode: parsed[0].mode });
      });
  }

  callApiLoadUserSettings = async () => {
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
  }

  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <Paper
            className={classes.paper}
          >
            {mainMessage}
          </Paper>

        </div>
      </MuiThemeProvider>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

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
  const [titleValidation, setTitleValidation] = React.useState('');
  const [reviewValidation, setReviewValidation] = React.useState('');
  const [ratingValidation, setRatingValidation] = React.useState('');
  const [submissionValidation, setSubmissionValidation] = React.useState('');
  const [userState, setUserState] = React.useState(false);
  

  const handleSelectedMovie = (event) => {
    setSelectedMovie(event.target.value);
  };

  const handleEnteredTitle = (event) => {
    setEnteredTitle(event.target.value);
  };

  const handleEnteredReview = (event) => {
    setEnteredReview(event.target.value);
  };

  const handleSelectedRating = (event) => {
    setSelectedRating(event.target.value);
  };

  function validateInputs() {

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
    if (enteredTitle && enteredReview && selectedRating) {
      setSubmissionValidation("Your review has been recieved")
      const d =
        {
          movie: selectedMovie,
          title: enteredTitle,
          review: enteredReview,
          rating: selectedRating
        }
      userReview.push(d)
      
    }

  }


  return (
    <div>
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

        <MovieSelection onSearch={handleSelectedMovie} />

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
const userReview = [
 
]

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


const MovieSelection = (props) => {
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Select a Movie
        </InputLabel>
        <Select

          labelId="movie-select"
          id="movie-select"
          label="Select Movie"
          onChange={props.onSearch}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Morbius"}>Morbius</MenuItem>
          <MenuItem value={"The Batman"}>The Batman</MenuItem>
          <MenuItem value={"The God Father"}>The God Father</MenuItem>
          <MenuItem value={"The Lego Movie"}>The Lego Movie</MenuItem>
          <MenuItem value={"Morbius 2"}>Morbius 2</MenuItem>

        </Select>
      </FormControl>
    </div>
  )
}

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





export default Review;

//export default withStyles(styles)(Home);
