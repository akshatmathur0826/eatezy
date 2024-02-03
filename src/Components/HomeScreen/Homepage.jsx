import React from "react";
import '../HomeScreen/homepage.css'
import NavBar from "../NavBar/NavBar";
// import {Link} from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress } from "@mui/material";


//fsq3IxfT8xdGzNrSC9gU/queQufDMGqQxMS9VCCWobyTuRg=
const HomeScreen = () => {

    const navigate = useNavigate()
    let location = 'Navi Mumbai'


    const navToMallListPage = (index) => {
        navigate(`/${location}/${mallListatHomePage[index].mallName}`)
    }
    let mallListatHomePage = [
        { mallName: "Inorbit Mall", mallpic: "https://www.themediaant.com/blog/wp-content/uploads/2022/01/IMG-20200806-WA0031-777x437-1.jpg" },
        { mallName: "Nexus Seawoods Mall", mallpic: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/7e/7e/a5/entrance.jpg?w=1200&h=-1&s=1" },
        { mallName: "Haware Mall", mallpic: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/4f/b7/f6/haware-centurion-mall.jpg?w=1200&h=-1&s=1" },
        { mallName: "Raghuleela Mall", mallpic: "https://mumbai.mallsmarket.com/sites/default/files/photos/malls/RaghuleelaMall_Vashi_1.jpg" }
    ]

    return (
        <div>
        <NavBar />
        <div>
            <div style={{ padding: "2vh", fontSize: "x-large", fontFamily: "cursive" ,marginTop:"10%"}}>
            Top Shopping malls in Navi Mumbai
            </div>
            <section className="sec-2" >

                {
                    mallListatHomePage  ? 
                    (
                        mallListatHomePage.map((data, index) => (
                            <div className="box-2" key={index} onClick={() => navToMallListPage(index)}>
                                <div className="white-2">
                                <span>{data.mallName}</span>
                                </div>
                                    <div key={index}>
                                    <img src={data.mallpic} alt="" />
                                    </div>
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
        
    </div>
    );
}

export default HomeScreen