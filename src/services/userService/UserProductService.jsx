import Instance from "../../utils/Axios";

export const UserProduct=async()=>{
    try {
        const response=await Instance.get('/products')
        console.log(response)
        return response
    } catch (error) {
        console.log('error in the user side fetching product',error)
    }
}

export const AddToCart=async(productId)=>{
    console.log('product id',productId)
    try {
        const response=await Instance.post(`/addtocart/${productId}`)
        console.log(response)
    } catch (error) {
        
    }
}


export const CartGet=async()=>{
    console.log('car data get')
    try {
        const response=await Instance.get('/cart')
        return response.data
    } catch (error) {
        console.log('error in th cart item get',error)
    }
}