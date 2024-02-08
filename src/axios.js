import axios from "axios";


const instance=axios.create({
    baseURL:"https://smart-backend-render.onrender.com/"
})
export default instance;