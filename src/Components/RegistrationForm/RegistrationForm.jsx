import { useRef } from "react";
import style from "./registrationForm.module.css"
import { useNavigate } from "react-router-dom";
import instance from "../../AxiosInstance/axiosInstance";
import { useDispatch, useSelector } from "react-redux";

const RegistrationForm = () => {

    const registrationState = useSelector((state) => state.registrationReducer);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const userName = useRef("");
    const email = useRef("");
    const password = useRef("");
    const confirmPassword = useRef("");

    async function registrationForm(e) {
        e.preventDefault();

        if (password.current.value != "" && confirmPassword.current.value1 != "" && userName.current.value != "" && email.current.value != "") {

            if (password.current.value === confirmPassword.current.value) {

                const data = {
                    userName:userName.current.value,
                    email: email.current.value,
                    password: password.current.value
                }

                const response=await instance.post("/Registration", data);

                if(response.data.message==="Data added successful"){
                    dispatch({type:"successMessage"})
                }else if(response.data.message==="User Already Exist"){
                    dispatch({type:"emailExist"})
                }

            } else {
                dispatch({ type: "passwordEqual" });
            }
        } else {
            dispatch({ type: "requiredFields" })
        }
    }

    return (
        <>
            <div className={`${style.registration} border rounded mx-auto`}>
                <form onSubmit={registrationForm}>

                    <label className="form-label" htmlFor="userName">User Name:</label>
                    <input type="text" ref={userName} className={`form-control`} id="userName"></input>

                    <label className="form-label" htmlFor="email">Email:</label>
                    <input type="email" ref={email} className={`form-control`} id="email"></input>

                    <label className="form-label" htmlFor="password">Password:</label>
                    <input type="password" ref={password} className={`form-control`} id="password"></input>


                    <label className="form-label" htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" ref={confirmPassword} className={`form-control`} id="confirmPassword"></input>

                    <button className={`btn btn-primary mt-3 d-block mx-auto`}>Register</button>

                    {registrationState.requiredFields != "" && <label className="mt-2 text-danger text-center d-block">{registrationState.requiredFields}</label>}
                    {registrationState.emailIdExist != "" && <label className="mt-2 text-danger text-center d-block">{registrationState.emailIdExist}</label>}
                    {registrationState.passwordEqual != "" && <label className="mt-2 text-danger text-center d-block">{registrationState.passwordEqual}</label>}
                    {registrationState.successMessage != "" && <label className="mt-2 text-success text-center d-block">{registrationState.successMessage}</label>}

                </form>
                <span className="text-center d-block my-2">Or</span>
                <a className={`text-center d-block  ${style.newUser}`} onClick={() => navigate("/")}>Existing User Login</a>
            </div>
        </>
    )
}

export default RegistrationForm;