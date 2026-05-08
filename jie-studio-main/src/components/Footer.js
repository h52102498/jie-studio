import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <div className="container">
        <div className="row g-4 mb-4">
          {/* Brand */}
          <div className="col-md-4">
            <h5 className="fw-bold mb-3" style={{ color: "var(--jie-rose)" }}>
              Jie&apos;s Studio
            </h5>
            <p className="text-white-50 mb-3" style={{ fontSize: "0.875rem", lineHeight: 1.7 }}>
              專業美甲工作室，致力於為每位顧客帶來最高水準的美甲服務和體驗。
            </p>
            <div className="footer-social d-flex gap-2">
              <a href="#facebook" className="text-white" aria-label="Facebook">
                <i className="bi bi-facebook" />
              </a>
              <a href="#instagram" className="text-white" aria-label="Instagram">
                <i className="bi bi-instagram" />
              </a>
              <a href="#line" className="text-white" aria-label="Line">
                <i className="bi bi-chat-dots" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-3 offset-md-1">
            <h6 className="fw-bold mb-3 text-white-50 text-uppercase" style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>
              快速連結
            </h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <NavLink to="/" className="text-white-50 text-decoration-none footer-link" style={{ fontSize: "0.875rem" }}>
                  首頁
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink to="/products" className="text-white-50 text-decoration-none footer-link" style={{ fontSize: "0.875rem" }}>
                  產品列表
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink to="/faqs" className="text-white-50 text-decoration-none footer-link" style={{ fontSize: "0.875rem" }}>
                  常見問題
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-4">
            <h6 className="fw-bold mb-3 text-white-50 text-uppercase" style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>
              聯絡我們
            </h6>
            <ul className="list-unstyled mb-0" style={{ fontSize: "0.875rem" }}>
              <li className="mb-2 text-white-50">
                <i className="bi bi-telephone-fill me-2" style={{ color: "var(--jie-rose)" }} />
                02-1234-5678
              </li>
              <li className="mb-2 text-white-50">
                <i className="bi bi-envelope-fill me-2" style={{ color: "var(--jie-rose)" }} />
                service@mail.com
              </li>
              <li className="mb-2 text-white-50">
                <i className="bi bi-chat-dots-fill me-2" style={{ color: "var(--jie-rose)" }} />
                Line ID：Jiestudio
              </li>
              <li className="text-white-50">
                <i className="bi bi-geo-alt-fill me-2" style={{ color: "var(--jie-rose)" }} />
                110 台北市信義區忠孝東路五段8號
              </li>
            </ul>
          </div>
        </div>

        <hr style={{ borderColor: "rgba(255,255,255,0.1)" }} />
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="mb-md-0 mb-2 text-white-50" style={{ fontSize: "0.8rem" }}>
            © 2024 Jie&apos;s Studio. 本網頁僅供練習使用。
          </p>
          <p className="mb-0 text-white-50" style={{ fontSize: "0.8rem" }}>
            Made with <i className="bi bi-heart-fill" style={{ color: "var(--jie-rose)" }} /> in Taiwan
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
