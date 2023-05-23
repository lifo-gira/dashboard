import { useState, useEffect } from "react";
import Spinner from "./assets/Spinner";
import Detail from "./Detail";
import Videos from "./Videos";
import Industrypie from './charts/Industrypie';
import { Carousel } from 'bootstrap';
import ReactPlayer from 'react-bootstrap'
import Vid1 from './charts/videoplayback.mp4'
import Statuschart from './charts/Statuschart';
import Industrychart from './charts/Industrychart';
import Sourcechart from './charts/Sourcechart';
import ActiveUsersChart from './charts/ActiveUsersChart';

const Dashboard = ({ userId }) => {
  const [patient, setPatient] = useState();

  useEffect(() => {
    fetch(`https://api-h5zs.onrender.com/get-user/patient/${userId}`)
      .then((res) => res.json())
      .then((data) => setPatient(data))
      .catch((err) => {
        console.log(err);
      });
    console.log("useffect");
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
              <p className=" text-gray-200">
                <Detail title={"Name"} value={patient.name} />
              </p>
            </div>
            <div className="flex items-center justify-center h-24 rounded bg-gray-800">
              <p className=" text-gray-200">
                <Detail title={"Doctor"} value={patient.doctor} />
              </p>
            </div>
            <div className="flex items-center justify-center h-24 rounded bg-gray-800">
              <p className=" text-gray-200">
                <Detail title={"Severity"} value={"Low"} />
              </p>
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
                <h2 className="text-gray-200 font-mono mb-2">Types of Activities</h2>
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

          <h2 className="text-gray-200 font-bold text-lg mb-3">
            Raw Logs
          </h2>
          <div className="flex items-center justify-center h-[280px] mb-4 p-3 rounded bg-gray-800">
            <div className="w-full h-full bg-black text-white rounded p-3 overflow-scroll font-mono">
              <p>
                May 23 05:01:35 PM INFO: 223.178.80.194:0 - "GET
                /get-user/patient/patient999 HTTP/1.1" 200 OK
                <br />
                May 23 05:01:39 PM INFO: 223.178.80.194:0 - "GET
                /get-user/patient/patient999 HTTP/1.1" 200 OK
                <br />
                May 23 05:01:47 PM INFO: 223.178.80.194:0 - "GET
                /get-user/patient/patient999 HTTP/1.1" 200 OK
                <br />
                May 23 05:02:04 PM INFO: 223.178.80.194:0 - "GET
                /get-user/patient/patient999 HTTP/1.1" 200 OK
                <br />
                May 23 05:02:11 PM INFO: 223.178.80.194:0 - "GET
                /get-user/patient/patient999 HTTP/1.1" 200 OK
                <br />
                May 23 05:03:10 PM INFO: 223.178.80.194:0 - "GET
                /get-all-user/patient HTTP/1.1" 200 OK
                <br />
                May 23 05:03:10 PM INFO: 223.178.80.194:0 - "GET
                /get-all-user/patient HTTP/1.1" 200 OK
                <br />
                May 23 05:03:11 PM INFO: 223.178.80.194:0 - "GET
                /get-all-user/doctor HTTP/1.1" 200 OK
                <br />
                May 23 05:03:12 PM INFO: 223.178.80.194:0 - "GET
                /get-all-user/doctor HTTP/1.1" 200 OK
                <br />
                May 23 05:03:14 PM INFO: 223.178.80.194:0 - "GET
                /get-user/patient/patient999 HTTP/1.1" 200 OK
                <br />
                May 23 05:03:14 PM INFO: 223.178.80.194:0 - "GET
                /get-user/patient/patient999 HTTP/1.1" 200 OK
              </p>
            </div>
          </div>

          
        </div>
      )}
      {patient == null && userId != "" && <Spinner />}
    </div>
  );
};

export default Dashboard;
