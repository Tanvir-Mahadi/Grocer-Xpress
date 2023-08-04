import React, { useEffect } from "react";
import ItemCard from "./ItemCard";
import Top from './Top';
import { SnackbarProvider } from 'notistack';
import './Home.css';
import { useState } from "react";
import { Input, Alert } from 'reactstrap';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useSelector, useDispatch, } from 'react-redux';
import { fetchProductData } from '../../redux/grocersssSlice'
import Spinner from '../Spinner/Spinner';
import Footer2 from "../Footer/Footer2";




const Home = () => {

    const dispatch = useDispatch();
    const data = useSelector((state) => {
        return state
    })
    const [items, setItems] = useState(data.productData);

    const [searchTerm, setSearchTerm] = useState("");

    const [value, setValue] = React.useState(0);

    useEffect(() => {
        dispatch(fetchProductData());
    }, [dispatch]);
    useEffect(() => {
        setItems(data.productData)
    }, [data]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const uniqueCategories = [...new Set(
        data.productData.map(item => { return item.category })
    )];
    console.log(uniqueCategories);

    const filterItem = (categItem) => {
        const updatedItems = data.productData.filter((currItem) => {
            return currItem.category === categItem;
        });

        setItems(updatedItems)
    }
    document.title = "Home | GrocerXpress";

    let home = null;
    if (data.productDataErr) {
        home = <p style={{
            border: '1px solid grey',
            boxShadow: '1px 1px #888888',
            borderRadius: '5px',
            padding: '20px',
            marginBottom: '10px',
            widht: '80%'

        }}>Sorry Failed to Load Items</p>
    } else {
        home = (<div>
            
            <div className="templateContainer">
                <div style={{}} className="searchInput_Container">
                    <Input style={{ color: 'black', border: '2px solid #008baa', boxShadow: '0 5px 5px 0 rgba(0, 0, 0, 0.19)' }} className="box" id="searchInput" type="text" placeholder="Search food_items, products..."
                        onChange={(event) => {
                            setSearchTerm(event.target.value);
                        }} />
                </div>
            </div>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="row justify-content-center mt-2 mb-3">
                        <Box sx={{ maxWidth: { xs: 320, sm: 480, md: 800 }, bgcolor: 'background.paper' }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                variant="scrollable"
                                scrollButtons="auto"
                                textColor="primary"
                                indicatorColor="primary"
                                aria-label="scrollable primary auto tabs example"
                            >
                                <Tab label="All" onClick={() => setItems(data.productData)} />
                                {uniqueCategories.map((category) =>
                                    (<Tab key={category} label={category} onClick={() => filterItem(category)} />)
                                )}
                            </Tabs>
                        </Box>
                    </div>
                    {
                        items?.filter((val) => {
                            if (searchTerm === "") {
                                return val;
                            } else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return val;
                            } return 0;
                        })
                            .map((val) => {
                                return (
                                    <div className="col-xl-2 m-xl-2 col-md-3 col-sm-4 m-1" key={Math.random()}>
                                        <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
                                            <ItemCard
                                                img={val.img}
                                                price={val.price}
                                                title={val.title}
                                                item={val}
                                                desc={val.desc}
                                                category={val.category}
                                                key={Math.random()}
                                            />
                                        </SnackbarProvider>
                                    </div>
                                )
                            })
                    }
                </div>
                <Top />
            </div>
            <Footer2 />
        </div>)
    }

    return (
        <div>
            {data.productDataLoading ? <Spinner /> : home}

        </div>
    );
};
export default Home;
