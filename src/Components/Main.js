import React, { useEffect } from "react";
import Header from "./Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./GroceryShop/Home";
import CartAdvanced from "./GroceryShop/CartAdvanced";
import { CartProvider } from "react-use-cart";
import { Route, Routes, Navigate } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Checkout from "./Orders/Checkout";
import Orders from "./Orders/Orders";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector, useDispatch } from "react-redux";
import { authCheck } from "../redux/grocersssSlice";
import Logout from "./Auth/Logout";
import Auth from "./Auth/Auth";



const Main = () => {
    let theme = createTheme({
        palette: {
            primary: {
                main: '#008baa',
            },
            secondary: {
                main: '#008baa',
            },
        },
    });

    const token = useSelector(state => {
        return state.token;
    })

    const appUser = localStorage.getItem('appUser');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authCheck());
    }, [dispatch]);

    let routes = null;
    if (token === null) {
        routes = (<Routes>
            <Route path="/login" element={<Auth />} />
            <Route path='/' element={<Home />} />
            <Route path='/cartadvanced' element={<CartAdvanced />} />
            <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>)
    } else {
        if (appUser === "User") {
            routes = (<Routes>
                <Route path='/' element={<Home />} />
                <Route path='/cartadvanced' element={<CartAdvanced />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
            )
        }  
        

    }
    return (
        <div>
            <ThemeProvider theme={theme}>
                <CartProvider>
                    <SnackbarProvider maxSnack={3} autoHideDuration={1000}>
                        <Header />
                        {routes}
                    </SnackbarProvider>
                </CartProvider>
            </ThemeProvider>

        </div>
    );
};

export default Main;