import { NavLink } from "react-router-dom";

function Navbar({cartData}){

    return(
        <div className="bg-white position-fixed fixed-top ">
          <div className="container ">
            <nav className="navbar navbar-expand-lg navbar-light">
              <NavLink className="navbar-brand" to="/">Jie's studio</NavLink>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <NavLink className="nav-item nav-link me-4 active" to="/products">產品列表</NavLink>
                    <NavLink className="nav-item nav-link me-4" to="/faqs">常見問題</NavLink>
                    <NavLink className="nav-item nav-link me-4 position-relative" to="/cart">
                      <i className="bi bi-cart4"></i>
                      {cartData?.carts?.length !== 0 && (
                        <span className="position-absolute top-10 start-100 translate-middle badge rounded-pill bg-danger">
                          {cartData?.carts?.length}
                        </span>
                      )}
                    </NavLink>
                </div>
              </div>
            </nav>
      </div>
    </div>
        )
}

export default Navbar;