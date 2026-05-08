import Banner from "./Banner";
import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import copy from "copy-to-clipboard";

const SERVICE_ITEMS = [
  {
    icon: "bi-scissors",
    title: "指甲修剪和修整",
    desc: "我們專業的美甲師會為您修剪和修整指甲，使其看起來整潔並符合您的需求。",
  },
  {
    icon: "bi-gem",
    title: "甲片設計",
    desc: "我們擅長各種甲片設計，從簡約到華麗，從日常到節日主題。",
  },
  {
    icon: "bi-brush",
    title: "指甲彩繪",
    desc: "精湛的手繪和印花技術，讓您的指甲變成小藝術品，展現個性和時尚感。",
  },
  {
    icon: "bi-bag-heart",
    title: "美甲材料及工具",
    desc: "提供販賣美甲材料及工具，讓您在家也能享受美甲樂趣。",
  },
];

const BOOKING_NOTES = [
  {
    icon: "bi-calendar-check",
    title: "提前預約",
    desc: "建議提前幾天或幾週預約，確保能夠得到你想要的時間點和服務。在預約時，確認清楚你想要的服務項目和價格。",
  },
  {
    icon: "bi-x-circle",
    title: "注意取消政策",
    desc: "了解美甲店的取消政策，包括取消預約是否有罰款或需提前多久通知。",
  },
  {
    icon: "bi-clock",
    title: "準時到達",
    desc: "預約時間到了，盡量準時到達，以免影響其他客人的順利服務。",
  },
];

const TESTIMONIALS = [
  {
    img: "https://storage.googleapis.com/vue-course-api.appspot.com/laimao/1720328351639.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=IpnRxVWZdxoPsrf990w9u8hcAWJsu7arOLMLj8l%2FCAnJGNL0dvVuY0Uptl%2FTfPfKE5zcVZ1hzvi3qfCLX5McvYNX%2F7qeO%2Ba7DjalGxR%2BvWBHwE7kUBONUOTwxRSzzXuy%2FNKpWFHDzNs71T0S%2Bt7WK%2FmpdY%2FxPKsfdFCWpJizzsZMCeTqTH7KwRoUkYcxtfn%2F4c9WJqlBfkMnxHezIk5tGWvTRAiMk1sHIlZIEY764PBQjai5TcwYC9Oc8LnHM2TRBZ7dZnMi8YkTJOqrZU1SEYcHNRYGmAAs7%2BCilgMzl8Mae8zXxVesgKFVrbFo2hG6BnmwAM7Zkjl%2BLVwAmXNoOw%3D%3D",
    name: "黃小姐",
    text: "非常喜歡！每次來這裡，我都感受到無與倫比的服務和細緻的手工藝。他們的設計師非常有耐心，會仔細聆聽我的需求並提供建議。店內的氛圍也非常舒適，讓我感覺放鬆愉悅。強力推薦！",
  },
  {
    img: "https://storage.googleapis.com/vue-course-api.appspot.com/laimao/1720328424757.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=niJSdnGOzzMl5TDhJHfDuYcSPa6d7%2BPIp6BMmRNh4Qj3QPVuyZ22qPNdDPGfOZQA1SgkXd%2BmtwHcx%2FWV1graS5CkhQ81T79osA2el1qEpTcQlGapzB9F15d3dtodirZ77CSicBzZPHXaKuI6%2Bl2Sbfox2mOJRK95nnq%2FShwJgmRPm0Kyp%2BAzQVjGQ86%2FgiBGwdWFhNIamQiBaI9wTvcQeGRkUbe%2Br0cCsil8Uqf7T4dWR7wjfOGR%2Fx6U61npT3Q1xMjk%2FbThebepjI9RdvX8pKPyM%2BgV0E9JIbW4Xy08dlNhU8JII%2F0MShVtKqCQEFF6Uuxihg4%2FdEOnASn1Y8m%2BGw%3D%3D",
    name: "賴小姐",
    text: "他們的產品選擇非常多樣化，每次都能找到一款令人驚艷的設計。技術非常專業，能夠實現我所有的美甲夢想。我在這裡度過的每一次都是一個完美的美甲體驗！",
  },
  {
    img: "https://storage.googleapis.com/vue-course-api.appspot.com/laimao/1720328578881.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=m%2Bof9UcMJZi1bnSkXZBze43l32qsZ7zOOhZR%2FEPL3TDqG8R4a2BRQpjj6d%2BUiKxDBD3fzH",
    name: "陳小姐",
    text: "他們不僅重視美甲的美觀，更注重使用環保和天然成分的產品。這裡的空氣清新，給人一種身心放鬆的感覺。每次來都像是小小的度假！",
  },
];

