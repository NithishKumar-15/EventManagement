const loginStateInfo={
    message:"",
    requiredFieldsLogin:"",
    passwordIncorrect:""
}

const loginReducer=(state=loginStateInfo,action)=>{
    if(action.type==="invalidUserOrPassword"){
        return{
            ...loginStateInfo,
            message:"Invalid Email or Password"
        }
    }else if(action.type==="requiredFieldsLogin"){
        return{
            ...loginStateInfo,
            message:"Please enter all the required field"
        }
    }else if(action.type==="passwordIncorrect"){
        return{
            ...loginStateInfo,
            passwordIncorrect:"Password Incorrect"
        }
    }
    else{
        return state;
    }
}

export default loginReducer;