import Layout from '../../components/Layout/Layout';
import React, { useEffect, useState } from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams from react-router-dom

const UpdateCustomer = () => {
  const navigate = useNavigate();
  const params = useParams();
  
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [answer, setAnswer] = useState('');
  const [balance, setBalance] = useState('');
  const [id, setId] = useState("");

  const getSingleCustomer = async () => {
    try {
      const response  = await axios.get(`/api/v1/customer/get-customer/${params.slug}`); // Use slug parameter
      const data = response.data;
      
      setName(data.customers[0].name);
      setAddress(data.customers[0].address);
      setPhone(data.customers[0].phone);
      setAnswer(data.customers[0].answer);
      setBalance(data.customers[0].balance);
      setId(data.customers[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleCustomer();
    //eslint-disable-next-line
  }, []);

  const handleUpdateCustomer = async (e) => {
    e.preventDefault();
    try {
      const customerData = {
        name,
        address,
        phone,
        balance,
        answer,
      };
      const { data } = await axios.put(`/api/v1/customer/update-customer/${id}`, customerData);
      
      if (data.success) {
        toast.success('Customer Updated Successfully');
        navigate('/dashboard/admin/customers');
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error.response.data);
      toast.error('something went wrong' + error.response.data.error);
    }
  };

  return (
    <Layout title={'Dashboard - Create Customer'}>
      
      <div className="row dashboard">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Customer</h1>
            <div className="m-1 w-75">
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Customer name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={balance}
                  placeholder="Balance"
                  className="form-control"
                  onChange={(e) => setBalance(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={address}
                  placeholder="Address"
                  className="form-control"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={phone}
                  placeholder="Phone"
                  className="form-control"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={answer}
                  placeholder="Answer"
                  className="form-control"
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdateCustomer}>
                  UPDATE CUSTOMER
                </button>
              </div>
            </div>
          </div>
        </div>
      
    </Layout>
  );
};

export default UpdateCustomer;
