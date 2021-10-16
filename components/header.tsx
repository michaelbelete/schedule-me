import React from "react";
import Image from "next/image";
import Link from "next/link";

const Header: React.FC = (props) => {
    return (
        <header className="py-5">
            <nav className="flex flex-row justify-between">
                <div>
                    <Image src="/images/logo.png"
                        height={30}
                        width={160}
                    />
                </div>
                <div>
                    <div className="flex flex-row gap-14">
                        <Link href="/">
                            <p className="py-1 font-bold text-white">
                                Home
                            </p>
                        </Link>
                        <Link href="/">
                            <p className="py-1 font-bold text-white">
                                Developer
                            </p>
                        </Link>
                        <Link href="/">
                            <p className="py-1 font-bold text-white">
                                Login
                            </p>
                        </Link>
                        <Link href="/">
                            <p className="px-3 py-1 font-bold text-white bg-pink-600 rounded-3xl">
                                Sign Up
                            </p>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    )
};

export default Header;
