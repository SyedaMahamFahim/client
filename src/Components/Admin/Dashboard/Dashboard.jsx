import React, { useEffect } from "react";
import { PriceSign } from "../../MetaData/PriceSign";
import Sidebar from "../Sidebar/Sidebar";
import MetaData from "../../MetaData/MetaData";
import { Doughnut, Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { getAdminProduct } from "../../../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import "./dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
  }, [dispatch]);
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, 200],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };
  return (
    <>
      <div className="dashboard">
        <MetaData title="Dashboard - Admin Panel" />
        <Sidebar />

        <div className="dashboardContainer">
          <h1 component="h1">Dashboard</h1>

          <div className="dashboardSummary">
            <div>
              <p>
                {/* Total Amount <br /> ₹{totalAmount} */}
                Total Amount <br /> {PriceSign} 300
              </p>
            </div>
            <div className="dashboardSummaryBox2">
              <Link to="/admin/products">
                <p>Product</p>
                {/* <p>30</p> */}
                <p>{products && products.length}</p>
              </Link>
              <Link to="/admin/orders">
                <p>Orders</p>
                <p>30</p>
                {/* <p>{orders && orders.length}</p> */}
              </Link>
              <Link to="/admin/users">
                <p>Users</p>
                <p>30</p>
                {/* <p>{users && users.length}</p> */}
              </Link>
            </div>
          </div>

          <div className="lineChart">
            <Line data={lineState} />
          </div>

          <div className="doughnutChart">
            <Doughnut data={doughnutState} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
