import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { CircularProgress } from '@mui/material';

export default function Navbar() {

    const circularLoading = useSelector(state => state.loading);

    const navigate = useNavigate();
    const location = useLocation()

    const [anchorEl, setAnchorEl] = useState(null);
    var user = JSON.parse(localStorage.getItem("user") || '[]');

    if(location.pathname === "/login" || location.pathname === "/register") {
        return null
    }

    function menuExpand() {
        var nbLinks = document.getElementById("nbLinks");
        var nbMenuIcon = document.getElementById("nbMenuIcon");
        if (nbLinks.style.display === "flex") {
            nbLinks.style.display = "none";
            nbMenuIcon.style.backgroundColor = "#ff6900";
          } else {
            nbLinks.style.display = "flex";        
            nbMenuIcon.style.backgroundColor = "#b34900";
          }
    }

    function handleMenu(event) {
        setAnchorEl(event.currentTarget);
    };

    function handleClose() {
        setAnchorEl(null);
    };
    
    function handleExit() {
        localStorage.removeItem('user');
        setAnchorEl(null);
        navigate("/login");
    };

    const styles = {
        loading: {
            display: circularLoading.value ? "block" : "none",
        }
    };

    return (
        <>   
            <IconButton id="nbMenuIcon" onClick={menuExpand}>
                <MenuIcon className="nbLargeSvg"/>
            </IconButton>
            <div id="navbar">
                <p>Menü</p>
                <p style={{color: user.isAdmin ? "red" : "white" }}>{user !== 0 && user.userName}</p>
            </div>
            <IconButton id="nbAccountIcon" onClick={handleMenu}>
                <AccountCircle className="nbLargeSvg" style={{color: user.isAdmin ? "red" : "white" }} />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                >
                <MenuItem onClick={handleExit}>Kilép</MenuItem>
            </Menu>
            <div id="nbLinks">
                <Link id="nbLink" to="/home" onClick={menuExpand}>Főoldal</Link>
                <Link id="nbLink" to="/result" onClick={menuExpand}>Eredmények</Link>
                {user.length !== 0 && user.isAdmin && <Link id="nbLink" to="/admin" onClick={menuExpand}>Adminisztrálás</Link>}
            </div>
            <div id="nbCircleLoadingWrap" style={styles.loading}>
                <CircularProgress id="nbCircleLoading" size={100}/>
            </div>

        </>
    );
}

