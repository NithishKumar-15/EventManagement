import axios from "axios";

const instance=axios.create({
    // baseURL:"http://localhost:4000",
    baseURL:"https://eventmanagement-backend-whhh.onrender.com"
})

export default instance