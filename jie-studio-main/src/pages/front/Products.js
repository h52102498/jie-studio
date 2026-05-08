import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";

function Products() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("所有商品");
  const [isLoading, setIsLoading] = useState(false);

  const thousandthsFormat = (value) => {
    value = parseInt(value);
    if (isNaN(value)) return "";
    return value.toLocaleString();
  };

  const getProducts = async (page = 1) => {
    try {
      setIsLoading(true);
      if (currentCategory !== "所有商品") {
        const res = await axios.get(
          `/v2/api/${process.env.REACT_APP_API_PATH}/products/all`
        );
        const filtered = res.data.products.filter(
          (item) => item.category === currentCategory
        );
        const pageSize = 10;
        const totalPages = Math.ceil(filtered.length / pageSize);
        setProducts(filtered.slice((page - 1) * pageSize, page * pageSize));
        setPagination({
          category: "",
          current_page: page,
          has_pre: page !== 1,
          has_next: page < totalPages,
          total_pages: totalPages,
        });
      } else {
        const res = await axios.get(
          `/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}`
        );
        setProducts(res.data.products);
        setPagination(res.data.pagination);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const getCategories = async () => {
    setIsLoading(true);
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/products/all`
    );
    const all = res.data.products;
    const seen = new Set();
    const list = ["所有商品"];
    all.forEach((item) => {
      if (!seen.has(item.category)) {
        seen.add(item.category);
        list.push(item.category);
      }
    });
    setCategories(list);
    await getProducts();
  };

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCategory]);

  return (
    <>
      {/* Sub Banner */}
      <div className="sub-banner mt-7">
        <div className="container text-center">
          <h2 className="text-white mb-0">產品列表</h2>
          <div className="sub-banner-underline" />
        </div>
      </div>

      <div className="container mt-5 mb-7">
        <Loading isLoading={isLoading} />
        <div className="row">
          {/* Category Sidebar */}
          <div className="col-lg-3 mb-4 mb-lg-0">
            <p className="category-label fw-bold mb-3 d-none d-lg-block">產品類型</p>
            <div className="category-filter d-flex d-lg-block flex-wrap gap-2">
              {categories.map((category, i) => (
                <button
                  type="button"
                  className={`category-item d-block w-100 text-start mb-2 ${
                    currentCategory === category ? "active-category" : ""
                  } d-none d-lg-block`}
                  key={i}
                  onClick={() => setCurrentCategory(category)}
                >
                  {category}
                </button>
              ))}
              {/* Mobile: pill layout */}
              {categories.map((category, i) => (
                <button
                  type="button"
                  className={`category-item d-lg-none ${
                    currentCategory === category ? "active-category" : ""
                  }`}
                  key={`m-${i}`}
                  onClick={() => setCurrentCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="col-lg-9">
            <div className="row g-4">
              {products.map((product) => (
                <div className="col-sm-6 col-xl-4" key={product.id}>
                  <div className="card product-card border-0 h-100">
                    <div style={{ overflow: "hidden" }}>
                      <img
                        src={product.imageUrl}
                        className="card-img-top object-cover"
                        height={210}
                        alt={product.title}
                      />
                    </div>
                    <div className="card-body px-1 pt-3 pb-0">
                      <h5 className="mb-1">
                        <Link
                          className="text-dark stretched-link text-decoration-none fw-bold"
                          to={`/product/${product.id}`}
                        >
                          {product.title}
                        </Link>
                      </h5>
                      <p className="mb-1" style={{ fontSize: "0.9rem" }}>
                        <span className="fw-bold">NT$ {thousandthsFormat(product.price)}</span>
                        <span className="text-muted ms-2">
                          <del style={{ fontSize: "0.8rem" }}>
                            NT$ {thousandthsFormat(product.origin_price)}
                          </del>
                        </span>
                      </p>
                      <p className="text-muted mb-2" style={{ fontSize: "0.8rem" }}>
                        {product.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <nav className="d-flex justify-content-center mt-5">
              <Pagination pagination={pagination} changePage={getProducts} />
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
