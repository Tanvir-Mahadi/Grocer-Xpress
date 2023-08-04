import React, { useEffect } from "react";
import './Header.css';
import Logo from '../../assets/grocersss.png';
import CartIcon from '../../assets/cart.png';
import { NavLink } from 'react-router-dom';
import { useCart } from "react-use-cart";
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
} from 'reactstrap';
import { useSelector } from 'react-redux';
import { Avatar } from "@mui/material";
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import { useState } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import ArticleIcon from '@mui/icons-material/Article';
import LoginIcon from '@mui/icons-material/Login';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';

const Header = () => {

    const {
        totalItems,
    } = useCart();


    let badge = null;
    if (!totalItems) {
        badge = null;
    }
    else {
        badge = (
            <span style={{ backgroundColor: "white", color: "#008baa" }} className="position-absolute top-0 start-100 translate-middle badge rounded-pill">
                {totalItems}</span>)

    }
    const token = useSelector((state) => {
        return state.token;
    })

    const appUser = localStorage.getItem('appUser');

    const userData = useSelector((state) => {
        return state.userData;
    })
    /* const appUser = useSelector(state => {
        return state.appUser;
    }) */


    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
    }, [userData]);

    let links = null;
    if (token !== null) {
        if (appUser === "User") {
            links = (
                <Nav>
                    <NavItem>
                        <NavLink to="/" className="NavLink">Home</NavLink>
                    </NavItem>
                    <NavItem style={{ marginTop: '-5px' }}>
                        <NavLink to="/cartadvanced" className="NavLink Cart"><button type="button" className="p-0 btn position-relative">
                            <img width='38px' height='40px' src={CartIcon} alt="Cart" />{badge}
                        </button></NavLink>
                    </NavItem>

                    <NavItem style={{}}>
                        <div className="d-flex flex-row">
                            <div style={{ marginRight: '8px', fontSize: "1.1rem", color: 'white' }} className="">{localStorage.getItem('fname')?.toString().toUpperCase()}
                            </div>
                            <div>

                                <Avatar
                                    id="fade-button"
                                    sx={{ width: 28, height: 28 }}
                                    aria-controls={open ? 'fade-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    style={{ color: '#008baa', backgroundColor: 'white', cursor: 'pointer' }}></Avatar>
                                <Menu
                                    id="fade-menu"
                                    MenuListProps={{
                                        'aria-labelledby': 'fade-button',
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    TransitionComponent={Fade}
                                >
                                    <NavItem style={{ padding: "2px" }}>
                                        <NavLink to="orders" className="avatar" onClick={handleClose}>Orders <ArticleIcon sx={{ color: "primary", width: 18, height: 18 }} /></NavLink>
                                    </NavItem>
                                    <hr width="80%" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
                                    <NavItem style={{ padding: "2px" }}>
                                        <NavLink to="/logout" className="avatar" onClick={handleClose}>Logout <LogoutIcon sx={{ color: "primary", width: 18, height: 18 }} /></NavLink>
                                    </NavItem>
                                </Menu>
                            </div>
                        </div>
                    </NavItem>
                </Nav>
            )
        } else {
            links = (
                <Nav>
                    <NavItem>
                        <NavLink to="/" className="NavLink">Tasks</NavLink>
                    </NavItem>


                    <NavItem style={{}}>
                        <div className="d-flex flex-row">
                            <div style={{ marginRight: '8px', fontSize: "1.1rem", color: 'white' }} className="">{localStorage.getItem('fname')?.toString().toUpperCase()}
                            </div>
                            <div>

                                <Avatar
                                    id="fade-button"
                                    sx={{ width: 28, height: 28 }}
                                    aria-controls={open ? 'fade-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    style={{ color: '#008baa', backgroundColor: 'white', cursor: 'pointer' }}></Avatar>
                                <Menu
                                    id="fade-menu"
                                    MenuListProps={{
                                        'aria-labelledby': 'fade-button',
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    TransitionComponent={Fade}
                                >

                                    <NavItem style={{ padding: "2px" }}>
                                        <NavLink to="/logout" className="avatar" onClick={handleClose}>Logout <LogoutIcon sx={{ color: "primary", width: 18, height: 18 }} /></NavLink>
                                    </NavItem>
                                </Menu>
                            </div>
                        </div>
                    </NavItem>
                </Nav>
            )
        }

    } else {
        links = (
            <Nav>
                <NavItem>
                    <NavLink to="/" className="NavLink">Home</NavLink>
                </NavItem>
                <NavItem style={{ marginTop: '-5px' }}>
                    <NavLink to="/cartadvanced" className="NavLink Cart"><button type="button" className="p-0 btn position-relative">
                        <img width='38px' height='40px' src={CartIcon} alt="Cart" />{badge}
                    </button></NavLink>
                </NavItem>

                <NavItem style={{}}>
                    <div className="d-flex flex-row">

                        <div>

                            <Avatar
                                id="fade-button"
                                sx={{ width: 28, height: 28 }}
                                aria-controls={open ? 'fade-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                style={{ color: '#008baa', backgroundColor: 'white', cursor: 'pointer' }}></Avatar>
                            <Menu
                                id="fade-menu"
                                MenuListProps={{
                                    'aria-labelledby': 'fade-button',
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                TransitionComponent={Fade}
                            >

                                <NavItem style={{ padding: "2px", textAlign: "center" }}>
                                    <NavLink to="/login" className="avatar" onClick={handleClose}>Sign In <LoginIcon sx={{ color: "primary", width: 18, height: 18 }} /></NavLink>
                                </NavItem>
                        
                            </Menu>
                        </div>
                    </div>
                </NavItem>
            </Nav>
        )
    }
    return (
        <div className=' Navigation fixed-top'>
            <Navbar style={{
                backgroundColor: '#008baa',
                height: '65px',
            }}>
                <NavbarBrand href="/" className=' Brand'>
                    <img src={Logo} alt="Logo" width='100px' height="72px" style={{ marginLeft: '-13px' }} />
                </NavbarBrand>
                {links}
            </Navbar>
        </div>
    )
}


export default Header;