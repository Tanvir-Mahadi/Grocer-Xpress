import React, { useState } from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../redux/grocersssSlice';
import Spinner from './../Spinner/Spinner';
import { Alert } from 'reactstrap';
import { TextField } from '@mui/material';
import './../GroceryShop/Home.css';
import Box from '@mui/material/Box';
import { Button, FormControl, InputLabel, Input, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Logo from '../../assets/grocersss.png';
const Auth = () => {
    const [val, setVal] = useState({
        password: '',
        showPassword: false,
    })
    const [confirmVal, setConfirmVal] = useState({
        confrimPassword: '',
        showConfirmPassword: false,
    })
    const handleClickShowPassword = () => {
        setVal({
            ...val,
            showPassword: !val.showPassword,
        });
    };
    const handleClickShowConfirmPassword = () => {
        setConfirmVal({
            ...confirmVal,
            showConfirmPassword: !confirmVal.showConfirmPassword,
        });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleMouseDownConfirmPassword = (event) => {
        event.preventDefault();
    };
    const [mode, setMode] = useState('Login');
    const dispatch = useDispatch();
    const authLoading = useSelector(state => {
        return state.authLoading
    })
    const authFailedMsg = useSelector(state => {
        return state.authFailedMsg
    })
    //
    let err = null;
    let errMsg = null;
    if (authFailedMsg !== null) {
        if (authFailedMsg === 'INVALID_PASSWORD') errMsg = 'The Password is invalid';
        if (authFailedMsg === 'EMAIL_EXISTS') errMsg = 'The email already exists';
        if (authFailedMsg === 'EMAIL_NOT_FOUND') errMsg = 'The email is not registered';
        err = <Alert color='danger'>{errMsg}</Alert>
    }
    let form = null;
    if (authLoading) {
        form = (<Spinner />)
    } else {
        form = (
            <div className='row align-items-center py-4 container mx-1 mx-md-0'>
                <div className='d-none d-md-block col-md-6'>
                    <img src={Logo} alt='grocersss' className='img-fluid' />

                </div>
                <div style={{ borderRadius: '8px', }} className='mx-sm-auto col-md-6 col-sm-12 shadow align-items-center'>
                    <Formik
                        initialValues={{
                            fname: "",
                            lname: "",
                            email: "",
                            password: "",
                            passwordConfirm: "",
                        }}
                        onSubmit={
                            (values) => {
                                dispatch(auth(values.email, values.password, values.fname, values.lname, mode, 'User'))
                            }
                        }
                        validate={(values) => {
                            const errors = {};
                            if (!values.email) {
                                errors.email = 'Required';
                            } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+\.[A-Z]{2,}$/i.test(values.email)) {
                                errors.email = 'Invalid email address';
                            } else if (!/^(?!.*@(?:admin)).*@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/i.test(values.email)) {
                                errors.email = 'Invalid email address: @admin reserved for Administrators';
                            } 
                            if (!values.password) {
                                errors.password = 'Required';
                            } else if (values.password.length < 6) {
                                errors.password = 'Must be atleast 6 characters!';
                            }
                            if (mode === "Sign Up") {
                                if (!values.fname) {
                                    errors.fname = 'Required';
                                }
                                if (!values.lname) {
                                    errors.lname = 'Required';
                                }
                                if (!values.passwordConfirm) {
                                    errors.passwordConfirm = 'Required';
                                } else if (values.password !== values.passwordConfirm) {
                                    errors.passwordConfirm = 'Password field does no match!';
                                }
                            }
                            return errors;
                        }}
                    >
                        {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
                            <div style={{
                                padding: '15px',
                            }}>
                                <p style={{
                                    fontSize: '30px',
                                    textAlign: 'center',
                                    color: '#008baa',
                                }}>{mode === 'Sign Up' ? 'Sign Up' : "Login"}</p>
                                <br />
                                <form style={
                                    {
                                        borderRadius: '5px',
                                        padding: '20px',
                                        marginTop: '-40px'
                                    }
                                } onSubmit={handleSubmit}>
                                    {mode === 'Sign Up' ? <div className='row'>
                                        <div className='col-6'>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                                <TextField name="fname" id="fname" margin='normal' className="form-control" value={values.fname} label="First Name" variant="standard" onChange={handleChange} onBlur={handleBlur} />
                                            </Box>
                                            {touched.fname && errors.fname ? (<span style={{ color: 'red' }}>{errors.fname}</span>) : null}
                                        </div>
                                        <div className='col-6'>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                                <TextField name="lname" id="lname" margin='normal' className="form-control" value={values.lname} label="Enter Your Last Name" onChange={handleChange} onBlur={handleBlur} variant="standard" />
                                            </Box>
                                            {touched.lname && errors.lname ? (<span style={{ color: 'red' }}>{errors.lname}</span>) : null}
                                        </div>
                                    </div> : null}
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <TextField name="email" id="email" margin='normal' className="form-control" value={values.email} label="Enter Your Mail Address" onChange={handleChange} onBlur={handleBlur} variant="standard" />
                                    </Box>
                                    {touched.email && errors.email ? (<span style={{ color: 'red' }}>{errors.email}</span>) : null}
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <FormControl sx={{ width: '100%' }} variant="standard">
                                            <InputLabel >Password</InputLabel>
                                            <Input
                                                id="password"
                                                name="password"
                                                type={val.showPassword ? 'text' : 'password'}
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                        >
                                                            {val.showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                    </Box>
                                    {touched.password && errors.password ? (<span style={{ color: 'red' }}>{errors.password}</span>) : null}
                                    {mode === 'Sign Up' ? <div>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                            <FormControl sx={{ width: '100%' }} variant="standard">
                                                <InputLabel >Confirm Password</InputLabel>
                                                <Input
                                                    id="passwordConfirm"
                                                    name="passwordConfirm"
                                                    type={confirmVal.showConfirmPassword ? 'text' : 'password'}
                                                    value={values.passwordConfirm}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle passwordConfirm visibility"
                                                                onClick={handleClickShowConfirmPassword}
                                                                onMouseDown={handleMouseDownConfirmPassword}
                                                            >
                                                                {confirmVal.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                />
                                            </FormControl>
                                        </Box>
                                        {touched.passwordConfirm && errors.passwordConfirm ? (<span style={{ color: 'red' }}>{errors.passwordConfirm}</span>) : null}
                                    </div> : null}
                                    <br />
                                    <Button type='submit' variant='contained' color='secondary' className=" mr-auto" > {mode === "Sign Up" ? "Sign Up" : "Login"}</Button >
                                    <label className='authlabel' onClick={() => setMode(mode === "Sign Up" ? "Login" : "Sign Up")}><i>{mode === 'Sign Up' ? 'Already have an account? Login' : "Don't have an account? Sign Up"}</i></label>
                                </form>
                            </div>
                        )}
                    </Formik>
                </div>
            </div>
        )
    }
    return (
        <div style={{ marginTop: '150px' }}>
            <div className='container'>
                {err}
                {form}
            </div>
        </div>
    );
};

export default Auth;