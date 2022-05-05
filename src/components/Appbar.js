import React,{useEffect, useState} from 'react';
import { NavLink,withRouter } from 'react-router-dom';
import { style } from '@mui/system';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import Logo from "../images/logo.png"
const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const Navbar = (props) => {
	const [authCheck,setAuthCheck]=useState("")
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const routeLinks = () =>{
		return(
      <div className='routeLinks'>
			<Button id='signUp'><NavLink to="/uyeol"><span>Üye Ol</span></NavLink></Button>
			<Button id='signIn'><NavLink to="/" exact><span>Giriş Yap</span></NavLink></Button >
			<Button id="post"><NavLink to="/isgonder"><span>İş Gönder</span></NavLink></Button >
			<Button id="admin"><NavLink to="/yonetici"><span>Yönetici Paneli</span></NavLink></Button >
			<Button id='logOut'><span onClick={logOut}>Çıkış Yap</span></Button>
      </div>
		)
	}
	const handleOpenNavMenu = (event) => {
	  setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
	  setAnchorElUser(event.currentTarget);
	};
  
	const handleCloseNavMenu = () => {
	  setAnchorElNav(null);
	};
  
	const handleCloseUserMenu = () => {
	  setAnchorElUser(null);
	};
  const messageArea = () =>{
    return (

        <MailIcon style={{color:"white"}} />
   
    );
  }
const loginChecker = () =>{
	
    let getData=window.localStorage.getItem('isLoggedIn');
	
	if(getData==='true' && authCheck==='user'){
	return(

    <div >
    <Button id="post"><NavLink to="/isgonder"><span>İş Gönder</span></NavLink></Button >
    <Button id='logOut'><span onClick={logOut}>Çıkış Yap</span></Button>
    </div>
  )
	}
	if(authCheck==="admin" && getData==='true'){
    return(

    <div >
    <Button id="post"><NavLink to="/isgonder"><span>İş Gönder</span></NavLink></Button >
    <Button id="admin"><NavLink to="/yonetici"><span>Yönetici Paneli</span></NavLink></Button >
    <Button id='logOut'><span onClick={logOut}>Çıkış Yap</span></Button>
    </div>
    )
	
	}
   if(getData==='false' || getData===null){
     return(

    <div >
    <Button id='signUp'><NavLink to="/uyeol"><span>Üye Ol</span></NavLink></Button>
    <Button id='signIn'><NavLink to="/" exact><span>Giriş Yap</span></NavLink></Button >
 
    </div>
     )
	
      }
  }
  const logOut = () =>{
	window.localStorage.clear();
	window.location.reload();
  }
  useEffect(()=>{
	const formData = new FormData()
	formData.append('user_mail',window.localStorage.getItem('mailData'))
    formData.append('action','check')
   fetch(`${process.env.REACT_APP_ENDPOINT}`,{
     method: 'POST',
     body: formData
   })
   .then(res => res.json())
   .then(data =>setAuthCheck(data))
   .then(data=>window.localStorage.setItem('isAdmin',authCheck))
 
loginChecker()
console.log(window.localStorage.getItem('isLoggedIn'));
  })

	return(
		<nav>	
			<AppBar position="static" className="appBarColor">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <div className='logoArea'>

       <img src={Logo}/>
            </div>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
             
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Typography textAlign="center"><div className='respNavLinks'>{loginChecker()}</div></Typography>
                </MenuItem>
          
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
           <div className='logoArea'>

<img src={Logo}/>
     </div>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <div className='routeLinks'>
            {loginChecker()}
            </div>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
          
              <IconButton onClick={()=>props.history.push("/messages")} sx={{ p: 0 }}>
                {messageArea()}
              </IconButton>
         
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
			</nav>
		  
	)
}

export default withRouter((Navbar));