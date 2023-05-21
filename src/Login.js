import { useState, useEffect } from "react";
import bg from "./assets/bg.jpeg";
const Login = () => {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <div className="flex w-screen h-screen">
        <div className="flex flex-col w-1/3 p-10 h-screen bg-[#2a2c3e] text-center">
          <h1 className="text-5xl font-bold text-white mt-10">SSAGA</h1>
          <div className="flex flex-col h-screen justify-center text-center">
            <form>
              <input
                type="text"
                id="userName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-10 "
                placeholder="User Name"
                onChange={(e) => {
                  setuserName(e.target.value);
                }}
                required
              />

              <input
                type="password"
                id="userName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-10"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />

              <button
                type="button"
                class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-10 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                onClick={() => {
                  
                  const data = new URLSearchParams();
                  data.append("user_id", userName);
                  data.append("password", password);
                  let options = {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                    },
                  };
                  fetch("https://api-zybh.onrender.com/login?"+data, options)
                    .then((res) => res.json())
                    .then((data) => {
                      console.log(data);
                    })
                    .catch((err) => console.log(err));
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <div
          className={`bg-[url('./assets/bg.jpeg')] bg-cover bg-center w-2/3 h-screen`}
        ></div>
      </div>
    </div>
  );
};

export default Login;
