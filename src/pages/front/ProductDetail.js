import { useState,useEffect } from "react";
import axios from "axios";
// import {handleErrorMessage} from "../../store/messageStore";
import Loading from "../../components/Loading";
// import DetailSwiper from "../../components/DetailSwiper";
import { useOutletContext, useParams,Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createAsyncMessage } from "../../slice/messageSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay} from "swiper/modules";

function ProductDetail(){
    const [product,setProduct] = useState({}); 
    const [ortherProducts,setOrtherProducts] = useState([]); 
    const [cartQuentity, setCartQuentity] = useState(1);
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const {getCart} = useOutletContext();
    const dispatch = useDispatch();


    const getProduct=async(id)=>{
      setIsLoading(true);
      const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/product/${id}`);
      setProduct(productRes.data.product);
      setIsLoading(false);
    }
    const getOrtherProducts = async()=>{
      try {
        setIsLoading(true);
        const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products`)
        const resProducts = res.data.products.slice();
        setOrtherProducts([...resProducts]);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }
    
    useEffect(()=>{
      getProduct(id);
      
    },[id]);

    useEffect(()=>{
      getOrtherProducts();
    },[])

    const addToCart = async()=>{
      const data = {
        data: {
        product_id: product.id,
        qty: cartQuentity
      }
      }
      setIsLoading(true);
      try {
        const res = await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/cart`,
          data,
        )
        dispatch(createAsyncMessage(res.data));
        getCart();
        setIsLoading(false); 
      } catch (error) {
        // handleErrorMessage();
        setIsLoading(false);
        dispatch(createAsyncMessage(error.response.data));
      }
    }

    const thousandthsFormat = (value) => {
      value = parseInt(value)
      if(isNaN(value)) return
      return value.toLocaleString()
    }


    return(
    <div className="container full-height mt-7">
      <Loading isLoading={isLoading} />
    <div className="row align-items-center">
        <div className="col-md-7">
          <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={product.imageUrl} className="d-block w-100 img-fluid" alt="產品詳細頁圖片" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb bg-white px-0 mb-0 py-3">
              <li className="breadcrumb-item"><Link className="text-muted" to={`/`}>Home</Link></li>
              <li className="breadcrumb-item"><Link className="text-muted" to={`/products`}>Product</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Detail</li>
            </ol>
          </nav>
          <h2 className="fw-bold h1 mb-1">{product.title}</h2>
          <p className="mb-0 text-muted text-end"><del>NT$ {thousandthsFormat(product.origin_price)}</del></p>
          <p className="h4 fw-bold text-end">NT$ {thousandthsFormat(product.price)}</p>
          <div className="row align-items-center">
            <div className="col-6">
              <div className="input-group my-3 bg-light rounded">
                <div className="input-group-prepend">
                  <button className="btn btn-outline-dark border-0 py-2" type="button" 
                  id="button-addon1" onClick={()=>setCartQuentity((pre)=>pre===1?pre:pre-1)}
                  disabled={cartQuentity===1}>
                    <i className="bi bi-dash"></i>
                  </button>
                </div>
                <input type="number" className="form-control border-0 text-center my-auto shadow-none bg-light" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" 
                value={cartQuentity} readOnly/>
                <div className="input-group-append">
                  <button className="btn btn-outline-dark border-0 py-2" 
                  type="button" id="button-addon2"
                  onClick={()=>setCartQuentity((pre)=>pre+1)}>
                    <i className="bi bi-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-6">
              <button type="button" className="text-nowrap btn btn-dark w-100 py-2"
              onClick={()=>addToCart()}
              disabled={isLoading}>加入購物車</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-5">
        <div className="col-md-4">
          <p>{product.description}</p>
        </div>
        <div className="col-md-3">
          <p className="text-muted">{product.content}</p>
        </div>
      </div>
      <h3 className="fw-bold">其他產品</h3>
      <Swiper 
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
      spaceBetween={10} 
      slidesPerView={5} 
      className="flex flex-col justify-center w-6/12">
        {ortherProducts.map((ortherProduct)=>{
          return(
            <SwiperSlide key={ortherProduct.id}>
            <div className="card border-0 mb-4 position-relative" >
              <img src={ortherProduct.imageUrl} className="card-img-top rounded-0 object-cover" height={200} alt="其他商品圖片"/>
              <div className="card-body p-0 text-center ">
                <h4 className="mb-0 mt-3">{ortherProduct.title}</h4>
                <p className="card-text mb-0">NT$ {ortherProduct.price}<span className="text-muted "><del>NT$ {ortherProduct.origin_price}</del></span></p>
                <Link className=" text-dark text-decoration-none stretched-link" to={`/product/${ortherProduct.id}`} >查看商品</Link>
              </div>
            </div>
          </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
    
    )
}

export default ProductDetail;