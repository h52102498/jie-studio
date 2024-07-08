import Banner from "./Banner";
import { useEffect, useRef, useState } from "react";
import Loading from "../../components/Loading";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import copy from 'copy-to-clipboard';

function Home(){
    const [isLoading] = useState(false)
    const copyRef = useRef(null);
    const [isCopy, setIsCopy] = useState(false)

    useEffect(()=>{
      AOS.init();
    })
    return(<>
    <div>
      <Banner></Banner>
      <div className="bg-light mt-7">
        <div className="container">
        <Loading isLoading={isLoading} />
          <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="row justify-content-center py-7">
                  <div className="col-md-6 text-center">
                    <h3 className="fw-bold">關於Jie's studio及服務項目</h3>
                    <p className="my-5">“歡迎來到我們的美甲世界！我們是一支充滿熱情和專業的美甲團隊，致力於為每位顧客帶來最高水準的美甲服務和體驗。
我們的理念是通過精湛的技術和創意，讓每一位客人都可以享受到舒適和放鬆的美甲時光”</p>
                    <p><small>— 請讓Jie's studio為您服務 —<br/> Line ID：<span className="fw-bold">Jiestudio</span> </small></p>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
      <div className="container	 my-7">
        <div className="row" >
          <div className="col-md-6" data-aos="fade-right"> 
            <img src="https://storage.googleapis.com/vue-course-api.appspot.com/laimao/1720153584404.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=BjYlFi7p4lfIJtPcyQBKNfaJ%2BFMDySUBOGkmqAaNXsxOUqFImAzXRok6VKNWkqGYrnJtotlQz7vcdpEkurZoKdep4%2Fxx1%2FCic%2BSo8poeTkAXOWYzEf3En%2B%2FkOBvg3ceXJS1wAGhjMTQujWZC%2BAYHGqBCyBUpyEwrbccpkacCps9QGUFWOdTDbZF6MRr2vNBBWiRQrFSJybtgw1TqwnEG9qaTqMLkUR8ual1sB5roRYSfsytgUQX8LOKW5mSwHTYv%2FbH2kdWHmUQbIjDZ%2Fvw9HDy4i8xMjb2Ph%2F5uF6EieN%2BSjnq6EWF%2FYhfTehjRFhcvET1vjLAjHxdmZ3yFDkxuzg%3D%3D" alt="服務項目圖片" className="img-fluid" />
          </div>
          <div className="col-md-4 m-auto text-center">
            <h4 className="mt-4 text-center fw-bold">服務項目</h4>
            <div className="text-start">
              <h6 className="fw-bold">指甲修剪和修整</h6>
              <p>我們專業的美甲師會為您修剪和修整指甲，使其看起來整潔並符合您的需求。</p>
              <h6 className="fw-bold">甲片設計</h6>
              <p>我們擅長各種甲片設計，從簡約到華麗，從日常到節日主題。</p>
              <h6 className="fw-bold">指甲彩繪</h6>
              <p>精湛的手繪和印花技術，讓您的指甲變成小藝術品，展現個性和時尚感。</p>
              <h6 className="fw-bold">美甲材料及工具</h6>
              <p>提供販賣美甲材料及工具。</p>
            </div>
            
          </div>
        </div>
        <div className="row flex-row-reverse justify-content-between mt-4">
          <div className="col-md-6" data-aos="fade-down">
            <img src="https://storage.googleapis.com/vue-course-api.appspot.com/laimao/1720330816746.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=DzTeTMOA%2BAewSaZ7hDq%2Beq7rfnpdew015rY79jSGu5cHIWZrwES3rbcz7l575D1ZLkpuzX7Bl7U%2FdbHHkg6zBmaQMBshjRJ8qDpUZ8T9aDe6Ev4vKLVlzOH3FeRbsfqPgXaGq%2BVa1%2F0FrPBjKV6noXhWCLB2GwJya5yyzyD4YQrMrGHWzag4AfkHWWjFgErMKzk0Qol47ABpGo2CeyZBZTKZbi89hKCOuCWQ3KRBldBtsjHjmTd6YcZ5ioZ7Y2cPKWx0Gc%2FGsyNeYdT71GyObrz7dEkRTW5NAnWZHyzlWuUWcj1AHEyOcl5xg3PREGdhszBxuGwsQhE0B%2FMWpB%2BEPA%3D%3D" alt="預約注意事項圖片" className="img-fluid"/>
          </div>
          <div className="col-md-4 m-auto text-center">
            <h4 className="mt-4 fw-bold">預約注意事項</h4>
            <div className="text-start">
            <h6 className="fw-bold">提前預約</h6>
            <p>建議提前幾天或幾週預約，確保能夠得到你想要的時間點和服務。</p>
            <p>在預約時，確認清楚你想要的服務項目和價格，避免後續誤解或不必要的爭議。</p>
            <h6 className="fw-bold">注意取消政策</h6>
            <p>了解美甲店的取消政策，包括取消預約是否有罰款或需提前多久通知。</p>
            <h6 className="fw-bold">準時到達</h6>
            <p>預約時間到了，盡量準時到達，以免影響其他客人的順利服務。</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-light py-3">
        <div className="container">
        <div className="row mt-5">
          <h2 className="text-center fw-bold">顧客推薦</h2>
          <div className="col-md-4 mt-md-4">
            <div className="card border-0 mb-4 h-100">
              <img
                src="https://storage.googleapis.com/vue-course-api.appspot.com/laimao/1720328351639.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=IpnRxVWZdxoPsrf990w9u8hcAWJsu7arOLMLj8l%2FCAnJGNL0dvVuY0Uptl%2FTfPfKE5zcVZ1hzvi3qfCLX5McvYNX%2F7qeO%2Ba7DjalGxR%2BvWBHwE7kUBONUOTwxRSzzXuy%2FNKpWFHDzNs71T0S%2Bt7WK%2FmpdY%2FxPKsfdFCWpJizzsZMCeTqTH7KwRoUkYcxtfn%2F4c9WJqlBfkMnxHezIk5tGWvTRAiMk1sHIlZIEY764PBQjai5TcwYC9Oc8LnHM2TRBZ7dZnMi8YkTJOqrZU1SEYcHNRYGmAAs7%2BCilgMzl8Mae8zXxVesgKFVrbFo2hG6BnmwAM7Zkjl%2BLVwAmXNoOw%3D%3D"
                className="card-img-top rounded-0 object-cover"
                alt="顧客推薦圖片一"
                height={200}
              />
              <div className="card-body text-center">
                <h4 className="fw-bold">黃小姐</h4>
                <div className="d-flex justify-content-between">
                  <p className="card-text text-muted mb-0">
                  非常喜歡！每次來這裡，我都感受到無與倫比的服務和細緻的手工藝。他們的設計師非常有耐心，會仔細聆聽我的需求並提供建議。店內的氛圍也非常舒適，讓我感覺放鬆愉悅。我推薦給所有希望享受一個愉快美甲體驗的人！
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-md-4">
            <div className="card border-0 mb-4 h-100 ">
              <img
                src="https://storage.googleapis.com/vue-course-api.appspot.com/laimao/1720328424757.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=niJSdnGOzzMl5TDhJHfDuYcSPa6d7%2BPIp6BMmRNh4Qj3QPVuyZ22qPNdDPGfOZQA1SgkXd%2BmtwHcx%2FWV1graS5CkhQ81T79osA2el1qEpTcQlGapzB9F15d3dtodirZ77CSicBzZPHXaKuI6%2Bl2Sbfox2mOJRK95nnq%2FShwJgmRPm0Kyp%2BAzQVjGQ86%2FgiBGwdWFhNIamQiBaI9wTvcQeGRkUbe%2Br0cCsil8Uqf7T4dWR7wjfOGR%2Fx6U61npT3Q1xMjk%2FbThebepjI9RdvX8pKPyM%2BgV0E9JIbW4Xy08dlNhU8JII%2F0MShVtKqCQEFF6Uuxihg4%2FdEOnASn1Y8m%2BGw%3D%3D"
                className="card-img-top rounded-0 object-cover"
                alt="顧客推薦圖片二"
                height={200}
              />
              <div className="card-body text-center">
                <h4 className="fw-bold">賴小姐</h4>
                <div className="d-flex justify-content-between">
                  <p className="card-text text-muted mb-0">
                  他們的產品選擇非常多樣化，每次都能找到一款令人驚艷的設計。而且他們的技術非常專業，能夠實現我所有的美甲夢想。我在這裡度過的每一次都是一個完美的美甲體驗！
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-md-4">
            <div className="card border-0 mb-4 h-100 ">
              <img
                src="https://storage.googleapis.com/vue-course-api.appspot.com/laimao/1720328578881.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=m%2Bof9UcMJZi1bnSkXZBze43l32qsZ7zOOhZR%2FEPL3TDqG8R4a2BRQpjj6d%2BUiKxDBD3fzHRse5Oot0AgGyQsvmdRrN3CwfvZ34g%2Bsm7AJalMY6ev6xXXxOlGF6I2vDYdFphrg7V0BWWhtGiAzUrgQ1QKLhsj4%2B4wOfIy44V6ZFvX534UyOGm6ivZeE9NdP9xNFDP8SCU%2BtTLfGS5Xd6%2B3wNdKW35sOxrdY75hiVseE0oX3zl6W15a7z%2B9wiDKGx6As7Tr2QFMOU1nX%2BofvlqDzuqLrc2jZe5kcMoD%2FqmAHEFa92QRRk2UxOHB1eHKcZRm8Bc4E%2BqD16JKxhP9cYjcA%3D%3D"
                className="card-img-top rounded-0 object-cover"
                alt="顧客推薦圖片三"
                height={200}
              />
              <div className="card-body text-center">
                <h4 className="fw-bold">陳小姐</h4>
                <div className="d-flex justify-content-between">
                  <p className="card-text text-muted mb-0">
                  他們不僅重視美甲的美觀，更注重使用環保和天然成分的產品。這裡的空氣清新，給人一種身心放鬆的感覺
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
          <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="row justify-content-center py-7">
                  <div className="col-md-6 text-center">
                    <h3 className="fw-bold">開幕大優惠</h3>
                    <p className="my-5">“複製以下優惠Coupon券，即可享有半價優惠”</p>
                    <p ref={copyRef}>happyOpenDay</p>
                     <button type="button" className="btn btn-dark rounded-0 p-3 mt-3"
                     onClick={()=>{
                      copy(copyRef.current.innerText);
                      setIsCopy(true);
                      setTimeout(() => {
                        setIsCopy(false);
                      }, 2000)
                     }}><span>{isCopy ? '複製完成' : '複製優惠碼'}</span></button>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
    </div>
    </>)
}

export default Home;