import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login(){
    const navigate = useNavigate();
    const [data,setData] = useState({
        username:"",
        password:""
    });

    const [loginState, setLoginState] = useState({});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData({...data,[name]:value});
    }
    //token:"eyJhbGciOiJSUzI1NiIsImtpZCI6IjduY3Y5USJ9.eyJpc3MiOiJodHRwczovL3Nlc3Npb24uZmlyZWJhc2UuZ29vZ2xlLmNvbS92dWUtY291cnNlLWFwaSIsImF1ZCI6InZ1ZS1jb3Vyc2UtYXBpIiwiYXV0aF90aW1lIjoxNzE4Nzc3MTkyLCJ1c2VyX2lkIjoiV3FmMVJkQ0liT1Zqaks3OU1QU1Uza3c3QW0zMyIsInN1YiI6IldxZjFSZENJYk9WampLNzlNUFNVM2t3N0FtMzMiLCJpYXQiOjE3MTg3NzcxOTIsImV4cCI6MTcxOTIwOTE5MiwiZW1haWwiOiJoNTIxMDI0OThAeWFob28uY29tLnR3IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImg1MjEwMjQ5OEB5YWhvby5jb20udHciXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.DjlqLut-Ker5VD9-WbTj2kpZL7x0TetMDVX23hGey4u-X8Pe5SyuwgB6hC-jFJQsj34Ug3TRLWi_yyKTsjhgrJKLcDsY3VzMziDNsxJjDQjYa1-HeGmqf9jV7B-bRp5SvX5ETaNn1COyyWUQt7jrA6NtoaGmiRvamEHY6galfLBrpptQVvBJSnaNmMTaSm_1Go9xA3F895soqXWmIibxFltVieydmmgYG3tCOLbs1BmGdVvrNuC9IwtEGdnOsD57tMfguwtqygWmKfZFtZ0l3cr-DViFQ-QU7BYpV357l_NxGPOpCZvryrBQbs4YwZSw0jlnL5EefDPv9ffSByRqyQ"
    const submit = async(e) => {
      try {
        const res = await axios.post("v2/admin/signin",data);
        const {token,expired} =res.data;
        //儲存token
        document.cookie = `laimaoToken=${token}; expires=${new Date(expired)};`;
        if(res.data.success===true){
          navigate("/admin/products");
        }
        
      } catch (error) {
        setLoginState(error.response.data);
      }
    }
    
    

    return (<div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2>登入帳號</h2>
    
            <div className={`alert alert-danger ${loginState.message?'d-block':'d-none'}`} role="alert">
              {loginState.message}
            </div>
            <div className="mb-2">
              <label htmlFor="email" className="form-label w-100">
                Email
                <input id="email" className="form-control" name="username" type="email" 
                placeholder="name@example.com" onChange={handleChange}/>
              </label>
            </div>
            <div className="mb-2">
              <label htmlFor="password" className="form-label w-100">
                密碼
                <input type="password" className="form-control"  name="password" id="password" 
                placeholder="請輸入密碼" onChange={handleChange} />
              </label>
            </div>
            <button type="button" className="btn btn-primary" onClick={submit}>登入</button>
          </div>
        </div>
      </div>)
}
export default Login;