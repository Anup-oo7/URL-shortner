import {AppBar,Toolbar, styled, Drawer,List,ListItem,ListItemIcon,ListItemText,IconButton} from "@mui/material";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import HouseIcon from "@mui/icons-material/House";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from '@mui/icons-material/Close';
import {DataContext} from '../context/DataProvider';
import { UseAuth } from '../../service/UseAuth';


const Component = styled(AppBar)`
  margin-bottom: 30px;
  color: #fff;
  background-color: #24252a;
`;

const Container = styled(Toolbar)`
  justify-content: space-between;
  & > a {
    padding: 15px;
    margin: 0 50px;
    font-weight: 400;
    font-size: 20px;
    color: #fff;
    text-decoration: none;
    display: flex;
    align-items: center;
  }
  & > a > svg {
    font-size: 40px;
    justify-content: space-evenly;
  }
`;

const MobileMenu = styled(Drawer)`
  .MuiDrawer-paper {
    width: 250px;
    
  }
`;


function Header() {
  const {logout} = UseAuth()
  const [menuOpen, setMenuOpen] = useState(false);
  const {account} =useContext(DataContext)
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout =()=>{
    logout();
  }


  return (
   
    <Component className="navComp">
      <Container>
          <IconButton color="inherit" size='medium' onClick={toggleMenu}>
            <MenuIcon />
          </IconButton>
          <h3 style={{wordSpacing:5, textDecoration:'underline',margin:'auto'}}>Welcome To URL Shortener {account.name}</h3>
          
        <MobileMenu anchor="left" open={menuOpen} onClose={toggleMenu}>
          <List>
            <ListItem component={Link}   onClick={toggleMenu}>
              <ListItemIcon>
                < CloseIcon />
              </ListItemIcon>
              <ListItemText primary="Close" />
            </ListItem>
            <ListItem  component={Link} to="/home" onClick={toggleMenu}>
              <ListItemIcon>
                <HouseIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem  component={Link} to="/" onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
           <ListItem>
            <div>
              <h2>Hello {account.name}</h2>
              <p>{account.email}</p>
             </div>
          </ListItem>
          </List>
        </MobileMenu>
      </Container>

    </Component>
   
  );
}

export default Header;
