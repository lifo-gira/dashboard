import { useState, useEffect, useRef } from "react";
import Spinner from "./assets/Spinner";
import Detail from "./Detail";
import Videos from "./Videos";
import Industrypie from "./charts/Industrypie";
import { Carousel } from "bootstrap";
import ReactPlayer from "react-bootstrap";
import Statuschart from "./charts/Statuschart";
import Industrychart from "./charts/Industrychart";
import Sourcechart from "./charts/Sourcechart";
import ActiveUsersChart from "./charts/ActiveUsersChart";
import { json } from "react-router-dom";
import ScrollToBottom, { useAtStart } from "react-scroll-to-bottom";

const Dashboard = ({ userId }) => {
  const [patient, setPatient] = useState();
  const [metrics, setMetrics] = useState([]);
  const messagesEndRef = useRef(null);
  const [autoScroll, setAutoScroll] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  async function fetchMetrics(data) {
    const response = await fetch("https://api-h5zs.onrender.com/metrics", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  useEffect(() => {
    if (autoScroll) {
      scrollToBottom();
    }
  }, [metrics]);

  useEffect(() => {
    fetch(`https://api-h5zs.onrender.com/get-user/patient/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setPatient(data);
        fetchMetrics(data.data).then((metrics) => {
          setMetrics(metrics);
        });
        setInterval(() => {
          fetchMetrics(data.data).then((metrics) => {
            setMetrics(metrics);
          });
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      clearInterval();
    };
  }, []);

  return (
    <div className="h-full">
      {patient != null && userId != "" && (
        <div className="overflow-auto h-full">
          <h2 className="text-gray-200 font-bold text-lg mb-3">
            Patient Details
          </h2>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex items-center justify-center h-24 rounded bg-gray-800">
              <div className=" text-gray-200">
                <Detail title={"Name"} value={patient.name} />
              </div>
            </div>
            <div className="flex items-center justify-center h-24 rounded bg-gray-800">
              <div className=" text-gray-200">
                <Detail title={"Doctor"} value={patient.doctor} />
              </div>
            </div>
            <div className="flex items-center justify-center h-24 rounded bg-gray-800">
              <div className=" text-gray-200">
                <Detail title={"Severity"} value={"Low"} />
              </div>
            </div>
          </div>
          <h2 className="text-gray-200 font-bold text-lg mb-3">
            Doctor's Suggestions
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-4 h-58">
            <div className="flex items-start t h-full mb-4 rounded bg-gray-800">
              <div className="flex flex-none flex-col  w-full p-3">
                <a className="text-gray-200 font-medium text-m  hover:bg-gray-600 p-2 rounded-md ">
                  1. Healthy lifestyle lead to a healhy Life
                </a>
                <a className="text-gray-200 font-medium text-m  hover:bg-gray-600 p-2 rounded-md">
                  2. Yoga is one the few things you can do that will greatly
                  improve your life
                </a>
                <a className="text-gray-200 font-medium text-m  hover:bg-gray-600 p-2 rounded-md">
                  3. Atleast walk 5 kilometers per day to have cholestrol under
                  control
                </a>
              </div>
            </div>
            <div className="flex flex-none justify-center items-center">
              <Videos className="z-100" />
            </div>
          </div>

          <h2 className="text-gray-200 font-bold text-lg mb-3">
            Patient's Metrics
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col items-center justify-start p-2 rounded h-80 bg-gray-800">
              <h2 className="text-gray-200 font-mono mb-2">
                Types of Activities
              </h2>
              <Industrypie />
            </div>
            <div className="flex flex-col items-center justify-start p-2 rounded h-80 bg-gray-800">
              <h2 className="text-gray-200 font-mono mb-2">Walking Time</h2>
              <Sourcechart />
            </div>
            <div className="flex flex-col items-center justify-start p-2 rounded h-80 bg-gray-800">
              <h2 className="text-gray-200 font-mono mb-2">Active Users</h2>
              <ActiveUsersChart />
            </div>
            <div className="flex flex-col items-center justify-start p-2 rounded h-80 bg-gray-800">
              <h2 className="text-gray-200 font-mono mb-2">Week's Activity</h2>
              <Industrychart />
            </div>
          </div>

          <div className="flex w-full justify-between">
            <h2 className="text-gray-200 font-bold text-lg mb-3">Raw Logs</h2>
            <button
              className="text-white bg-gray-800 hover:bg-gray-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
              onClick={() => {
                setAutoScroll(() => {
                  return !autoScroll;
                });
              }}
            >
              {autoScroll ? "Auto Scroll Enabled" : "Auto Scroll Disabled"}
            </button>
          </div>
          <div className="flex items-center justify-center h-[280px] mb-4 p-3 rounded bg-gray-800">
            <div
              className="w-full h-full bg-black text-white rounded p-3 overflow-scroll font-mono"
              key={userId}
            >
              <ul>
                {metrics.map((val, i) => (
                  <li>
                    ${i}: {val.data_id}
                    <ul className="indent-10">
                      <li>{val.device_id}</li>
                      <li>{JSON.stringify(val.series)}</li>
                    </ul>
                  </li>
                ))}
                <div ref={messagesEndRef} />
              </ul>
            </div>
          </div>
        </div>
      )}
      {patient == null && userId != "" && <Spinner />}
    </div>
  );
};

export default Dashboard;