function Home() {
  const copyRef = useRef(null);
  const [isCopy, setIsCopy] = useState(false);

  useEffect(() => {
    AOS.init({ once: true, duration: 700 });
  }, []);

  const handleCopy = () => {
    copy(copyRef.current.innerText);
    setIsCopy(true);
    setTimeout(() => setIsCopy(false), 2000);
  };

  return (
    <>
      {/* Hero Banner */}
      <Banner />

      {/* About Section */}
      <section className="py-7" style={{ background: "var(--jie-section-bg)" }}>
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="fw-bold section-heading">關於 Jie&apos;s Studio</h2>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-6 text-center" data-aos="fade-up" data-aos-delay="100">
              <p className="text-muted lh-lg" style={{ fontSize: "1.05rem" }}>
                歡迎來到我們的美甲世界！我們是一支充滿熱情和專業的美甲團隊，致力於為每位顧客帶來最高水準的美甲服務和體驗。我們的理念是通過精湛的技術和創意，讓每一位客人都可以享受到舒適和放鬆的美甲時光。
              </p>
              <p className="mt-3 text-muted">
                <small>— 請讓 Jie's Studio 為您服務 —</small>
                <br />
                <span className="fw-bold" style={{ color: "var(--jie-rose)" }}>
                  Line ID：Jiestudio
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-7">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-md-6" data-aos="fade-right">
              <img
                src="https://storage.googleapis.com/vue-course-api.appspot.com/laimao/1720153584404.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=BjYlFi7p4lfIJtPcyQBKNfaJ%2BFMDySUBOGkmqAaNXsxOUqFImAzXRok6VKNWkqGYrnJtotlQz7vcdpEkurZoKdep4%2Fxx1%2FCic%2BSo8poeTkAXOWYzEf3En%2B%2FkOBvg3ceXJS1wAGhjMTQujWZC%2BAYHGqBCyBUpyEwrbccpkacCps9QGUFWOdTDbZF6MRr2vNBBWiRQrFSJybtgw1TqwnEG9qaTqMLkUR8ual1sB5roRYSfsytgUQX8LOKW5mSwHTYv%2FbH2kdWHmUQbIjDZ%2Fvw9HDy4i8xMjb2Ph%2F5uF6EieN%2BSjnq6EWF%2FYhfTehjRFhcvET1vjLAjHxdmZ3yFDkxuzg%3D%3D"
                alt="服務項目圖片"
                className="img-fluid rounded-2 shadow-sm"
              />
            </div>
            <div className="col-md-6" data-aos="fade-left">
              <h2 className="fw-bold mb-4">服務項目</h2>
              <div className="row g-3">
                {SERVICE_ITEMS.map((item) => (
                  <div className="col-sm-6" key={item.title}>
                    <div className="p-3 rounded-2 h-100" style={{ background: "var(--jie-blush)" }}>
                      <i
                        className={`bi ${item.icon} fs-4 mb-2 d-block`}
                        style={{ color: "var(--jie-rose)" }}
                      />
                      <h6 className="fw-bold mb-1">{item.title}</h6>
                      <p className="text-muted mb-0" style={{ fontSize: "0.875rem" }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Notes Section */}
      <section className="py-7" style={{ background: "var(--jie-section-bg)" }}>
        <div className="container">
          <div className="row align-items-center g-5 flex-md-row-reverse">
            <div className="col-md-6" data-aos="fade-left">
              <img
                src="https://storage.googleapis.com/vue-course-api.appspot.com/laimao/1720330816746.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=DzTeTMOA%2BAewSaZ7hDq%2Beq7rfnpdew015rY79jSGu5cHIWZrwES3rbcz7l575D1ZLkpuzX7Bl7U%2FdbHHkg6zBmaQMBshjRJ8qDpUZ8T9aDe6Ev4vKLVlzOH3FeRbsfqPgXaGq%2BVa1%2F0FrPBjKV6noXhWCLB2GwJya5yyzyD4YQrMrGHWzag4AfkHWWjFgErMKzk0Qol47ABpGo2CeyZBZTKZbi89hKCOuCWQ3KRBldBtsjHjmTd6YcZ5ioZ7Y2cPKWx0Gc%2FGsyNeYdT71GyObrz7dEkRTW5NAnWZHyzlWuUWcj1AHEyOcl5xg3PREGdhszBxuGwsQhE0B%2FMWpB%2BEPA%3D%3D"
                alt="預約注意事項圖片"
                className="img-fluid rounded-2 shadow-sm"
              />
            </div>
            <div className="col-md-6" data-aos="fade-right">
              <h2 className="fw-bold mb-4">預約注意事項</h2>
              <div className="d-flex flex-column gap-3">
                {BOOKING_NOTES.map((note) => (
                  <div className="d-flex gap-3 align-items-start" key={note.title}>
                    <div
                      className="flex-shrink-0 d-flex align-items-center justify-content-center rounded-circle"
                      style={{
                        width: 44,
                        height: 44,
                        background: "var(--jie-blush)",
                        color: "var(--jie-rose)",
                        fontSize: "1.2rem",
                      }}
                    >
                      <i className={`bi ${note.icon}`} />
                    </div>
                    <div>
                      <h6 className="fw-bold mb-1">{note.title}</h6>
                      <p className="text-muted mb-0" style={{ fontSize: "0.875rem" }}>
                        {note.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-7">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="fw-bold section-heading">顧客推薦</h2>
          </div>
          <div className="row g-4">
            {TESTIMONIALS.map((t, i) => (
              <div className="col-md-4" key={t.name} data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="card testimonial-card h-100 shadow-sm">
                  <img
                    src={t.img}
                    className="card-img-top object-cover"
                    alt={`${t.name}推薦圖片`}
                    height={220}
                  />
                  <div className="card-body text-center px-4 pt-3 pb-4">
                    <div className="quote-mark">&ldquo;</div>
                    <p className="card-text text-muted mb-3" style={{ fontSize: "0.9rem" }}>
                      {t.text}
                    </p>
                    <h5 className="fw-bold mb-0" style={{ color: "var(--jie-deep-rose)" }}>
                      {t.name}
                    </h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coupon Section */}
      <section className="coupon-section py-7">
        <div className="container">
          <div className="text-center" data-aos="zoom-in">
            <p
              className="fw-semibold mb-2"
              style={{ color: "var(--jie-rose)", letterSpacing: "0.1em", fontSize: "0.85rem", textTransform: "uppercase" }}
            >
              限時優惠
            </p>
            <h2 className="fw-bold mb-3">開幕大優惠</h2>
            <p className="text-muted mb-4">複製以下優惠碼，即可享有半價優惠</p>
            <div className="coupon-code mb-4" ref={copyRef}>
              happyOpenDay
            </div>
            <br />
            <button
              type="button"
              className="btn btn-dark rounded-1 px-5 py-2 mt-3 fw-semibold"
              onClick={handleCopy}
            >
              <i className={`bi ${isCopy ? "bi-check2" : "bi-clipboard"} me-2`} />
              {isCopy ? "複製完成！" : "複製優惠碼"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
