import React from 'react';
import history from '../Navigation/history';
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

const Search = () => {
    
    return (
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
        
    )
}

export default Search;