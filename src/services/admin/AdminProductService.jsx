import Instance from "../../utils/Axios";

export const AddProducts = async (data) => {
  console.log("data in the service section", data);

  try {
    const formData = new FormData();

    formData.append("productName", data.productName);
    formData.append("brand", data.brand);
    formData.append("price", data.price);
    formData.append("discount", data.discount);

    if (data.productImage && data.productImage[0]) {
      formData.append("productImage", data.productImage[0]);
    }

    const response = await Instance.post("/admin/addproduct", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Response from server:", response);
    return response
  } catch (error) {
    console.error("Error while adding product:", error);
  }
};

export const ProductFetch=async()=>{
    console.log('product fetching service')
    try {
        const response=await Instance.get('/admin/products')
        console.log('response for the fetch product',response)
        return response
    } catch (error) {
        console.log('error in the fetching products',error)
    }
}


export const DeleteProduct=async(id)=>{
    console.log('product id',id)
    try {
        const response = await Instance.delete(`/admin/deleteproduct/${id}`);
        return response
    } catch (error) {
       console.log('error in the delete product service section') 
    }
}


export const UsersCartDetails=async()=>{
  try {
    const response=await Instance.get('/admin/cartdetails')
    console.log('response',response)
    return response.data
  } catch (error) {
    console.log('error in the user cart details',error)
  }
}