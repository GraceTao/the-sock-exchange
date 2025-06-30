import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";
import AddSockForm from "./components/AddSockForm";
import Search from "./components/Search";
import Featured from "./components/Featured";
import Footer from "./components/Footer";

import sock_data from "./assets/sock.json";
import promo_data from "./assets/promo.json";

import "./index.css";

function App() {
  const [data, setData] = useState([]);
  // const [numSocks, setNumSocks] = useState({});
  const fetchData = async () => {
    try {
      console.log("Refetching entire db")
      const response = await fetch(import.meta.env.VITE_SOCKS_API_URL);
      if (!response.ok) {
        throw new Error("Data could not be fetched!");
      }
      const json_response = await response.json();
      setData(json_response);
      console.log(json_response.length);
  
      // set number Left, Right, Both socks
      // const left = json_response.filter(
      //   (sock) => sock.sockDetails.forFoot === "Left"
      // );
      // const right = json_response.filter(
      //   (sock) => sock.sockDetails.forFoot === "Right"
      // );
      // const both = json_response.filter(
      //   (sock) => sock.sockDetails.forFoot === "Both"
      // );
      // setNumSocks({
      //   Left: left.length,
      //   Right: right.length,
      //   Both: both.length,
      // });
    } catch (error) {
      console.error("Error fetching socks:", error);
    }
  };

  useEffect(() => {

    fetchData();
  }, []);


  const handleDelete = async (sockId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SOCKS_API_URL}/${sockId}`,
        { method: "DELETE" }
      );
      if (!response.ok) {
        throw new Error("Sock could not be deleted!");
      }
      const updatedData = data.filter((sock) => sock._id !== sockId);
      setData(updatedData);
      const sock = data.filter((s) => s._id === sockId)[0];

      // setNumSocks((old) => {
      //   const sockFoot = sock.sockDetails.forFoot;
      //   return { ...old, [sockFoot]: old[sockFoot] - 1 };
      // });
    } catch (error) {
      console.error("Error deleting sock: ", error);
    }
  };

  return (
    <>
      <Router>
        <NavBar setData={setData} />
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <div className="container-fluid">
            <div className="row">
              Both socks and space rockets 🚀 will take you to new heights, but
              only one will get cold feet!
              <Featured promo_data={promo_data} />
              
              <hr />
              <Routes>
                <Route
                  path="/"
                  element={<Home data={data} handleDelete={handleDelete} />}
                />
                <Route path="/about" element={<About />} />
                <Route path="/addSock" element={<AddSockForm setSockData={setData} />} />
              </Routes>
              <Footer />
            </div>
          </div>
        </main>
      </Router>
    </>
  );
}

export default App;
