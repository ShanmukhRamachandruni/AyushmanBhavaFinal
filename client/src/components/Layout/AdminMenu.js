import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  const menuItemStyle = {
    padding: "10px 15px", // Adjust padding values as needed
    borderRadius: "5px", // Optional: Add rounded corners
    marginBottom: "5px", // Optional: Add space between items
  };

  return (
    <>
      <div className="text-center">
        <div className="list-group dashboard-menu">
          <h4>Admin Panel</h4>
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action"
            style={menuItemStyle}
          >
           Category
          </NavLink>
         
          
          <NavLink
            to="/dashboard/admin/products"
            className="list-group-item list-group-item-action"
            style={menuItemStyle}
          >
            Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            className="list-group-item list-group-item-action"
            style={menuItemStyle}
          >
            Orders
          </NavLink>
         
          <NavLink
            to="/dashboard/admin/customers"
            className="list-group-item list-group-item-action"
            style={menuItemStyle}
          >
            Customers
          </NavLink>
          <NavLink
            to="/dashboard/admin/sales"
            className="list-group-item list-group-item-action"
            style={menuItemStyle}
          >
            Sales
          </NavLink>
          <NavLink
            to="/dashboard/admin/charts"
            className="list-group-item list-group-item-action"
            style={menuItemStyle}
          >
            Charts
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
