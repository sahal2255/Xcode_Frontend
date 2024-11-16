import React from 'react'
import Form from '../../Components/Form'
import {  LoginService } from '../../services/admin/AdminLoginService';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
export default function AdminLogin() {
    const navigate = useNavigate();
    const header='Admin Login Form'
    const loginFields = [
        {
          name: "email",
          label: "Email",
          type: "email",
          validation: {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          },
        },
        {
            name: "phoneNumber",
            label: "Phone Number",
            type: "tel", 
            validation: {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/, 
                message: "Phone number must be 10 digits",
              },
            },
          },
          
      ];


      const handleLoginSubmit = async(data) => {
        console.log("Login Data:", data);
        try{

            const response=await LoginService(data)
            console.log('response in component',response)
            if(response?.token){
                // console.log('entering this condition')
                // Cookies.set('admintoken', response.token, { expires: 1 / 24 });
                console.log('Token set:', Cookies.get('admintoken'));

                navigate('/admin/dashboard');
            }
        }catch(error){
            console.log('error in the component',error)
        }
      };

  return (
    <div className='bg-gray-300 mx-auto flex justify-center items-center min-h-screen'>
        <div className='w-1/3'>

        <Form fields={loginFields} onSubmit={handleLoginSubmit} header={header}/>
        </div>
    </div>
  )
}
