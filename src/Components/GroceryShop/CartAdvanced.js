import { Row } from "reactstrap";
import Cart from "./Cart";
import React from 'react';
import { useCart } from "react-use-cart";
import Bill from "./Bill";
import Top from "./Top";
import Footer2 from "../Footer/Footer2";

const CartAdvanced = () => {
    const {
        cartTotal
    } = useCart();

    document.title = "Your Cart | GrocerXpress"

    return (
        <div>
            <div className="container-fluid" style={{ marginTop: '85px' }}>
                <Row lg="2" xs="1">
                    <div className=" container-fluid col-md- col-lg-9">
                        <Cart />
                    </div>
                    {cartTotal > 0 && (<div style={{}} className="bg-light shadow container-fluid pb-4  col-lg-3">
                        <Bill />
                    </div>)}
                </Row>
                <Top />

            </div>
            {cartTotal !== 0 ? <Footer2 /> : null}
        </div>


    );
};

export default CartAdvanced;


