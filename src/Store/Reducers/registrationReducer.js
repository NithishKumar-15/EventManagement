const registrationStateInfo={
    requiredFields:"",
    emailIdExist:"",
    passwordEqual:"",
    successMessage:"",
}

const registrationReducer=(state=registrationStateInfo,action)=>{
    if(action.type==="requiredFields"){
        return {
            ...registrationStateInfo,
            requiredFields:"Please enter all the required field"
        }
    }else if(action.type==="emailExist"){
        return{
            ...registrationStateInfo,
            emailIdExist:"Email already exist register with another email"
        }
    }else if(action.type==="passwordEqual"){
        return{
            ...registrationStateInfo,
            passwordEqual:"Password and Confirm password not equal"
        }
    }else if(action.type==="successMessage"){
        return{
            ...registrationStateInfo,
            successMessage:"User created successfully"
        }
    }else{
        return state;
    }
}

export default registrationReducer;