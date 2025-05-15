import { auth } from "@/lib/auth";
import Image from "next/image";
import React from "react";
import { GoDotFill } from "react-icons/go";
import moment from "moment";

interface userDataType {
  createdAt: string;
  messages: string[];
  userEmail: string;
  userName: string;
  userProfileImage: string;
  _id: string;
}

export interface messagesDataType {
  createdAt: string;
  message: string;
  userData: userDataType;
  _id: string;
}

type MessagesProps = {
  allMessages: messagesDataType[];
  error?: string;
};

const Messages: React.FC<MessagesProps> = async ({ allMessages, error }) => {
  const session = await auth();
  let myMessages: messagesDataType[] = [];
  let othersMessages: messagesDataType[] = [];
  let userImage: string;

  if (!session?.user) {
    othersMessages = [...allMessages];
  } else {
    const { email, image } = session.user;
    myMessages = allMessages.filter(
      (message) => message.userData.userEmail === email
    );
    othersMessages = allMessages.filter(
      (message) => message.userData.userEmail !== email
    );
    if (image) {
      userImage = image;
    }
  }

  if (error) {
    alert(error);
  }

  return (
    <div className="flex flex-col gap-[10px]">
      {myMessages.length > 0 &&
        myMessages.map((message) => {
          return (
            <div className="flex items-start gap-[10px]" key={message._id}>
              <Image
                src={userImage ? userImage : message.userData.userProfileImage}
                alt="user-img"
                height={35}
                width={35}
                className="bg-zinc-100 rounded-full max-h-[35px] max-w-[35px]"
              />
              <div className="flex flex-col gap-[3px]">
                <p className="flex flex-wrap items-center gap-[5px] text-[13px] text-zinc-400">
                  <span>{message.userData.userName}</span>
                  <GoDotFill className="text-[10px]" />{" "}
                  <span>
                    {moment(message.createdAt).format("D MMMM YYYY")} at{" "}
                    {moment(message.createdAt).format("h:mm a")}
                  </span>
                </p>
                <p className="text-[15px] text-zinc-100">{message.message}</p>
              </div>
            </div>
          );
        })}
      {othersMessages.length > 0 &&
        othersMessages.map((message) => {
          return (
            <div className="flex items-start gap-[10px]" key={message._id}>
              <Image
                src={message.userData.userProfileImage}
                alt="user-img"
                height={35}
                width={35}
                className="bg-zinc-100 rounded-full max-h-[35px] max-w-[35px]"
              />
              <div className="flex flex-col gap-[3px]">
                <p className="flex flex-wrap items-center gap-[5px] text-[13px] text-zinc-400">
                  <span>{message.userData.userName}</span>
                  <GoDotFill className="text-[10px]" />{" "}
                  <span>
                    {moment(message.createdAt).format("D MMMM YYYY")} at{" "}
                    {moment(message.createdAt).format("h:mm a")}
                  </span>
                </p>
                <p className="text-[15px] text-zinc-100">{message.message}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Messages;
