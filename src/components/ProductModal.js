import axios from "axios";
import { useEffect, useState,useRef,useContext } from "react";
import { handleSuccessMessage, handleErrorMessage,MessageContext } from "../store/messageStore";

function ProductModal({closeProductModal, getProducts,type,tempProduct}){
    const [tempData,setTempData] = useState({
        title: "",
        category: "",
        origin_price: 100,
        price: 300,
        unit: "",
        description: "",
        content: "",
        is_enabled: 1,
        imageUrl: "",
    });

    const [, dispatch] = useContext(MessageContext);//逗號不能清掉
    

    useEffect(()=>{
        if(type==="create"){
            setTempData({
                title: "",
                category: "",
                origin_price: 100,
                price: 300,
                unit: "",
                description: "",
                content: "",
                is_enabled: 1,
                imageUrl: "",
            });
        }else if(type==="edit"){
            setTempData(tempProduct);
        }
    },[type,tempProduct]);

    const handleChange=(e)=>{
        const {value,name} = e.target;
        if (["price","origin_price"].includes(name)) {
            setTempData({
                ...tempData,
                [name]:Number(value),
            })
        }else if(name==="is_enabled"){
            setTempData({
                ...tempData,
                [name]:+e.target.checked,//用加號把boolean轉為Num
            })
        } else {
            setTempData({
                ...tempData,
                [name]:value,
            })
        }

    }
    const fileRef = useRef(null);
    const uploadImg = async() => {
        try {
          const file = fileRef.current.files[0];
          const formData = new FormData();
          formData.append("imageUrl",file)
          const res = await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/upload`,
              formData);
          setTempData({
              ...tempData,
              imageUrl:res.data.imageUrl
          });
        } catch (error) {
          handleErrorMessage(dispatch, error)
        }
    }

    const handleRemove = () => {
      fileRef.current.value = "";
    }

    const submit = async()=>{
        try {
            let api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product`//將api路徑拉出來
            let method = "post";
            if(type==="edit"){
                api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${tempProduct.id}`;
                method = "put";
            }
            const res = await axios[method](api,{
                data:tempData
            });
            handleRemove();
            handleSuccessMessage(dispatch, res);
            closeProductModal();
            getProducts();
        } catch (error) {
          handleErrorMessage(dispatch, error)
        }
    }

    return(
        <div
      className="modal fade"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      id="productModal"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {type==="create"?"建立新商品":`編輯${tempData.title}`}
            </h1>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={closeProductModal}
            />
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-sm-4">
                <div className="form-group mb-2">
                <div className="text-center bg-light mb-2" style={{ height: "250px", width: "230px" }}>
                    {tempData.imageUrl !== "" && (
                        <img src={tempData.imageUrl} alt="商品圖片" style={{ height: "250px", width: "100%", objectFit: "cover" }} />
                    )}
                </div>
                  <label className="w-100" htmlFor="image">
                    輸入圖片網址
                    <input
                      type="text"
                      id="imageUrl"
                      placeholder="請輸入圖片連結"
                      className="form-control"
                      required="圖片連結為必填"
                      defaultValue={tempData.imageUrl}
                    />
                  </label>
                </div>
                <div className="form-group mb-2">
                  <label className="w-100" htmlFor="customFile">
                    或 上傳圖片
                    <input
                      type="file"
                      id="customFile"
                      className="form-control"
                      ref={fileRef}
                      onChange={uploadImg}
                    />
                  </label>
                </div>
                <img src="" alt="" className="img-fluid" />
              </div>
              <div className="col-sm-8">
                <div className="form-group mb-2">
                  <label className="w-100" htmlFor="title">
                    標題
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="請輸入標題"
                      className="form-control"
                      onChange={handleChange}
                      value={tempData.title}
                    />
                  </label>
                </div>
                <div className="row">
                  <div className="form-group mb-2 col-md-6">
                    <label className="w-100" htmlFor="category">
                      分類
                      <input
                        type="text"
                        id="category"
                        name="category"
                        placeholder="請輸入分類"
                        className="form-control"
                        onChange={handleChange}
                        value={tempData.category}
                      />
                    </label>
                  </div>
                  <div className="form-group mb-2 col-md-6">
                    <label className="w-100" htmlFor="unit">
                      單位
                      <input
                        type="unit"
                        id="unit"
                        name="unit"
                        placeholder="請輸入單位"
                        className="form-control"
                        onChange={handleChange}
                        value={tempData.unit}
                      />
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group mb-2 col-md-6">
                    <label className="w-100" htmlFor="origin_price">
                      原價
                      <input
                        type="number"
                        id="origin_price"
                        name="origin_price"
                        placeholder="請輸入原價"
                        className="form-control"
                        onChange={handleChange}
                        value={tempData.origin_price}
                      />
                    </label>
                  </div>
                  <div className="form-group mb-2 col-md-6">
                    <label className="w-100" htmlFor="price">
                      售價
                      <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="請輸入售價"
                        className="form-control"
                        onChange={handleChange}
                        value={tempData.price}
                      />
                    </label>
                  </div>
                </div>
                <hr />
                <div className="form-group mb-2">
                  <label className="w-100" htmlFor="description">
                    產品描述
                    <textarea
                      type="text"
                      id="description"
                      name="description"
                      placeholder="請輸入產品描述"
                      className="form-control"
                      onChange={handleChange}
                      value={tempData.description}
                    />
                  </label>
                </div>
                <div className="form-group mb-2">
                  <label className="w-100" htmlFor="content">
                    說明內容
                    <textarea
                      type="text"
                      id="content"
                      name="content"
                      placeholder="請輸入產品說明內容"
                      className="form-control"
                      onChange={handleChange}
                      value={tempData.content}
                    />
                  </label>
                </div>
                <div className="form-group mb-2">
                  <div className="form-check">
                    <label
                      className="w-100 form-check-label"
                      htmlFor="is_enabled"
                    >
                      是否啟用
                      <input
                        type="checkbox"
                        id="is_enabled"
                        name="is_enabled"
                        placeholder="請輸入產品說明內容"
                        className="form-check-input"
                        onChange={handleChange}
                        checked={!!tempData.is_enabled}//真值變假值boolean來判斷
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary"onClick={closeProductModal}>
              關閉
            </button>
            <button type="button" className="btn btn-primary" onClick={submit}>
              儲存
            </button>
          </div>
        </div>
      </div>
    </div>
    )
}
export default ProductModal;