import React from "react";
import { useNotContext } from "../hooks/useNotContext";
import moment from "moment";
import "moment/locale/tr";
import { useAuthContext } from "../hooks/useAuthContext";
const NotDetay = ({ not }) => {
  const { dispatch } = useNotContext();
  const { kullanici } = useAuthContext();
  const handleClick = async () => {
    if (!kullanici) {
      return;
    }
    const response = await fetch("/api/notlar/" + not._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${kullanici.token}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      //state den tenizle
      dispatch({ type: "NOT_SIL", payload: json });
    }
  };
  return (
    <div>
      <div>
        <div
          href="/"
          class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {not.baslik}
          </h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">
            {not.aciklama}
          </p>
          <p class="font-normal text-gray-700 dark:text-gray-400">
            {moment(new Date(not.createdAt)).fromNow()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotDetay;
