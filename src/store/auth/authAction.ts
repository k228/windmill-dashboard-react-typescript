import { Dispatch } from "redux";
import { setAuth, setUser } from "./authSlice";
import axios from "../../axios/vendors/auth.axios"


export const checkAuth = () => (dispatch: Dispatch) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
    axios
        .get(`/auth/me`).then(response => {
            console.log(2)
            dispatch(setUser(response.data));
            dispatch(setAuth(1))
        }).catch(err => {
            console.log(err)
            dispatch(setAuth(2))
        })

};