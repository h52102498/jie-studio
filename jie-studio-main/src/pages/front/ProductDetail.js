import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../components/Loading";
import { useOutletContext, useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createAsyncMessage } from "../../slice/messageSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";

const SWIPER_BREAKPOINTS = {
  0:   { slidesPerView: 1 },
  576: { slidesPerView: 2 },
  768: { slidesPerView: 3 },
  992: { slidesPerView: 4 },
  1200:{ slidesPerView: 5 },
};

function ProductDetail() {
  const [product, setProduct] = useState({});
  const [otherProducts, setOtherProducts] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(1);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { getCart } = useOutletContext();
  const dispatch = useDispatch();

  const thousandthsFormat = (value) => {
    value = parseInt(value);
    if (isNaN(value)) return "";
    return value.toLocaleString();
  };

  const getProduct = async (productId) => {
    setIsLoading(true);
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/product/${productId}`
    );
    setProduct(res.data.product);
    setIsLoading(false);
  };

  const getOtherProducts = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/products`
      );
      setOtherProducts(res.data.products);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProduct(id);
  }, [id]);

  useEffect(() => {
    getOtherProducts();
  }, []);

  const addToCart = async () => {
    const data = {
      data: { product_id: product.id, qty: cartQuantity },
    };
    setIsLoading(true);
    try {
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart`,
        data
      );
      dispatch(createAsyncMessage(res.data));
      getCart();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      dispatch(createAsyncMessage(error.response.data));
    }
  };

  return (
    <div className="container full-height mt-7 py-5">
      <Loading isLoading={isLoading} />

      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb bg-white px-0 mb-4">
          <li className="breadcrumb-item">
            <Link className="text-muted text-decoration-none" to="/">首頁</Link>
          </li>
          <li className="breadcrumb-item">
            <Link className="text-muted text-decoration-none" to="/products">產品列表</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.title || "商品詳情"}
          </li>
        </ol>
      </nav>

      {/* Main Product Row */}
      <div className="row align-items-start g-5">
        <div className="col-md-7">
          <div className="rounded-2 overflow-hidden">
            <img
              src={product.imageUrl}
              className="d-block w-100 img-fluid"
              alt={product.title}
              style={{ objectFit: "cover", maxHeight: "500px" }}
            />
          </div>
        </div>

        <div className="col-md-5">
          <span
            className="badge rounded-pill mb-3"
            style={{ background: "var(--jie-blush)", color: "var(--jie-rose)", fontSize: "0.8rem" }}
          >
            {product.category}
          </span>
          <h2 className="fw-bold mb-1">{product.title}</h2>
          <p className="text-muted mb-0">
            <del>NT$ {thousandthsFormat(product.origin_price)}</del>
          </p>
          <p className="h3 fw-bold mb-4" style={{ color: "var(--jie-deep-rose)" }}>
            NT$ {thousandthsFormat(product.price)}
          </p>
          <p className="text-muted mb-4" style={{ fontSize: "0.95rem", lineHeight: 1.7 }}>
            {product.description}
          </p>
          {product.content && (
            <p className="text-muted mb-4" style={{ fontSize: "0.875rem" }}>{product.content}</p>
          )}

          {/* Quantity + Add to Cart */}
          <div className="row align-items-center g-3">
            <div className="col-auto">
              <div className="input-group bg-light rounded-1">
                <button
                  className="btn btn-outline-secondary border-0 px-3"
                  type="button"
                  onClick={() => setCartQuantity((q) => Math.max(1, q - 1))}
                  disabled={cartQuantity === 1}
                >
                  <i className="bi bi-dash" />
                </button>
                <input
                  type="number"
                  className="form-control border-0 text-center bg-light shadow-none"
                  style={{ width: "50px", minWidth: "50px" }}
                  value={cartQuantity}
                  readOnly
                />
                <button
                  className="btn btn-outline-secondary border-0 px-3"
                  type="button"
                  onClick={() => setCartQuantity((q) => q + 1)}
                >
                  <i className="bi bi-plus" />
                </button>
              </div>
            </div>
            <div className="col">
              <button
                type="button"
                className="btn btn-dark w-100 py-2 fw-semibold"
                onClick={addToCart}
                disabled={isLoading}
              >
                <i className="bi bi-cart-plus me-2" />
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Other Products */}
      {otherProducts.length > 0 && (
        <div className="mt-6">
          <h4 className="fw-bold mb-4">其他商品</h4>
          <Swiper
            loop={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            modules={[Autoplay]}
            spaceBetween={16}
            breakpoints={SWIPER_BREAKPOINTS}
          >
            {otherProducts.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="card product-card border-0">
                  <div style={{ overflow: "hidden" }}>
                    <img
                      src={item.imageUrl}
                      className="card-img-top object-cover"
                      height={180}
                      alt={item.title}
                    />
                  </div>
                  <div className="card-body p-2 text-center">
                    <h6 className="mb-1 fw-bold" style={{ fontSize: "0.875rem" }}>{item.title}</h6>
                    <p className="mb-1" style={{ fontSize: "0.8rem" }}>
                      NT$ {thousandthsFormat(item.price)}
                      <span className="text-muted ms-1">
                        <del>NT$ {thousandthsFormat(item.origin_price)}</del>
                      </span>
                    </p>
                    <Link
                      className="text-dark text-decoration-none stretched-link"
                      to={`/product/${item.id}`}
                      style={{ fontSize: "0.8rem" }}
                    >
                      查看商品
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
