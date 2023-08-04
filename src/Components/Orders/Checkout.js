import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, ModalBody } from 'reactstrap';
import { Table } from 'reactstrap';
import { useCart } from "react-use-cart";
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
import { Formik } from 'formik';
import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Box from '@mui/material/Box';
import PaymentIcon from '@mui/icons-material/Payment';
import CallIcon from '@mui/icons-material/Call';
import { useSelector, useDispatch, } from 'react-redux';
import { resetVoucher } from '../../redux/grocersssSlice';
import Footer2 from '../Footer/Footer2';
import Button from '@mui/material/Button';
import { StayPrimaryLandscape } from '@mui/icons-material';

const Checkout = () => {
    const {
        //isEmpty,
        //totalUniqueItems,
        items,
        totalItems,
        cartTotal,
        //updateItemQuantity,
        //removeItem,
        emptyCart
    } = useCart();

    const data = useSelector((state) => {
        return state
    })
    const dispatch = useDispatch();

    const [state, setState] = useState({
        isLoading: false,
        isModalOpen: false,
        modalMsg: '',
        disablePlaceOrder: true

    })
    const isLoading = state.isLoading;
    const isModalOpen = state.isModalOpen;
    const modalMsg = state.modalMsg;
    const disablePlaceOrder = state.disablePlaceOrder;

    let navigate = useNavigate();

    const submitHandler = (values) => {
        setState(prevState => {
            return {
                ...prevState,
                isLoading: true,
            }
        });
        //
        const order = {
            userId: data.userId,
            items: items,
            totalItems: totalItems,
            customer: values,
            price: parseFloat(cartTotal + 50 - data.voucherAmount).toFixed(2),
            voucherName: data.voucherName,
            voucherAmount: data.voucherAmount,
            orderTime: new Date(),
            status: "Pending",
        }
        console.log(order);

        axios.post("https://grocerxpress-479b8-default-rtdb.firebaseio.com/orders.json?auth=" + localStorage.getItem('token'), order)
            .then(response => {
                if (response.status === 200) {
                    setState(prevState => {
                        return {
                            ...prevState,
                            isLoading: false,
                            isModalOpen: true,
                            modalMsg: "Order Placed Successfully!",
                        }
                    })
                    emptyCart();
                    dispatch(resetVoucher());
                } else {
                    setState(prevState => {
                        return {
                            ...prevState,
                            isLoading: false,
                            isModalOpen: true,
                            modalMsg: "Something Went Wrong! Order Again",
                        }
                    })
                }
            })
            .catch(err => {
                setState(prevState => {
                    return {
                        ...prevState,
                        isLoading: false,
                        isModalOpen: true,
                        modalMsg: "Something Went Wrong! Order Again",
                    }
                })
            })
    }

    let form = (
        <div className='container'>
            <div className=" mb-3 shadow" style={
                {
                    border: '1px solid #008baa',
                    boxShadow: '2px 2px #008baa',
                    borderRadius: '5px',
                    padding: '20px',
                }
            }>
                <h5 style={{ padding: '10px' }}>Payment: BDT {cartTotal}</h5>
                <hr />

                <Table style={{ marginTop: '30px' }} borderless>
                    <tbody>
                        <tr>
                            <td>
                                <h6>Order Total</h6>
                            </td>
                            <td allign="right">
                                <h6>Tk {cartTotal} </h6>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h6>Delivery Charge</h6>
                            </td>
                            <td allign="right">
                                <h6>Tk 20 </h6>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h6 style={{ color:'blueviolet' }}>Voucher</h6>
                            </td>
                            <td allign="right">
                                <h6 style={{ color: 'blueviolet' }}>(Tk {data.voucherAmount}) {data.voucherName}  </h6>
                            </td>
                        </tr>
                        <tr style={{ borderTop: '1px solid black' }}>
                            <td>
                                <h6>Total</h6>
                            </td>
                            <td allign="right">
                                <h6>Tk {parseFloat(cartTotal + 20 - data.voucherAmount).toFixed(2)} </h6>
                            </td>
                        </tr>
                    </tbody>
                </Table></div><br />
            <div className=" mb-3 shadow" style={
                {
                    border: '1px solid #008baa',
                    boxShadow: '2px 2px #008baa',
                    borderRadius: '5px',
                    padding: '20px',
                }
            }>
                <h5 style={{ padding: '10px' }}>Your Information: </h5>
                <hr />
                <Formik
                    initialValues={{
                        name: localStorage.getItem('fname') + " " + localStorage.getItem('lname'),
                        deliveryAddress: "",
                        phone: "",
                        paymentType: "Cash On Delivery",
                    }}
                    validate={values => {
                        const errors = {};
                        if (!values.deliveryAddress) {
                            errors.deliveryAddress = 'Required';
                            setState({
                                disablePlaceOrder: true
                            });
                            return errors;
                        }
                        if (!values.phone) {
                            errors.phone = 'Required';
                            setState({
                                disablePlaceOrder: true
                            });
                            return errors;

                        } else if (!/^(\+)?(88)?01[0-9]{9}$/i.test(values.phone)) {
                            errors.phone = "Invalid Phone Number";
                            setState({
                                disablePlaceOrder: true
                            });
                            return errors;
                        } else setState({ disablePlaceOrder: false })
                        return errors;
                    }}
                    onSubmit={(values) => {
                        console.log(values);
                        submitHandler(values);
                    }}
                >
                    {({
                        values,
                        errors,
                        handleChange,
                        handleSubmit,

                    }) => (
                        <form style={
                            {
                                borderRadius: '5px',
                                padding: '20px',
                                marginTop: '-40px'
                            }
                        } onSubmit={handleSubmit}>

                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <LocationOnIcon sx={{ color: 'action.active', mr: 1, my: 1 }} />
                                <TextField name="deliveryAddress" id="deliveryAddress" margin='normal' className="form-control" value={values.deliveryAddress} label="Your address" variant="standard" onChange={handleChange} />  </Box>

                            <span style={{ color: 'red' }}>{errors.deliveryAddress}</span>

                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <CallIcon sx={{ color: 'action.active', mr: 1, my: 1 }} />
                                <TextField name="phone" id="phone" margin='normal' className="form-control" value={values.phone} label="Your phone no." onChange={handleChange} variant="standard" />  </Box>

                            <span style={{ color: 'red' }}>{errors.phone}</span>

                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <PaymentIcon sx={{ color: 'action.active', mr: 1, my: 1 }} />
                                <TextField style={{ width: "100%" }}
                                    id="paymentType"
                                    name='paymentType'
                                    margin='normal'
                                    variant='standard'
                                    select
                                    label="Payment Type"
                                    value={values.paymentType}
                                    onChange={handleChange}
                                    placeholder='Payment Type'
                                >
                                    <MenuItem key="Cash On Delivery" value='Cash On Delivery'>
                                        Cash On Delivery
                                    </MenuItem>
                                </TextField>
                            </Box>
                            <br />

                            <Button type='submit' color='primary' variant='contained' className="mr-auto" disabled={disablePlaceOrder}  >Place Order</Button>
                            <Button onClick={() => navigate('/', { replace: true })} color='secondary' variant='contained' className='mx-1'>Cancel</Button>


                        </form>)}
                </Formik>
            </div>

        </div >
    )
    document.title = "Checkout | GrocerXpress"
    return (
        <div>
            <div style={{ marginTop: '100px', marginBottom: '50px' }}>
                {isLoading ? <Spinner /> : form}
                <Modal isOpen={isModalOpen}>
                    <ModalBody onClick={() => navigate('/')}><p>{modalMsg}</p></ModalBody>
                </Modal>
            </div>
            <Footer2 />
        </div>

    );
};

export default Checkout;