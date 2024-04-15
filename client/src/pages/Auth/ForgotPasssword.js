
import Layout from '../../components/Layout/Layout'
import React,{useState} from 'react'

import {toast,Toaster} from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../styles/AuthStyles.css";


const ForgotPassword = () => {
    const [email,setEmail] =useState("") 
    const [newPassword,setNewPassword] =useState("") 
    const [answer,setAnswer] =useState("") 
 
    const navigate = useNavigate()
 
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/forgot-password',{email,newPassword,answer});
            if(res && res.data.success){
                toast.success(res.data && res.data.message);
                navigate('/login');
            }       
               
            
            else{
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
       
    }

  return (
 <Layout title={"Forgot Password"}>
    <div className='form-container'>
   
   <form onSubmit={handleSubmit}>
           <h4 className='title'>RESET PASSWORD FORM</h4>

 <div className="mb-3">
   <input type="email"  required value={email} onChange={(e)=> setEmail(e.target.value)}  className="form-control" id="exampleInputEmail1" placeholder='Email'  />
    </div>
 <div className="mb-3">
   <input type="text"  required value={answer} onChange={(e)=> setAnswer(e.target.value)}  className="form-control" id="exampleInputAnswer1" placeholder='Your Favoirte Sport'  />
    </div>
 <div className="mb-3">
   <input type="password"  required value={newPassword} onChange={(e)=> setNewPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Password' />
 </div>

 
 <button type="submit" className="btn btn-primary">RESET</button>
 
</form>
<Toaster />
   </div>

 </Layout>
  )
}

export default ForgotPassword