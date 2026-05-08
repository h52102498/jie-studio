import { NavLink } from "react-router-dom";

function Navbar({ cartData }) {
  const cartCount = cartData?.carts?.length ?? 0;

  return (
    <div className="bg-white position-fixed fixed-top navbar-wrapper">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light">
          <NavLink className="navbar-brand" to="/">
            Jie&apos;s Studio
          </NavLink>
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
            aria-controls="mainNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="mainNav">
            <div className="navbar-nav align-items-lg-center">
              <NavLink className="nav-item nav-link me-4" to="/products">
                產品列表
              </NavLink>
              <NavLink className="nav-item nav-link me-4" to="/faqs">
                常見問題
              </NavLink>
              <NavLink className="nav-item nav-link me-lg-0 position-relative" to="/cart">
                <i className="bi bi-cart4 fs-5" />
                {cartCount > 0 && (
                  <span
                    className="position-absolute translate-middle badge rounded-pill bg-danger"
                    style={{ top: "6px", left: "calc(100% - 4px)", fontSize: "0.65rem" }}
                  >
                    {cartCount}
                  </span>
                )}
              </NavLink>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
