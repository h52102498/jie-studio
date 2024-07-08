import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const  messageSlice = createSlice({
    name:"message",
    initialState:[],
    reducers:{
        createMessage(state,action){
            if(action.payload.success){
                state.push({
                    id:action.payload.id,
                    type:"light",
                    title:"成功",
                    text:action.payload.message,
                });
            }else{
                state.push({
                    id:action.payload.id,
                    type:"danger",
                    title:"失敗",
                    text:Array.isArray(action.payload?.message)
                    ? action.payload?.message.join("、")
                    : action.payload?.message,
                });
            }


            
        },
        //不能用setTimeout，不能在非同步下使用，要在同步下使用
        removeMessage(state,action){
            const index = state.findIndex(item=>item===action.payload);
            state.splice(index,1);
        }


    }
});
//匯出後可以被其他元件使用
//參數傳入自訂義名稱、async function
export const createAsyncMessage = createAsyncThunk(
    "message/createAsyncMessage",
    async function(payload,{dispatch,requestId}){
        dispatch(messageSlice.actions.createMessage({
            ...payload,
            id:requestId
        }))

        setTimeout(()=>{
            dispatch(messageSlice.actions.removeMessage(requestId))
        },5000)
    }
)

export const {createMessage} = messageSlice.actions;

export default messageSlice.reducer;