import React, { useRef, useState } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { User } from ".prisma/client";
import { useRouter } from "next/router";
import { userInfo } from "os";

const HeaderLoggedIn: React.FC<{ user: User }> = (props) => {
    const router = useRouter();
    const link = window.location;
    const [value, setValue] = useState(`${link}booking/${props?.user.email}`);
    const [copySuccess, setCopySuccess] = useState("copy");


    return (
        <div className="flex flex-col justify-center items-center px-36 mt-10 mb-5">
            <h1 className="text-5xl font-bold text-white">Welcome, {props?.user.fullName}</h1>
            <p className="mt-5 text-white">Create a new event and share your link to start using
                schedule me</p>

            <div className="mt-10">
                <div className="flex flex-row gap-5 justify-center px-8 py-3 bg-white rounded-xl item-center">
                    <input value={value} disabled className="w-96"/>

                    <CopyToClipboard text={value}
                        onCopy={() => setCopySuccess("Copied")}>
                        <span>{ copySuccess }</span>
                    </CopyToClipboard>
                </div>
            </div>
        </div>
    );
};

export default HeaderLoggedIn;
