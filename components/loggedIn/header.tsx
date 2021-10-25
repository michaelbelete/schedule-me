import React, { useRef, useState } from "react";
import { User } from ".prisma/client";

const HeaderLoggedIn: React.FC<{ user: User }> = (props) => {


    const [copySuccess, setCopySuccess] = useState('Copy');
    const textAreaRef = useRef(null);
    function copyToClipboard(e) {
        textAreaRef.current.select();
        document.execCommand('copy');
        e.target.focus();
        setCopySuccess('Copied!');
    };

    return (
        <div className="flex flex-col justify-center items-center px-36 mt-10 mb-5">
            <h1 className="text-5xl font-bold text-white">Welcome, {props?.user.fullName}</h1>
            <p className="mt-5 text-white">Create a new event and share your link to start using
                schedule me</p>

            <div className="mt-10">
                <div className="flex flex-row justify-center px-2 py-2 bg-white rounded-xl item-center">
                    <input
                        ref={textAreaRef}
                        value={`http://localhost:3000/${props?.user.email}`}
                        autoFocus
                        disabled
                        type="text"
                    />
                    {
                        <div>
                            <button onClick={copyToClipboard}> {copySuccess}</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default HeaderLoggedIn;
