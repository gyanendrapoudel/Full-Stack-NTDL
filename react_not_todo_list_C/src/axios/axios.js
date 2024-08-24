import axios from "axios";
const apiEP = 'http://localhost:8000/api/v1/taskLists'

const apiRequests = async(method, data)=>{
    try {
        const response = await axios({
            method,
            url:apiEP,
            data
        })
        return response.data
    } catch (error) {
            return { status: 'error', msg: error.message }
        
    }
} 

export const postRequest = async (obj)=>{
       return apiRequests("post",obj)
}
export const getAllTasks = async()=>{
   return apiRequests("get")

}
export const editTask = async (_id,type)=>{
    return apiRequests("patch", {_id, type})
}
export const deleteTasks = async (ids)=>{
    console.log(ids)
    return apiRequests("delete",ids)
}