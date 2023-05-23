import { useState, useEffect } from "react";
import Spinner from "./assets/Spinner";
import Dashboard from "./Dashboard";

const UserTable = ({switchToDash, setUserId}) => {
  const [users, setusers] = useState([]);
  useEffect(() => {
    fetch("https://api-h5zs.onrender.com/get-all-user/patient")
      .then((res) => res.json())
      .then((data) => setusers(data));
  }, []);

  return (
    <div class="relative h-full overflow-x-auto shadow-md sm:rounded-lg">
      {users == [] ? (
        <Spinner />
      ) : (
        <table class="w-full text-sm text-left  text-gray-400">
          <thead class="text-xs sticky top-0 uppercase  bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Name
              </th>
              <th scope="col" class="px-6 py-3">
                Doctor
              </th>
              <th scope="col" class="px-6 py-3">
                Severity
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((val, index) => {
              return (
                <tr
                  class="border-b bg-gray-800 border-gray-700  hover:bg-gray-600"
                  onClick={(e) => {
                    setUserId(val.user_id)
                    switchToDash("dashboard")
                    console.log(val);
                  }}
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium  whitespace-nowrap text-white"
                  >
                    {val.name}
                  </th>
                  <td class="px-6 py-4">{val.doctor}</td>
                  <td class="px-6 py-4">low</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserTable;
