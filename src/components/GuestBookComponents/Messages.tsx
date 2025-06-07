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

async function fetData() {
  const baseURL = process.env.NEXT_PUBLIC_SITE_URL as string;
  const request = await fetch(`${baseURL}/api/message/all`);
  const response = await request.json();

  if (response.success === true) {
    return { allMessages: response.allMessages };
  } else if (response.error) {
    return { error: response.error };
  }
}

const Messages = async () => {
  const data = await fetData();

  let allMessages: messagesDataType[] = [];
  let error: string | undefined = undefined;

  if (data?.allMessages) {
    allMessages = [...data.allMessages];
  } else if (data?.error) {
    error = data.error;
  }

  const session = await auth();
  let myMessages: messagesDataType[] = [];
  let othersMessages: messagesDataType[] = [];
  let userImage = "";

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

  return (
    <div className="flex flex-col gap-[10px]">
      {error && <p className="text-red-500">{error}</p>}

      {[...myMessages, ...othersMessages].map((message) => {
        const isMine = message.userData.userEmail === session?.user?.email;
        const imageSrc = isMine
          ? userImage || message.userData.userProfileImage
          : message.userData.userProfileImage;

        return (
          <div className="flex items-start gap-[10px]" key={message._id}>
            <Image
              src={imageSrc}
              alt="user-img"
              height={35}
              width={35}
              className="bg-zinc-100 rounded-full max-h-[35px] max-w-[35px]"
            />
            <div className="flex flex-col gap-[3px]">
              <p className="flex flex-wrap items-center gap-[5px] text-[13px] text-zinc-400">
                <span>{message.userData.userName}</span>
                <GoDotFill className="text-[10px]" />
                <span className="text-[12px]">
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
