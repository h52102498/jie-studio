import { Link } from "react-router-dom";

function Banner(){
    return(
    <div className="banner position-relative" >
      <img className="min-vh-100 d-none d-md-block d-flex justify-content-center w-100 opacity-50" 
      src="https://storage.googleapis.com/vue-course-api.appspot.com/laimao/1720342354859.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Vc4DnWv2keZ8FF3sBQd41ka6muEk3RjzpjgA6Cnx4YULtwfMsknaKmAdYl1yNtV2PeHTVP4ueYiXBTalHHGYWTRvk9TNGKHzpbjjPnfHJ3IsjcL%2BnGugktMk82IC%2B97BJ%2BLhAWPjxFMItU22NKO%2BAGdnEk53MBIAFWWnRjI1JG6eWF5Ovj7Ft32iYZOofqQiIBbqa1CXO92d6%2BDHKC%2BUGA6gbqry%2F6nZnqgdXXbSnfuE4baFTluvqAqPbPsaw3%2BEYivAT1hZsoHM34XqCOiA%2FxsIQccmiB9TwZmUSboPrSyXgwVFIfP458yiihs6jZQOOdVV7m2zkdNTJF7%2BhaQEwg%3D%3D" alt="首頁Banner及開始購物按鈕" />
      <div className="banner-content position-absolute top-50 start-50 translate-middle text-center">
        <h1 className="banner-title text-dark">每一次彩繪都是自我表達的開始!</h1>
        <button type="button" className="btn btn-dark rounded"><Link className="text-white text-decoration-none" to={`/products`}>開始購物</Link></button>
      </div>
    </div>
    )
}

export default Banner;