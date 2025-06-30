import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";
import AddSockForm from "./components/AddSockForm";
import Featured from "./components/Featured";
import Footer from "./components/Footer";

import promo_data from "./assets/promo.json";

import "./index.css";

const pageLimit = 3;

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [sockCount, setSockCount] = useState(null);

  // const [numSocks, setNumSocks] = useState({});
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SOCKS_API_URL}/${page}/${pageLimit}`
      );

      if (!response.ok) {
        throw new Error("Data could not be fetched!");
      }
      const json_response = await response.json();

      setData(json_response);
      console.log("Number of socks fetched: ", json_response.length);
    } catch (error) {
      console.error("Error fetching socks:", error);
    }
  };

  const getSockCount = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SOCKS_API_URL}/count`
      );

      if (!response.ok) {
        throw new Error("Data could not be fetched!");
      }
      const json_response = await response.json();

      setSockCount(json_response.count);
    } catch (error) {
      console.error("Error fetching socks:", error);
    }
  };

  useEffect(() => {
    fetchData();
    getSockCount();
  }, []);

  useEffect(() => {
    fetchData();
  }, [page, sockCount]);

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
      setSockCount((prev) => prev - 1);
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
                  element={
                    <Home
                      sockCount={sockCount}
                      sockData={data}
                      handleDelete={handleDelete}
                      page={page}
                      setPage={setPage}
                      pageLimit={pageLimit}
                    />
                  }
                />
                <Route path="/about" element={<About />} />
                <Route
                  path="/addSock"
                  element={
                    <AddSockForm
                      sockCount={sockCount}
                      setSockData={setData}
                      page={page}
                      setPage={setPage}
                      pageLimit={pageLimit}
                    />
                  }
                />
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
