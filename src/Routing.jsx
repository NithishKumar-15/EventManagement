import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./Components/LoginFrom/Loginform"
import RegistrationForm from "./Components/RegistrationForm/RegistrationForm"
import Home from "./Components/HomePage/Home"
import store from "./Store/store"
import { Provider } from "react-redux"
import SuccessPage from "./SuccessPage/successPage"
import PaymentCancel from "./SuccessPage/PaymentCancel"

const Routing=()=>{
    return(
        <>
        <Provider store={store}>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login></Login>}></Route>
            <Route path="/RegistrationForm" element={<RegistrationForm></RegistrationForm>}></Route>
            <Route path="/Home" element={<Home></Home>}></Route>
            <Route path="/SuccessPage" element={<SuccessPage></SuccessPage>}></Route>
            <Route path="/PaymentCancel" element={<PaymentCancel></PaymentCancel>}></Route>
        </Routes>
        </BrowserRouter>
        </Provider>
        </>
    )
}

export default Routing