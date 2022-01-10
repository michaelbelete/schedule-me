import React, { useRef, useState } from "react";
import { User } from ".prisma/client";
import { useRouter } from "next/router";
import { userInfo } from "os";
import Link from "next/link";

const HeaderLoggedIn: React.FC<{ user: User }> = (props) => {
    return (
        <div className="flex flex-col justify-center items-center px-36 mt-10 mb-5">
            <h1 className="text-5xl font-bold text-white">Welcome, {props?.user.fullName}</h1>
            <p className="mt-5 text-white">Create a new event and share your link to start using
                schedule me</p>

            <div className="mt-10">

                <Link href="/eventType">
                    <p className="items-center px-8 py-3 text-sm font-bold text-white bg-pink-600 rounded-3xl cursor-pointer">
                        Create Event Type
                    </p>
                </Link>
            </div>
        </div>
    );
};

export default HeaderLoggedIn;
