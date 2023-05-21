import { useState, useEffect } from "react";
import Spinner from "./assets/Spinner";

const UserTable = () => {
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
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs sticky top-0 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
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
