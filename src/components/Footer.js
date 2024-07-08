function Footer(){
    return(<>
      <div className="bg-dark py-5">
        <div className="container">
          {/* <div className="d-flex align-items-center justify-content-between text-white mb-md-7 mb-4">
            <a className="text-white h4" href="./index.html">LOGO</a>
            <ul className="d-flex list-unstyled mb-0 h4">
              <li><a href="#" className="text-white mx-3"><i className="fab fa-facebook"></i></a></li>
              <li><a href="#" className="text-white mx-3"><i className="fab fa-instagram"></i></a></li>
              <li><a href="#" className="text-white ms-3"><i className="fab fa-line"></i></a></li>
            </ul>
          </div> */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end align-items-start text-white">
            <div className="mb-md-0 mb-1">
              <p className="mb-0"><i className="bi bi-telephone-fill me-2"></i>02-1234-5678</p>
              <p className="mb-0"><i className="bi bi-envelope-fill me-2"></i>service@mail.com</p>
              <p className="mb-0"><i className="bi bi-envelope-fill me-2"></i>110台北市信義區忠孝東路五段8號</p>
            </div>
            <p className="mb-0">© 2024 本網頁僅供練習使用</p>
          </div>
        </div>
      </div></>
    )
}

export default Footer;