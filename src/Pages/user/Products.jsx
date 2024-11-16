import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar';
import Sidebar from '../../Components/Sidebar';
import ProductCard from '../../Components/CommonCard';
import { AddToCart, CartGet, UserProduct } from '../../services/userService/UserProductService';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]); // Cart state
  const [cartCount, setCartCount] = useState(0); // Cart item count
  const [totalPrice, setTotalPrice] = useState(0); // Total cart price
  const [totalDiscountedPrice, setTotalDiscountedPrice] = useState(0); // Total discounted cart price
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductsAndCart = async () => {
      try {
        // Fetch products
        const response = await UserProduct();
        setProducts(response.data);

        // Fetch cart items for the user
        const cartResponse = await CartGet(); // Fetch cart from the backend
        console.log('cart response', cartResponse);
        if (cartResponse && cartResponse.cart) {
          console.log('products in the cart', cartResponse.cart.products);
          setCart(cartResponse.cart.products); // Set the cart products correctly
          setCartCount(cartResponse.cart.products.length);

          // Calculate total price and total discounted price
          let total = 0;
          let discountedTotal = 0;

          cartResponse.cart.products.forEach((product) => {
            // Ensure that product price is a number
            const productPrice = parseFloat(product.price);
            const productDiscountedPrice = productPrice - (productPrice * product.discount) / 100;

            total += productPrice;
            discountedTotal += productDiscountedPrice;
          });

          setTotalPrice(total);
          setTotalDiscountedPrice(discountedTotal);
        }
      } catch (error) {
        console.error('Error fetching products or cart:', error);
      }
    };

    fetchProductsAndCart();
  }, []); // Empty dependency array to run only once on mount

  const addToCart = async (product) => {
    const token = Cookies.get('usertoken');
    if (!token) {
      alert('Please log in to add products to the cart.');
      navigate('/login');
      return;
    }

    // Check if the product is already in the cart
    const isProductInCart = cart.some((item) => item._id === product._id); // Check based on product _id
    if (isProductInCart) {
      alert('This product is already in your cart.');
      return;
    }

    // Convert price to number if it comes as a string
    const productPrice = parseFloat(product.price);
    const discountedPrice = productPrice - (productPrice * product.discount) / 100;

    // Add to cart state and update counts and prices
    const updatedCart = [...cart, product]; // Add product to the cart
    setCart(updatedCart);
    setCartCount(updatedCart.length); // Increment cart count
    setTotalPrice((prevPrice) => prevPrice + productPrice); // Update total price
    setTotalDiscountedPrice((prevDiscountedPrice) => prevDiscountedPrice + discountedPrice); // Update discounted total price

    try {
      const response = await AddToCart(product._id); // Add product to cart in the backend
      console.log('Response in the component', response);
    } catch (error) {
      console.log('Error adding product to cart', error);
    }

    console.log('Product added to cart:', product);
  };

  return (
    <div>
      {/* Pass cart count, total price, and total discounted price to Navbar */}
      <Navbar cartCount={cartCount} totalPrice={totalPrice} discountedPrice={totalDiscountedPrice} />
      <div className="bg-gray-300 flex min-h-screen">
        <div className="w-1/3 m-5">
          <Sidebar />
        </div>
        <div className="w-2/3 flex flex-wrap m-5 gap-4 p-4">
          {products.map((product) => {
            // Ensure that product price is a number
            const productPrice = parseFloat(product.price);
            const discountedPrice = productPrice - (productPrice * product.discount) / 100;

            return (
              <div key={product._id} className="flex-3 gap-2">
                <ProductCard
                  name={product.productName}
                  price={productPrice} // Ensure price is a number
                  imageUrl={product.productImage}
                  brand={product.brand}
                  discountPrice={discountedPrice}
                  discount={product.discount}
                  onAddToCart={() => addToCart(product)} // Attach addToCart to button
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
