import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from './../../components/Layout/Layout';
import Chart from 'chart.js/auto';

function formatDate(date) {
  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [customerCount, setCustomerCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [totalBillSum, setTotalBillSum] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const chartRef = useRef(null);

  const getAllSales = async () => {
    try {
      const { data } = await axios.get('/api/v1/sales/get-sales');
      setSales(data.sales);
      const totalBillSum = data.sales.reduce((sum, sale) => sum + sale.totalBill, 0);
      setTotalBillSum(totalBillSum);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get('/api/v1/product/get-product');
      const products1 = data.products;
      setProductCount(products1.length);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  const getAllCustomer = async () => {
    try {
      const { data } = await axios.get('/api/v1/customer/get-customer');
      const customers1 = data.customers;
      setCustomerCount(customers1.length);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    getAllSales();
    getAllProducts();
    getAllCustomer();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
  };

  const filteredSales = sales.filter(
    (sale) =>
      sale.customerId.toLowerCase().includes(searchTerm) ||
      sale.salesId.toLowerCase().includes(searchTerm)
  ).filter((sale) => {
    if (fromDate && toDate) {
      const saleDate = new Date(sale.createdAt);
      const fromDateObj = new Date(fromDate);
      const toDateObj = new Date(toDate);
      return saleDate >= fromDateObj && saleDate <= toDateObj;
    }
    return true;
  });



  return (
    <Layout>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">Sales</h1>
          <div className="row">
            <div style={{ display: 'flex'}}>
              <div className="card" style={{ width: 200, height: 200, backgroundColor: '#f0ad4e', marginRight: "40px" }}>
                <div className="card-body">
                  <h5 className="card-title" style={{ fontWeight: 'bold' }}>Products</h5>
                  <p className="card-text" style={{ fontWeight: 'bold', fontSize: "75px" }}>{productCount}</p>
                </div>
              </div>
              <div className="card" style={{ width: 200, height: 200, backgroundColor: '#5bc0de', marginRight: "40px" }}>
                <div className="card-body">
                  <h5 className="card-title" style={{ fontWeight: 'bold' }}>Customers</h5>
                  <p className="card-text" style={{ fontWeight: 'bold', fontSize: "75px" }}>{customerCount}</p>
                </div>
              </div>
              <div className="card" style={{ width: 200, height: 200, backgroundColor: '#5cb85c', marginRight: "40px" }}>
                <div className="card-body">
                  <h5 className="card-title" style={{ fontWeight: 'bold' }}>Sales</h5>
                  <p className="card-text" style={{ fontWeight: 'bold', fontSize: "75px" }}>{sales.length}</p>
                </div>
              </div>
              <div className="card" style={{ width: 300, height: 200, backgroundColor: '#D04848' }}>
                <div className="card-body">
                  <h5 className="card-title" style={{ fontWeight: 'bold' }}>Revenue</h5>
                  <p className="card-text" style={{ fontWeight: 'bold', fontSize: "75px" }}>₹{totalBillSum}</p>
                </div>
              </div>
            </div>
          </div>
          <br/>
          <br/>
          <div className="w-75">
            <div className="input-group w-50 mr-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search by Sales Id or Customer Id"
                onChange={handleSearch}
              />
            </div>

            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
  <table className="table">
    <thead>
      <tr>
        <th>Sales Id</th>
        <th>Customer Id</th>
        <th>Items</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {filteredSales.map((sale) => (
        <tr key={sale._id}>
          <td>{sale.salesId}</td>
          <td>{sale.customerId}</td>
          <td>
            {sale.items.map((item, index) => (
              <React.Fragment key={index}>
                {item}
                <br />
              </React.Fragment>
            ))}
          </td>
          <td>{formatDate(new Date(sale.createdAt))}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

          </div>
        </div>
      </div>
      
    </Layout>
  );
};

export default Sales;
