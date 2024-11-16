import React, { useState, useEffect } from 'react';
import CommonModal from '../../Components/CommonModal'; // Import the reusable modal component
import Form from '../../Components/Form';
import { AddProducts, ProductFetch,DeleteProduct } from '../../services/admin/AdminProductService'; // Ensure GetProducts is correctly imported
import CommonTable from '../../Components/CommonTable';

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]); // State to store product data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await ProductFetch(); 
        if (response.status === 200) {
          setProducts(response.data); 
        } else {
          setError('Failed to fetch products');
        }
      } catch (error) {
        setError('Error fetching products');
      } finally {
        setLoading(false); 
      }
    };

    fetchProducts(); // Call the function to fetch products
  }, [setProducts]); // Empty dependency array ensures this runs once when the component mounts

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
 
  const formFields = [
    {
      name: "productName",
      label: "Product Name",
      type: "text",
      validation: {
        required: "Product name is required",
        minLength: {
          value: 3,
          message: "Product name must be at least 3 characters",
        },
      },
    },
    {
      name: "brand",
      label: "Brand",
      type: "text",
      validation: {
        required: "Brand is required",
        minLength: {
          value: 2,
          message: "Brand name must be at least 2 characters",
        },
      },
    },
    {
      name: "price",
      label: "Price",
      type: "number",
      validation: {
        required: "Price is required",
        min: {
          value: 1,
          message: "Price must be at least 1",
        },
      },
    },
    {
      name: "discount",
      label: "Discount (%)",
      type: "number",
      validation: {
        required: "Discount is required",
        min: {
          value: 0,
          message: "Discount cannot be negative",
        },
        max: {
          value: 100,
          message: "Discount cannot exceed 100%",
        },
      },
    },
    {
      name: "productImage",
      label: "Product Image",
      type: "file",
      validation: {
        required: "Product image is required",
      },
    },
  ];

  const handleAddProduct = async (data) => {
    try {
      const response = await AddProducts(data);
      if (response.status === 200) {
        alert('Product added successfully');
        handleCloseModal();
        // Refresh the product list after adding a product
        setProducts((prevProducts) => [...prevProducts, response.data]);
      }
    } catch (error) {
      console.log('Error adding product', error);
      alert('Failed to add product');
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await DeleteProduct(id);
      if (response.status === 200) {
        setProducts(products.filter((product) => product._id !== id)); // Remove deleted product
        alert('Product deleted successfully');
      }
    } catch (error) {
      console.log('Error deleting product', error);
      alert('Failed to delete product');
    }
  };
  

  const columns = [
    { id: "productName", label: "Product Name"},
    { id: "brand", label: "Brand" },
    { id: "price", label: "Price" },
    { id: "productImage", label: "Image" },
    { id: "discount", label: "Discount" },
    { id: "actions", label: "Actions" } // Actions column for Edit/Delete buttons
  ];

  const rows = products.map((product) => ({
    productName: product.productName, 
    brand: product.brand,
    price: product.price,
    productImage: <img src={product.productImage} alt={product.productName} width="50" />,
    discount: `${product.discount}%`,
    actions: (
      <div>
        {/* <button
          onClick={() => handleOpenEditModal(product)} // Edit functionality placeholder
          className="bg-yellow-500 text-white p-2 rounded-lg"
        >
          Edit
        </button> */}
        <button
          onClick={() => handleDeleteProduct(product._id)}
          className="bg-red-500 text-white p-2 rounded-lg ml-2"
        >
          Delete
        </button>
      </div>
    )
  }));

  return (
    <div>
      <div className="flex justify-end items-end p-5">
        <button
          onClick={handleOpenModal}
          className="bg-blue-500 text-white p-3 rounded-lg"
        >
          Add New Product
        </button>
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p>{error}</p>}

      <div className="bg-white">
        <CommonTable rows={rows} columns={columns} />
      </div>

      <CommonModal
        isVisible={isModalOpen}
        onClose={handleCloseModal}
        title="Add New Product"
      >
        <Form fields={formFields} onSubmit={handleAddProduct} />
      </CommonModal>
      
    </div>
  );
};

export default Products;
