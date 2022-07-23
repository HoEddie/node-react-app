import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import { Icon } from '@material-ui/core';

const Landing = () => {
    
    return (
        <AppBar position="static">
            <Toolbar>
                <Button color= "inherit" onClick={() => history.push('/Search')}>
                    Search
                </Button>
                <Button color= "inherit" onClick={() => history.push('/Reviews')}>
                    Reviews
                </Button>
                <Button color= "inherit" onClick={() => history.push('/MyPage')}>
                    MyPage
                </Button>
                
            </Toolbar>

        </AppBar>
        //MUI Example
        //    <AppBar position="static">
        //         <Container maxWidth="x1">
        //             <Toolbar disableGutters>
        //                 <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>

        //                     {/* <IconButton
        //                         size="large"
        //                         aria-label="account of current user"
        //                         aria-controls="menu-appbar"
        //                         aria-haspopup="true"
        //                         onClick={handleOpenNavMenu}
        //                         color="inherit"
        //                     >
        //                         <MenuIcon />
        //                     </IconButton> */}

        //                     <Menu
        //                         id="menu-appbar"
        //                         anchorEl={anchorElNav}
        //                         anchorOrigin={{
        //                             vertical: 'bottom',
        //                             horizontal: 'left',
        //                         }}
        //                         keepMounted
        //                         transformOrigin={{
        //                             vertical: 'top',
        //                             horizontal: 'left',
        //                         }}
        //                         open={Boolean(anchorElNav)}
        //                         onClose={handleCloseNavMenu}
        //                         sx={{
        //                             display: { xs: 'block', md: 'none' },
        //                         }}
        //                     >
        //                         {pages.map((page) => (
        //                             <MenuItem key={page} onClick={handleCloseNavMenu}>
        //                                 <Typography textAlign="center">{page}</Typography>
        //                             </MenuItem>
        //                         ))}
        //                     </Menu>

        //                 </Box>

        //                 <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        //                     {pages.map((page) => (
        //                         <Button
        //                             key={page}
        //                             onClick={handleCloseNavMenu}
        //                             sx={{ my: 2, color: 'white', display: 'block' }}
        //                         >
        //                             {page}
        //                         </Button>
        //                     ))}
        //                 </Box>
        //             </Toolbar>
        //         </Container>
        //     </AppBar>

        //Lect 10-2 example
        /*<div>
            <Typography variant = "h3" color = "inherit" noWrap>
                This is Landing Page
            </Typography>
            <Link
                color = "inherit"
                style = {{cursor: "pointer"}}
                onClick={() => history.push('/Reviews')}
            >
                <Typography variant = "h5" color = "inherit" noWrap>
                    Navigate to Reviews Page
                </Typography>
            </Link>

            <Link
                color = "inherit"
                style = {{cursor: "pointer"}}
                onClick={() => history.push('/Search')}

            >
                <Typography variant = "h5" color = "inherit" noWrap>
                    Navigate to Search Page
                </Typography>
            </Link>

            <Link
                color = "inherit"
                style = {{cursor: "pointer"}}
                onClick={() => history.push('/MyPage')}

            >
                <Typography variant = "h5" color = "inherit" noWrap>
                    Navigate to MyPage
                </Typography>
            </Link>
        </div>*/
    )
}

export default Landing;