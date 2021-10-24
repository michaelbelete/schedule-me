import React from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/client";
import { User } from ".prisma/client";

// The L stand for logged in so this component is showed only when the user is logged in 
const LNavBar: React.FC<{ user: User }> = ({ user }) => {
    return (
        <header className="py-8">
            <nav className="flex flex-row justify-between">
                <Link href="/">
                    <Image src="/images/logo.png"
                        height={30}
                        width={160}
                    />
                </Link>
                <div>
                    <div className="flex flex-row gap-14">
                        <Link href="/">
                            <p className="py-1 text-sm font-bold text-white">
                                Home
                            </p>
                        </Link>
                        <Link href="/">
                            <div className="flex flex-row gap-2">
                                <div className="items-center w-8 h-8 text-white bg-pink-700 rounded-full">
                                    <p className="px-2 py-0.5 text-lg font-bold">
                                        {user.fullName.substr(0, 1).toUpperCase()}
                                    </p>
                                </div>
                                <p className="py-1 text-sm font-bold text-white">
                                    {user.fullName}
                                </p>
                            </div>
                        </Link>
                        <Link href="/api/auth/signin">
                            <p className="py-1 text-sm font-bold text-white" onClick={() => signOut()}>
                                Logout</p>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    )
};

export default LNavBar;
