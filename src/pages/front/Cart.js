import { Link, useOutletContext } from "react-router-dom";
import axios from "axios";
import { useState,useRef} from "react";
import Loading from "../../components/Loading";
import { useDispatch } from "react-redux";
import { createAsyncMessage } from "../../slice/messageSlice";

function Cart(){
    const [loadingItems, setLoadingItems] = useState([]);
    const {cartData,getCart} = useOutletContext();
    const [couponCode, setCouponCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const [couponMsg, setCouponMsg] = useState('');
    const hascoupon = cartData?.final_total !== cartData?.total;

    
    const removeCartItem = async(id)=>{
        try {
            setIsLoading(true);
            const res = await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/cart/${id}`)
            if(res.data.success){
              getCart();
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    }

    const updateCartItem = async(item,quantity)=>{
        const data = {
            data: {
            product_id: item.product_id,
            qty: quantity
            }
        }
        setLoadingItems([...loadingItems,item.id])
        try {
            setIsLoading(true);
            const res = await axios.put(`/v2/api/${process.env.REACT_APP_API_PATH}/cart/${item.id}`,data);
            setLoadingItems(loadingItems.filter((loadingObject)=>loadingObject!==item.id));
            dispatch(createAsyncMessage(res.data));
            getCart();
            setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          dispatch(createAsyncMessage(error.response.data));
        }
    }

    const sendCoupon = async () => {
      if (!couponCode) {
        return;
      }
      const data = {
        data: {
          code: couponCode,
        },
      };
      setIsLoading(true);
      try {
        const res = await axios.post(
          `/v2/api/${process.env.REACT_APP_API_PATH}/coupon`,
          data
        );
        if (res.data.success) {
          setCouponMsg('');
          getCart();
        }
        setIsLoading(false);
        console.log(res)
      } catch (error) {
        setCouponMsg(error?.response?.data?.message);
        setIsLoading(false);
      }
    };
    const thousandthsFormat = (value) => {
      value = parseInt(value)
      if(isNaN(value)) return
      return value.toLocaleString()
    }
    

   
    return(
    <div className="container">
      <Loading isLoading={isLoading} />
      {cartData?.carts?.length === 0 ?(
        <>
          <div className="cart-alert text-center pt-5 mt-5" style={{ flexGrow: '1' }}>
              <div className="mt-5" style={{ fontSize: '7rem' }}><i className="bi bi-cart-x-fill"></i></div>
              <h2 className="fw-bold mt-3 text-dark">您的購物車沒有商品！</h2>
              <Link to="/products" className="fw-bold btn btn-outline-dark my-3 px-3 py-2">
                  前往購物
              </Link>
          </div>
      </>
      ):(
        <div className="mt-7">
        <h3 className="mt-3 mb-4 fw-bold">購物清單</h3>
        <div className="row">
          <div className="col-md-8">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" className="border-0 ps-0">品項</th>
                  <th scope="col" className="border-0">數量</th>
                  <th scope="col" className="border-0">價格</th>
                </tr>
              </thead>
                {cartData?.carts?.map((item)=>{
                    return(
                        <tbody key={item.id}>
                        <tr className="border-bottom border-top" >
                            <th scope="row" className="border-0 px-0 font-weight-normal py-4">
                                <img src={item.product.imageUrl} alt="" style={{width: "72px", height: "72px"}} className="object-cover"/>
                                <p className="mb-0 fw-bold ms-3 d-inline-block">{item.product.title}</p>
                            </th>
                            <td className="border-0 align-middle" style={{maxWidth: "160px"}}>
                                <div className="input-group pe-5">
                                    <select name="" className="form-select" id=""
                                    value={item.qty}
                                    disabled={loadingItems.includes(item.id)}
                                    onChange={(e)=>{
                                        updateCartItem(item,e.target.value*1);
                                    }}>
                                        {
                                            [...(new Array(20))].map((i,num)=>{
                                                return(
                                                    <option value={num+1} key={num} className="text-center">{num+1}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </td>
                            <td className="border-0 align-middle"><p className="mb-0 ms-auto">NT$ {thousandthsFormat(item.total)}</p></td>
                            <td className="border-0 align-middle"><button type="button" className="btn"
                            onClick={()=>removeCartItem(item.id)}><i className="bi bi-x"></i></button></td>
                        </tr>
              </tbody>)
                })}
                
            </table>
            <div className="input-group w-50 mb-3">
            {hascoupon?(
                <p className='text-end text-success fw-bold mb-0'>
                  已套用優惠券
                </p>
                ):(<div className="input-group">
                    <input type="text" className="form-control rounded-0 border-bottom border-top-0 border-start-0 border-end-0 shadow-none" 
                  placeholder="輸入HappyOpenDay打五折" aria-label="Recipient's username" aria-describedby="button-addon2" disabled={hascoupon}
                  value={couponCode} onChange={(e)=>{setCouponCode(e.target.value)}}/>
                  <div className="input-group-append">
                  <button type="button" className="btn btn-dark mx-3 text-nowrap" disabled={hascoupon}
                    onClick={() => {
                      sendCoupon();
                    }}>使用優惠券</button>
                  </div>
              </div>)}
            </div>
            
          </div>
          <div className="col-md-4">
            <div className="border p-4 mb-4">
              <h4 className="fw-bold mb-4">商品資訊</h4>
                <table className="table text-muted border-bottom">
                <tbody>
                  <tr>
                    <th scope="row" className="border-0 px-0 pt-4 font-weight-normal">小計：</th>
                    <td className="text-end border-0 px-0 pt-4">NT$ {thousandthsFormat(cartData.total)}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="border-0 px-0 pt-0 pb-4 font-weight-normal">折扣：</th>
                    <td className="text-end border-0 px-0 pt-0 pb-4">-NT$
                        {(
                          cartData.total - cartData.final_total
                        ).toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
              <div className="d-flex justify-content-between mt-4">
                <p className="mb-0 h4 fw-bold">總計：</p>
                <p className="mb-0 h4 fw-bold">NT$ {thousandthsFormat(Math.round(cartData.final_total))}</p>
              </div>
              <Link className="btn btn-dark w-100 mt-4" to={"/checkout"}>確認結帳</Link>
              <Link className="btn btn-outline-dark w-100 mt-4" to={"/products"}>繼續購物</Link>
            </div>
          </div>
        </div>
        </div>
    
      )}
       </div>
    )

}
export default Cart;