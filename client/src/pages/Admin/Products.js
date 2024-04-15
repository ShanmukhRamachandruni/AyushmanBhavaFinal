import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      const sortedProducts = data.products.sort((a, b) => a.name.localeCompare(b.name));
      setProducts(sortedProducts);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredCustomers = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm)
  );
  return (
    <Layout>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          
          <h1 className="text-center">Products List</h1>
          <div className="w-75">
          
          <div className="input-group w-50 mr-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search by product name"
                onChange={handleSearch}
              />
              
              <Link to="/dashboard/admin/create-product" className="btn btn-success">
              Add Product
            </Link>
          
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  
                  <th>Action</th> {/* New column for the update button */}
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                   
                    <td>
                      <Link
                        key={product._id}
                        to={`/dashboard/admin/product/${product.slug}`}
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

export default Products;