import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from './../../components/Layout/Layout';
import CanvasJSReact from '@canvasjs/react-charts';

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

const Charts = () => {
  const [productCategories, setProductCategories] = useState([]);
  const [sales, setSales] = useState([]);
  const chartRef = useRef(null);
  const lineChartRef = useRef(null);
  const [chartData, setChartData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Default to current month
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const { data } = await axios.get('/api/v1/sales/get-sales');
        const monthlySales = {};

        data.sales.forEach((sale) => {
          const saleDate = new Date(sale.createdAt);
          const saleMonth = saleDate.getMonth() + 1; // Adding 1 because getMonth returns zero-based month index
          const saleYear = saleDate.getFullYear();

          if (saleMonth === selectedMonth && saleYear === selectedYear) {
            const saleDateKey = saleDate.toISOString().slice(0, 10); // Extract date in YYYY-MM-DD format
            if (!monthlySales[saleDateKey]) {
              monthlySales[saleDateKey] = 0;
            }
            monthlySales[saleDateKey] += sale.totalBill;
          }
        });

        // Convert monthlySales object into an array of objects with x and y properties
        const salesData = Object.entries(monthlySales).map(([date, total]) => ({
          x: new Date(date),
          y: total,
        }));

        // Sort the salesData array by date in ascending order
        salesData.sort((a, b) => a.x - b.x);

        setChartData(salesData);
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong');
      }
    };

    fetchSalesData();
  }, [selectedMonth, selectedYear]);
  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };
  const options = {
    theme: "light2",
    animationEnabled: true,
    exportEnabled: true,
    title: {
      text: "Sales Chart"
    },
    axisX: {
      title: "Date",
      valueFormatString: "DD MMM, YYYY"
    },
    axisY: {
      title: "Sales",
      prefix: "$"
    },
    data: [{
      type: "line",
      dataPoints: chartData
    }]
  };

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get('/api/v1/product/get-product');
      const products = data.products;

      const productsByCategory = products.reduce((acc, product) => {
        const categoryName = product.category ? product.category.name : "Others";
        if (acc[categoryName]) {
          acc[categoryName].push(product);
        } else {
          acc[categoryName] = [product];
        }
        return acc;
      }, {});

      const categoriesArray = Object.entries(productsByCategory);

      setProductCategories(categoriesArray);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  const getAllSales = async () => {
    try {
      const { data } = await axios.get('/api/v1/sales/get-sales');
      setSales(data.sales);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    getAllProducts();
    getAllSales();
  }, []);
  
  

  useEffect(() => {
    if (chartRef.current && productCategories.length > 0) {
      const ctx = chartRef.current.getContext('2d');

      const labels = productCategories.map(([category, products]) => category);
      const data = productCategories.map(([category, products]) => products.length);

      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      chartRef.current.chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: 'Product Categories',
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(153, 102, 255, 0.7)',
              'rgba(255, 159, 64, 0.7)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          }]
        },
        options: {
          responsive: false,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  let label = "No.of Products" || '';
                  label += ': ' + context.formattedValue;
                  return label;
                }
              }
            }
          }
        }
      });
    }
  }, [productCategories]);

  useEffect(() => {
    if (lineChartRef.current && sales.length > 0) {
      const ctx = lineChartRef.current.getContext('2d');

      if (lineChartRef.current.chart) {
        lineChartRef.current.chart.destroy();
      }

      const monthlySales = {};
      sales.forEach(sale => {
        const saleDate = new Date(sale.createdAt);
        const month = saleDate.getMonth();
        const year = saleDate.getFullYear();
        const key = `${year}-${month}`;

        if (!monthlySales[key]) {
          monthlySales[key] = 0;
        }

        monthlySales[key] += sale.totalBill;
      });

      const labels = Object.keys(monthlySales).map(key => {
        const [year, month] = key.split('-');
        const date = new Date(year, month);
        const formattedMonth = date.toLocaleDateString('en-US', { month: 'short' });
        return `${formattedMonth} ${year}`;
      });

      const data = Object.values(monthlySales);

      lineChartRef.current.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Sales',
            data: data,
            borderColor: 'blue',
            backgroundColor: 'red',
          }]
        },
        options: {
          responsive: false,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }, [sales]);

  return (
    <Layout>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
         
          <div className="w-100 d-flex justify-content-center">
            <div className="w-50 d-flex justify-content-center" style={{ display: 'inline-block' }}>
              <canvas ref={chartRef} id="productChart" width="400" height="400"></canvas>
            </div>
            <div className="w-50 d-flex justify-content-center" style={{ display: 'inline-block' }}>
              <canvas ref={lineChartRef} id="salesChart" width="400" height="400"></canvas>
            </div>
            </div>
            <div className="w-100">
                  
              <div>
              
              <select id="month-select" value={selectedMonth} onChange={handleMonthChange}>
                <option value={1}>January</option>
                <option value={2}>February</option>
                <option value={3}>March</option>
                {/* Add more options for other months */}
              </select>
            
              
              <select id="year-select" value={selectedYear} onChange={handleYearChange}>
                <option value={2022}>2022</option>
                <option value={2023}>2023</option>
                <option value={2024}>2024</option>
                {/* Add more options for other years if needed */}
              </select>
             </div>
    
    
              <CanvasJSReact.CanvasJSChart options={options} />
            </div>
          </div>
          </div>
       
   
    </Layout>
  );
};

export default Charts;
