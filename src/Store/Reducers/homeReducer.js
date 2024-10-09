const homeStateInfo={
    eventList:"yes",
    createEvent:"",
}

const homeReducer=(state=homeStateInfo,action)=>{
    if(action.type==="eventList"){
        return{
            ...state,
            eventList:"yes",
            createEvent:""
        }
    }else if(action.type==="createEvent"){
        return{
            ...state,
            createEvent:"yes",
            eventList:""
        }
    }else if(action.type==="eventData"){
        return{
            ...state,
            eventData:action.data,
        }
    }else if(action.type==="insertEventData"){
        return{
            ...state,
            eventData:[...state.eventData,action.data]
        }
    }
    else{
        return state;
    }
}

export default homeReducer;