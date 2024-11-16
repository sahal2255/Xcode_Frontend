import Instance from "../../utils/Axios";


export const UserLogin=async(data)=>{
    console.log('data in the service section',data)
    try {
        
        const response=await Instance.post('/userlogin',{data})
        console.log('response in the service section',response.data)
        return response
    } catch (error) {
        console.log('error in the user login service section',error)
    }
}
