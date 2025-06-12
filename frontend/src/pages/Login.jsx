import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummmaryApi from '../common/SummaryApi';
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

function Login() {
    const [data, setData] = useState({
       
        email: "",
        password: ""
    })
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const valideValue = Object.values(data).every(e1 => e1)
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await Axios({
                ...SummmaryApi.login,
                data: data

            })
            if (res.data.error) {
                toast.error(res.data.message)
                return
            }
           
            if (res.data.success) {
               
                toast.success(res.data.message)
                setData({
                    fullname: "",
                    email: "",
                    password: ""
                })
                navigate("/")
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
        }
    }
  return (
   <form onSubmit={handleSubmit} className=''>
   
   
   
               <h2 className='text-3xl font-bold text-center py-2 '>Login</h2>
               <div className='w-[350px] md:w-[450px]  flex flex-col gap-2 m-auto p-2' >
                   
                   <div>
                       <label className='font-semibold text-lg'>
                           Email :
   
                       </label>
                       <input type='email' value={data.email} name='email' onChange={handleChange} className='bg-purple-300 font-medium rounded-lg px-2 py-1 placeholder:text-gray-600 outline-none w-80 md:w-full' placeholder='Enter email' />
   
                   </div>
                   <div>
                       <label className='font-semibold text-lg'>
                           Password :
   
                       </label>
                       <div className='flex items-center bg-purple-300 rounded-lg px-2 py-1'>
   
                       
                       <input type={showPassword ?"text":"password"} value={data.password} name='password' className='bg-purple-300 font-medium   outline-none w-80 md:w-full' onChange={handleChange} placeholder='*******' />
                       <div onClick={()=>setShowPassword(prev =>!prev)} className='cursor-pointer pr-3'>{
                           showPassword ? (
                               <FaRegEye />
                           ) : (<FaRegEyeSlash />)
                       }</div>
                       </div>
                   </div>
                   <button disabled={!valideValue} className={`${valideValue ? "bg-green-600 hover:bg-green-400" : "bg-gray-400"} w-full my-2 m-auto rounded-lg p-1 font-bold text-lg`}  >Submit</button>
                   <p>
                    Don't have account? <Link to={"/register"} className='font-semibold text-green-700 hover:text-green-800'>Register</Link>
                </p>
               </div>
   
           </form> 
            )
}

export default Login
