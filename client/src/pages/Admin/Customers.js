import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from './../../components/Layout/Layout';
import { Link } from 'react-router-dom';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const getAllCustomers = async () => {
    try {
      const { data } = await axios.get('/api/v1/customer/get-customer');
      setCustomers(data.customers);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    getAllCustomers();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm) ||
      customer.phone.toLowerCase().includes(searchTerm)
  );

  return (
    <Layout>
       <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          
          <h1 className="text-center">Customers List</h1>
          <div className="w-75">
          
          <div className="input-group w-50 mr-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name or phone"
                onChange={handleSearch}
              />
              
              <Link to="/dashboard/admin/create-customer" className="btn btn-success">
              Add Customer
            </Link>
          
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Action</th> {/* New column for the update button */}
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer._id}>
                    <td>{customer.name}</td>
                    <td>{customer.phone}</td>
                    <td>
                      <Link
                        key={customer._id}
                        to={`/dashboard/admin/customer/${customer.slug}`}
                        className='customer-link'
                      >
                        <button
                          className="btn btn-primary"
                        >
                          Update
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Customers;
