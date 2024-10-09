import { useEffect, useRef } from "react";
import style from "./login.module.css";
import { useNavigate } from "react-router-dom";
import instance from "../../AxiosInstance/axiosInstance";
import { useDispatch, useSelector } from "react-redux";


const Login = () => {

    const loginState = useSelector((state) => state.loginReducer);
    const dispatch = useDispatch();

    const email = useRef("");
    const password = useRef("");


    const navigate = useNavigate();

    useEffect(()=>{
        localStorage.clear();
    },[])

    async function loginForm(e) {
        e.preventDefault();

        if (email.current.value != "" && password.current.value != "") {

            const data = {
                email: email.current.value,
                password: password.current.value
            }

            const response=await instance.post("/Login",data);
            if(response.data.message==="Login Successful"){
                localStorage.setItem("token",response.data.token);
                navigate("/Home");
            }else if(response.data.message==="Password incorrect"){
                dispatch({type:"passwordIncorrect"});
            }
            
        } else {
            dispatch({ type: "requiredFieldsLogin" })
        }

    }

    return (
        <div className={`${style.login} mx-auto border rounded`}>
            <form onSubmit={loginForm}>
                <label className={`form-label`} htmlFor="email">Email:</label>
                <input type="email" ref={email} className={`form-control`} id="email"></input>

                <label className={`form-label`} htmlFor="password">Password:</label>
                <input type="password" ref={password} className={`form-control`} id="password"></input>

                <button className="btn btn-primary mt-3 d-block mx-auto">Login</button>

                {loginState.message != "" && <label className="mt-2 text-danger text-center d-block">{loginState.message}</label>}
                {loginState.passwordIncorrect != "" && <label className="mt-2 text-danger text-center d-block">{loginState.passwordIncorrect}</label>}
                {loginState.requiredFieldsLogin != "" && <label className="mt-2 text-danger text-center d-block">{loginState.requiredFieldsLogin}</label>}


            </form>
            <span className="text-center d-block my-2">Or</span>
            <a className={`text-center d-block  ${style.newUser}`} onClick={() => navigate("/RegistrationForm")}>New User Register</a>
        </div>
    )
}

export default Login