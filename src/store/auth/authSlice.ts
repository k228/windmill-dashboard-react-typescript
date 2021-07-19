import { createSlice ,PayloadAction  } from "@reduxjs/toolkit"
import {IAuthState, IUser} from "../../interfaces/vendors/auth.interface";




const initialState:IAuthState={
    isAuth:0
};

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setAuth:(state,action:PayloadAction<number> )=>{
            state.isAuth=action.payload
        },
        setUser:(
            state,
            action:PayloadAction<IUser>
        )=>{
            state.currentUser=action.payload
        }
    }
});

export const { setAuth , setUser  } =authSlice.actions;
export default authSlice.reducer;