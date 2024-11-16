import React, { useEffect, useState } from 'react';
import { UsersCartDetails } from '../../services/admin/AdminProductService';
import CommonModal from '../../Components/CommonModal';

const UserCart = () => {
  const [cart, setCart] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [modalProduct, setModalProduct] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    const fetchUsersCart = async () => {
      try {
        setLoading(true);
        const response = await UsersCartDetails();
        console.log('response', response);

        if (response) {
          setCart(response); 
        } else {
          setCart([]); 
        }
      } catch (error) {
        setError(error.message); 
        console.log('error ', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchUsersCart(); 
  }, []); 

  const openModal = (cartItem) => {
    setModalProduct(cartItem); 
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalProduct(null);
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }

  return (
    <div className="m-5 bg-gray-100 p-6 rounded-lg">
      <h1 className="text-3xl font-semibold mb-4 text-center">User's Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-lg text-gray-700">Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((cartItem) => (
            <div key={cartItem.cartId} className="mb-6">
              
              <div className="overflow-x-auto mt-4">
                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="py-2 px-4 text-left">User Email</th>
                      <th className="py-2 px-4 text-left">Phone Number</th>
                      <th className="py-2 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-100">
                      <td className="py-4 px-4">{cartItem.userDetails.email}</td>
                      <td className="py-4 px-4">{cartItem.userDetails.phoneNumber}</td>
                      <td className="py-4 px-4">
                        <button 
                          onClick={() => openModal(cartItem)} 
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for product details */}
      <CommonModal 
        isVisible={isModalOpen} 
        onClose={closeModal} 
        title="User Cart Details"
      >
        {modalProduct && (
          <div>
            <h3 className="text-xl font-semibold mb-4">{modalProduct.userDetails.email}'s Cart</h3>
            <p><strong>Phone Number:</strong> {modalProduct.userDetails.phoneNumber}</p>
            <h4 className="mt-4 text-lg font-semibold">Product Details</h4>
            <table className="min-w-full mt-4 bg-white border border-gray-300 shadow-md rounded-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4 text-left">Product</th>
                  <th className="py-2 px-4 text-left">Price</th>
                  <th className="py-2 px-4 text-left">Discount </th>


                </tr>
              </thead>
              <tbody>
                {modalProduct.products.map((product) => (
                  <tr key={product._id} className="border-b hover:bg-gray-100">
                    <td className="py-4 px-4">{product.productName}</td>
                    <td className="py-4 px-4">₹{product.price}</td>
                    <td className="py-4 px-4">{product.discount}%</td>


                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CommonModal>
    </div>
  );
};

export default UserCart;
