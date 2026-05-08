import { Link, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import axios from "axios";
import { useEffect, useState } from "react";

function Success() {
    const { orderId } = useParams();
    const [orderData, setOrderData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const getCart = async (orderId) => {
        setIsLoading(true);
        const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/order/${orderId}`,
        );
        setOrderData(res.data.order);
        setIsLoading(false);
    };

    useEffect(() => {
        getCart(orderId);
    }, [orderId]);

  return (
    <div className="container full-height">
        <Loading isLoading={isLoading} />
      <div
        style={{
          minHeight: "400px",
          backgroundImage:
            "url(https://storage.googleapis.com/vue-course-api.appspot.com/laimao/1720344175486.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=mRz2wajs81d10ogbg%2F3hU%2FoYDpqk30aAi9hfMI%2BGE2bMamAcG3WQ%2FO5dA7bbj2qB9SqFURsj%2FSNXgUu%2BUrx4Eeg1E0RF6Vk%2FUs9zfuVmXaknJFJZIep1N728bvMVJLOQ%2Ft5c0q24s%2BkTj4md9ZUarDzj%2FWeSVqcJdv2BEEnbLy996hV8Ky6g1eDmMwRv%2BHWUpttV3OGiMXAbKVffg3srBAuJWhRhsnE2cGUORq5VC8PKHe%2FMV%2F%2BNszOt8J9NTi8h%2FvPMVRAOJ3fpLVuYMMv7UsU14HtYOcb4ku17EsgWn%2FSP7Oi0AhMIfAtCCbwrvVw3rNuK7nsU5Ouy%2FjsDlNWbYg%3D%3D)",
          backgroundPosition: "right 20% bottom 45%",
        }}
      ></div>
      <div className="mt-5 mb-7">
        <div className="row">
          <div className="col-md-6">
            <h2>商品選購成功</h2>
            <p className="text-muted">
              親愛的顧客，感謝您在本平台訂購。我們非常感激您對我們的信任和支持，讓我們有機會為您提供美觀的產品和優質的服務。
            </p>
            <p className="text-muted">
              感謝您選擇本平台，祝您一切順心，生活愉快！
            </p>
            <Link to="/" className="btn btn-outline-dark me-2 rounded-0 mb-4">
              回到首頁
            </Link>
          </div>
          <div className="col-md-6">
            <div className="card rounded-0 py-4">
              <div className="card-header border-bottom-0 bg-white px-4 py-0">
                <h2>選購商品細節</h2>
              </div>
              <div className="card-body px-4 py-0">
                <ul className="list-group list-group-flush">
                {Object.values(orderData?.products || {}).map((item) => { //是物件結構的話不能用map方法，故用Object.values()方法轉為陣列
                    return (
                      <li className="list-group-item px-0" key={item.id}>
                        <div className="d-flex mt-2">
                          <img
                            src={item.product.imageUrl}
                            alt=""
                            className="me-2"
                            style={{ width: "60px", height: "60px" }}
                          />
                          <div className="w-100 d-flex flex-column">
                            <div className="d-flex justify-content-between fw-bold">
                              <h5>{item.product.title}</h5>
                              <p className="mb-0">x{item.qty}</p>
                            </div>
                            <div className="d-flex justify-content-between mt-auto">
                              <p className="text-muted mb-0">
                                <small>NT${item.product.price}</small>
                              </p>
                              <p className="mb-0">NT${item.final_total}</p>
                            </div>
                          </div>
                        </div>
                        </li>
                    );
                  })}
                  <li className="list-group-item px-0 pb-0">
                    <div className="d-flex justify-content-between mt-2">
                        <p className="mb-0 h4 fw-bold">總計</p>
                        <p className="mb-0 h4 fw-bold">NT${orderData.total}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Success;