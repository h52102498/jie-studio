import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import MessageToast from "../../components/MessageToast";
import BackTopButton from "../../components/BackTopButton";

function FrontLayout(){
    const [cartData, setCartData] = useState({});

    const getCart = async()=>{
      try {
        const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/cart`);
        setCartData(res.data.data);
      } catch (error) {
      }
    }

    useEffect(()=>{
      getCart();
    },[])

    return(<>
        <Navbar cartData={cartData}/>
        <MessageToast />
        <Outlet context={{getCart, cartData}}></Outlet>
        <BackTopButton/>
        <Footer></Footer>
      </>
    )
}

export default FrontLayout;