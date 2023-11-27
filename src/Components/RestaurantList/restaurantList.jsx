import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllDetails, getImage, getRestarurantDetails, getmenuitems } from "./restaurantDetailsService";
import NavBar from "../NavBar/NavBar";
import './restaurantlist.css'
import FoodList from "../FoodList";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const RestaurnatList = () => {

    console.count()
    const { location, mall } = useParams()
    const [restaurantDetails, setrestaurantDetails] = useState(null);
    const [image, setimg] = useState(null)
    const [foodListPopUp, setFoodListPopUp] = useState(false);
    const [restaurantid, setRestaunrantid] = useState(0)
    const [menuItems, setMenuItems] = useState(null)
    const navigate = useNavigate();

    const getRatingBackgroundColor = (rating) => {
        if (rating >= 4.0) {
            return "green"; // You can use any color here
        } else if (rating >= 3) {
            return "orange"; // You can use any color here
        } else {
            return "red"; // You can use any color here
        }
    };

    useMemo(() => {
        let mallid;
        getAllDetails(mall, location).then((malldata) => {
            //console.log(malldata);
            if (malldata.results.length>0) {
                mallid = malldata.results[0].fsq_id;
                //console.log(mallid);
                fetchRestaurantData(mallid);
            }
            else{
                navigate('/error')
            }

            //localStorage.setItem(mallid,[])
        });
    }, [mall, location]);

    const fetchRestaurantData = async (mallid) => {
        //console.log(mallid)
        const [restodata, image] = await Promise.all([getRestarurantDetails(mallid), getImage(mallid)])
        setrestaurantDetails(restodata)
        setimg(image)
    }

    const showfoodOptions = (restaurantids) => {
        ////console.log(restaurantids)

        getmenuitems(restaurantids).then((menudata) => {
            //console.log(menudata)
            setMenuItems(menudata)
            setRestaunrantid(restaurantids)
            setFoodListPopUp(true)
        })

    }

    return (
        <div>
            <NavBar />
            <div>
                <div style={{ padding: "2vh", fontSize: "x-large", fontFamily: "cursive" }}>
                    Restaurants in {mall},{location} you would enjoy eating from
                </div>
                <section className="sec-2" >

                    {
                        restaurantDetails ? (
                            restaurantDetails.map((data, index) => (
                                <div className="box-2" key={index} onClick={() => showfoodOptions(data.restaurantid)}>
                                    <div className="white-2">
                                        <span>{data.restaurantname}</span>
                                        <span
                                            style={{
                                                backgroundColor: getRatingBackgroundColor(data.restaurantrating),
                                                color: "white",
                                                padding: "3px 8px",
                                                borderRadius: "15px",
                                                position: "absolute",
                                                left: "80%",
                                                top: "5%",
                                            }}
                                        >
                                            {data.restaurantrating}
                                        </span>
                                    </div>
                                    {image && image[index] ? (
                                        <div key={index}>
                                            <img src={image[index]} alt="" />
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            ))
                        ) : (
                            <><Box sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box></>
                        )
                    }

                </section>
            </div>
            {
                !!foodListPopUp && menuItems &&
                <FoodList
                    id={restaurantid}
                    trigger={foodListPopUp}
                    setTrigger={setFoodListPopUp}
                    menuItems={menuItems}
                ></FoodList>
            }
        </div>
    )
}

export default React.memo(RestaurnatList)