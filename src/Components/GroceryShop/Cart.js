import React from "react";
import { useCart } from "react-use-cart";
import './ItemCard.css';
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonGroup from '@mui/material/ButtonGroup';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { useSnackbar } from "notistack";

const Cart = () => {
    const {
        isEmpty,
        totalUniqueItems,
        items,
        totalItems,
        updateItemQuantity,
        removeItem,
        emptyCart
    } = useCart();

    const { enqueueSnackbar } = useSnackbar();
    const handleClickVariant = (variant) => {
        switch (variant) {
            case 'success':
                enqueueSnackbar('Item Added Successfully!', { variant });
                break;
            case 'error':
                enqueueSnackbar('Item Removed Completely!', { variant });
                break;
            case 'secondary':
                enqueueSnackbar('Item Removed Successfully!', { variant });
                break;
            default:
                return;
        }

    };
    if (isEmpty) return <h4 style={
        {
            border: '1px solid #008baa',
            boxShadow: '3px 3px #008baa',
            borderRadius: '5px',
            padding: '20px',
            textAlign: 'center'
        }
    }>Your Cart is empty</h4>;
    return (
        <section className="container-lg container-xs-fluid">
            <div className="row jistufy-content-center">
                <div className="col-12">
                    <h5>
                        {" "}
                        Cart ({totalUniqueItems}) Total Item :({totalItems})
                    </h5>
                    <table className="table table-light m-0">
                        <tbody>
                            {items.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td width='100px'>
                                            <img className="card" src={item.img} style={{ width: '100%' }} alt={item.title} />
                                        </td>

                                        <td style={{ fontWeight: 'bold' }}>{item.title}</td>

                                        <td style={{ fontWeight: 'bold' }}>Price: BDT {item.price * item.quantity}</td>

                                        <td style={{ fontWeight: 'bold' }}> (x{item.quantity})</td>

                                        <td>
                                            <ButtonGroup>

                                                <Button
                                                    aria-label="increase" color="success" onClick={() => { updateItemQuantity(item.id, item.quantity + 1); handleClickVariant('success'); }}

                                                >
                                                    <AddIcon fontSize="small" />
                                                </Button>
                                                <Button
                                                    aria-label="reduce" color="error" onClick={() => { updateItemQuantity(item.id, item.quantity - 1); handleClickVariant('secondary'); }}

                                                >
                                                    <RemoveIcon fontSize="small" />
                                                </Button>
                                                <Button onClick={() => { removeItem(item.id); handleClickVariant('error'); }} style={{ backgroundColor: "#008baa", color: "white", }} variant="conatined">
                                                    <DeleteIcon />

                                                </Button>
                                            </ButtonGroup>

                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <br />

                    <br />
                </div>
                <div className="col-auto mb-2">
                    <Button onClick={() => { handleClickVariant('error'); emptyCart() }} color="secondary" variant="contained">
                        Clear Cart
                    </Button>
                </div>
            </div>
        </section >
    );
};

export default Cart;
