
import axios from "axios";
import { Cookies } from "react-cookie";

let adminUrl = "https://tureappapiforreact.onrender.com/api/";

export const baseURL = adminUrl;
let axiosInstance = axios.create({
  baseURL,
});

// export const product_pic = (media:string) => {
//   return `https://fakestoreapi.com/uploads/product/${media}`;
// };
// export const profile_pic = (media:string) => {
//     return `https://fakestoreapi.com/uploads/user/profile_pic/${media}`;
//   };
axiosInstance.interceptors.request.use(
    async function (config) {
        const cookie = new Cookies();
      const token =
        cookie.get("token");
      if (token !== null || token !== undefined) {
        config.headers["x-access-token"] = token;
      }else{
        const token =
        localStorage.getItem("token");
        config.headers["x-access-token"] = token;
      }
      return config;
    },
    function (err) {
      return Promise.reject(err);
    }
  );
  
export default axiosInstance;
