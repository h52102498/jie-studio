import { Link } from "react-router-dom";

function Banner() {
  return (
    <div
      className="banner position-relative d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        backgroundImage:
          'url("https://storage.googleapis.com/vue-course-api.appspot.com/laimao/1720342354859.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Vc4DnWv2keZ8FB31fAM89s3JnbGCvQ2sT7OBt7VfFaJedSDHbqZzGm5bxfNKpLa2u9sMWZN5YCiCf3w8Y%2BDN4ky8Hg3T%2FQmbkP")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ background: "rgba(255,255,255,0.45)" }}
      />
      <div className="banner-content position-relative text-center px-4">
        <p
          className="fw-semibold mb-3"
          style={{
            color: "var(--jie-rose)",
            letterSpacing: "0.15em",
            fontSize: "0.85rem",
            textTransform: "uppercase",
          }}
        >
          Jie&apos;s Studio &mdash; 專業美甲工作室
        </p>
        <h1 className="banner-title fw-bold text-dark mb-4">
          每一次彩繪<br className="d-sm-none" />
          都是自我表達的開始
        </h1>
        <Link
          className="btn btn-dark banner-btn text-white text-decoration-none d-inline-block"
          to="/products"
        >
          <i className="bi bi-stars me-2"></i>探索商品
        </Link>
      </div>
    </div>
  );
}

export default Banner;
