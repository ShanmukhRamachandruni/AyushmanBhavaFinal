import Layout from '../../components/Layout/Layout'
import React, { useState, useEffect } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu';
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateCustomer = () => {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [customer_id, setCustomerId] = useState("");
    const [answer, setAnswer] = useState("");
    const [balance, setBalance] = useState("");

    useEffect(() => {
        getAllCustomers();
    }, []);

    const getAllCustomers = async () => {
        try {
            const { data } = await axios.get('/api/v1/customer/get-customer');
            setCustomers(data.customers);
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    };

    const handleCreateCustomer = async (e) => {
        e.preventDefault();
        try {
            // Check if the customer_id already exists
            if (customers.some(customer => customer.customer_id === customer_id)) {
                toast.error('Card with this ID already exists');
            }else if (customers.some(customer => customer.phone === phone)) {
              toast.error('Customer with this phone number already exists');
          } else {
                const customerData = {
                    name,
                    address,
                    phone,
                    customer_id,
                    balance,
                    answer
                };

                const { data } = await axios.post(
                    "/api/v1/customer/create-customer", customerData
                );

                if (data.success) {
                    toast.success('Customer Created Successfully');
                    navigate('/dashboard/admin/customers');
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            console.log(error.response.data);
            toast.error("Something went wrong: " + error.response.data.error);
        }
    };

    return (
        <Layout title={"Dashboard - Create Customer"}>
            
            <div className="row dashboard">
                    <div className="col-md-3">
                      
                            <AdminMenu />
                      
                    </div>
                    <div className="col-md-9">
                        <h1>Create Customer</h1>
                        <div className="m-1 w-75">
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={customer_id}
                                    placeholder="Customer Id / Card Id"
                                    className="form-control"
                                    onChange={(e) => setCustomerId(e.target.value)}
                                />
                            </div>
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
                                <button className="btn btn-primary" onClick={handleCreateCustomer}>
                                    ADD CUSTOMER
                                </button>
                            </div>
                        </div>
                    </div>
                
            </div>
        </Layout>
    )
}

export default CreateCustomer;
