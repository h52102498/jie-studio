import { useState,useEffect } from "react";
import axios from "axios";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";



function Products(){
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [categories, setCategories] = useState([])
  const [currentCategory, setCurrentCategory] = useState('所有商品')
  const [isLoading, setIsLoading] = useState(false)

  const getCategories = async () => {
    setIsLoading(true);
    const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products/all`);
    const productsAll = res.data.products;
    let categoryList = ['所有商品'];
    productsAll.forEach(item => {
        if (!categoryList.includes(item.category)) {
            categoryList.push(item.category)
            setCategories(categoryList)
        }
    });
    await getProducts();
}

    const getProducts=async(page=1)=>{
      try {
        setIsLoading(true);
        if (currentCategory !== '所有商品') {
            const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products/all`);
            const filterProducts = res.data.products.filter(item => item.category === currentCategory);
            //分頁功能
            const pageItem = 10;
            const totalPage = Math.ceil(filterProducts.length / pageItem);
            const start = (page - 1) * pageItem;
            const end = page * pageItem;
            setProducts(filterProducts.slice(start, end));
            setPagination({
                category: '',
                current_page: page,
                has_pre: page !== 1,
                has_next: page < totalPage,
                total_pages: totalPage
            });
        } else {
            const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}`)
            setProducts(productRes.data.products)
            setPagination(productRes.data.pagination)
        }
        setIsLoading(false);
    } catch (error) {
        setIsLoading(false);
    }
  }
      
      const thousandthsFormat = (value) => {
        value = parseInt(value)
        if(isNaN(value)) return
        return value.toLocaleString()
      }

      useEffect(() => {
        getCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentCategory]);

    return(
    <><div className="mt-7">
      <div className="banner bg-dark py-4 position-relative">
            <div className="banner-content text-white text-center">
                <h2>產品列表</h2>
            </div>
        </div>
        <div className="container mt-md-5 my-7">
        <Loading isLoading={isLoading} />
      <div className="row">
        <div className="col-md-4">
        <h4 className="d-none d-lg-block fw-bold bg-light p-lg-3  border-dark border-5">產品類型</h4>
        <ul className="mt-3 px-2 d-flex d-lg-block justify-content-between" style={{flexFlow: 'row wrap'}}>
            {categories.map((category, i) => {
                return (
                    <li className={`list-item list-unstyled fw-bold mb-3 p-2 ${currentCategory === category ? 'text-white bg-dark' : ''}`} 
                    key={i} onClick={() => setCurrentCategory(category)}
                    >
                        {category}
                    </li>
                )
            })}

        </ul>
          {/* <div className="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3" id="accordionExample">
            <div className="card border-0">
              <div className="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0" id="headingOne" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                <div className="d-flex justify-content-between align-items-center pe-1">
                  <h4 className="mb-0">
                    產品類型
                  </h4>
                  <i className="fas fa-chevron-down"></i>
                </div>
              </div>
              <div id="collapseOne" className="" data-bs-parent="#accordionExample">
                <div className="card-body py-0">
                  <ul className="list-unstyled">
                    {categories.map((category, i) => {
                        return(
                          <li className={`py-2 d-block text-muted ${currentCategory === category ? 'text-white bg-primary' : ''}`} key={i} onClick={() => setCurrentCategory(category)}>{category}</li>
                        )
                    })}
                    
                  </ul>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <div className="col-md-8">
          <div className="row">
            {products.map((product)=>{
                return(<div className="col-md-6" key={product.id}>
                    <div className="card border-0 mb-4 position-relative position-relative">
                      <img src={product.imageUrl} className="card-img-top rounded-0 object-cover" height={200} alt="商品圖片"/>
                      <div className="card-body p-0">
                        <h4 className="mb-0 my-3 ">
                            <Link className="text-dark stretched-link text-decoration-none fw-bold" to={`/product/${product.id}`}>{product.title}</Link>
                        </h4>
                        <p className="card-text mb-1">NT$ {thousandthsFormat(product.price)}<span className="text-muted ms-3"><del>NT$ {thousandthsFormat(product.origin_price)}</del></span></p>
                        <p className="text-muted mt-3">{product.description}</p>
                      </div>
                    </div>
                  </div>)
            })}
            
          </div>
          <nav className="d-flex justify-content-center">
            <Pagination pagination={pagination} changePage={getProducts}  />
          </nav>
        </div>
      </div>
    </div>
    </div>
    </>)
}


export default Products;