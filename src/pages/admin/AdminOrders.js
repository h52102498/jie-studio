import { useEffect, useRef, useState,useContext } from "react";
import axios from "axios";
import OrderModal from "../../components/OrderModal";
import DeleteModal from "../../components/DeleteModal";
import Pagination from "../../components/Pagination";
import { MessageContext, handleErrorMessage} from "../../store/messageStore";
import { Modal } from "bootstrap";
import Loading from "../../components/Loading";


function AdminOrders(){
    const [orders, setOrders] = useState([]);
    const [pagination, setPagination] = useState({});
    // type: 決定 modal 展開的用途
    //const [type, setType] = useState("create"); // edit
    const [tempOrder, setTempOrder] = useState({});
    const [, dispatch] = useContext(MessageContext);
    const [isLoading, setIsLoading] = useState(false);


    const orderModal = useRef(null);
    const deleteModal = useRef(null);
    useEffect(() => {
        orderModal.current = new Modal("#orderModal", {
          backdrop: "static",
        });
        deleteModal.current = new Modal("#deleteModal", {
            backdrop: "static"
        });
    
        getOrders();
      }, []);

      const getOrders = async (page = 1) => {
        setIsLoading(true);
        const res = await axios.get(
          `/v2/api/${process.env.REACT_APP_API_PATH}/admin/orders?page=${page}`,
        );
        console.log(res)
        setOrders(res.data.orders);
        setPagination(res.data.pagination);
        setIsLoading(false);
      }

      const deleteOrder = async(id)=>{
        try {
          setIsLoading(true);
            const res = await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/order/${id}`);
            if (res.data.success) {
                getOrders();
                deleteModal.current.hide();
            }
            setIsLoading(false);
        } catch (error) {
            handleErrorMessage(dispatch, error);
            setIsLoading(false);
        }
      }

      const openOrderModal = (order) => {
        setTempOrder(order);
        orderModal.current.show();
      }
      const closeOrderModal = () => {
        setTempOrder({});
        orderModal.current.hide();
      }

      const openDeleteModal=(product)=>{
        setTempOrder(product);
        deleteModal.current.show();
      }

      const closeDeleteModal=()=>{
        deleteModal.current.hide();
      }

      const thousandthsFormat = (value) => {
        value = parseInt(value)
        if(isNaN(value)) return
        return value.toLocaleString()
      }

    return(
        <div className="p-3">
          <Loading isLoading={isLoading} />
      <OrderModal
        closeProductModal={closeOrderModal}
        getOrders={getOrders}
        tempOrder={tempOrder}
      />
      <DeleteModal close={closeDeleteModal} text={tempOrder.title}
            handleDelete={deleteOrder}
            id={tempOrder.id}
        />
      <h3>訂單列表</h3>
      <hr />
      <table className="table text-center">
        <thead>
          <tr>
            <th scope="col">訂購日期</th>
            <th scope="col">訂單 id</th>
            <th scope="col">購買用戶</th>
            <th scope="col">訂單金額</th>
            <th scope="col">付款狀態</th>
            <th scope="col">編輯</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            return (
              <tr key={order.id}>
                <td>{new Date(order.create_at*1000).toLocaleString()}</td>
                <td>{order.id}</td>
                <td>
                  {order.user?.name}
                  {order.user?.email}
                </td>
                <td>${thousandthsFormat(order.total)}</td>
                <td>
                  {order.is_paid ? (
                    <span className="text-success fw-bold">付款完成</span>
                  ) : (
                    "未付款"
                  )}
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      openOrderModal(order);
                    }}
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm ms-2"
                    onClick={()=>openDeleteModal(order)}
                    >
                    刪除
                    </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination pagination={pagination} changePage={getOrders} />
    </div>
    );
}

export default AdminOrders;