import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../styles/AuthStyles.css";
const Register = () => {
    const [name,setName] =useState("") 
    const [email,setEmail] =useState("") 
    const [password,setPassword] =useState("") 
    const [balance,setBalance] =useState("") 
    const [phone,setPhone] =useState("") 
    const [address,setAddress] =useState("") 
    const [answer,setAnswer] =useState("") 
    const navigate = useNavigate()

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/register',{name,email,balance,password,phone,address,answer});
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
    <Layout title={'Register In Our Shop'}>
    <div className='form-container'>
   
    <form onSubmit={handleSubmit}>
            <h4 className='title'>REGISTER FROM</h4>
  <div className="mb-3">
    <input type="text" 
    value={name} required 
    onChange={(e)=> setName(e.target.value)}
    className="form-control" id="exampleInputName1" placeholder='Name'  />
     </div>
  <div className="mb-3">
    <input type="email"  required value={email} onChange={(e)=> setEmail(e.target.value)}  className="form-control" id="exampleInputEmail1" placeholder='Email'  />
     </div>
  <div className="mb-3">
    <input type="password"  required value={password} onChange={(e)=> setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Passowrd' />
  </div>
  <div className="mb-3">
    <input type="text"  required value={balance} onChange={(e)=> setBalance(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Balance' />
  </div>
  <div className="mb-3">
    <input type="text"  required className="form-control"onChange={(e)=> setPhone(e.target.value)}  value={phone} id="exampleInputPhone1" placeholder='Phone'  />
     </div>
     <div className="mb-3">
    <input type="text" required  className="form-control" onChange={(e)=> setAddress(e.target.value)} value={address} id="exampleInputAddress1" placeholder='Address'  />
     </div>
     <div className="mb-3">
    <input type="text" required  className="form-control" onChange={(e)=> setAnswer(e.target.value)} value={answer} id="exampleInputAnswer1" placeholder='What is your favorite Sport'  />
     </div>
  
  <button type="submit" className="btn btn-primary">REGISTER</button>
</form>

    </div>
    </Layout>
  )
}

export default Register