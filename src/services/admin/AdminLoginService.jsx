import Instance from "../../utils/Axios";

export const LoginService=async(data)=>{
    try{
        const response=await Instance.post('/admin/login',{data})
        console.log(response)
        return response.data
    }catch(error){
        console.log('admin login error in the service section',error)
    }
}