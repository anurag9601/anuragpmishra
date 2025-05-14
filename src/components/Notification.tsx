"use client";

import { AppContext } from "@/context/appContext";
import { useContext, useEffect } from "react";

const Notification = () => {
  const { notification, setNotification } = useContext(AppContext);

  useEffect(() => {
    if (notification !== null) {
      const timeOut = setTimeout(() => {
        setNotification(null);
        clearTimeout(timeOut);
      }, 5000);
    }
  }, [notification]);

  return (
    <>
      {notification !== null && (
        <div className="fixed bottom-[10px] right-[20px] z-[9999] text-zinc-100 p-[20px] text-[14px] w-[250px] bg-blue-600 rounded-lg text-justify app-font notification-animation">
          <div className="flex items-center justify-end absolute top-[0px] right-[0px]">
            <button
              className="text-[10px] h-[25px] w-[50px] bg-zinc-50 rounded-md text-blue-600 font-[600] cursor-pointer"
              onClick={() => setNotification(null)}
            >
              Close
            </button>
          </div>
          <p>{notification}</p>
        </div>
      )}
    </>
  );
};

export default Notification;
