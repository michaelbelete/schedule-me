import React from "react";
import Image from "next/image";
import Link from "next/link";


// The P stand for Public so this component doesn't required auth to be showed
const PNavBar: React.FC = (props) => {
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
                        <Link href="https://www.linkedin.com/in/michael-belete-8600a3176/">
                            <p className="py-1 text-sm font-bold text-white">
                                Developer
                            </p>
                        </Link>
                        <Link href="/api/auth/signin">
                            <p className="py-1 text-sm font-bold text-white">
                                Login
                            </p>
                        </Link>
                        <Link href="/signup">
                            <p className="items-center px-3 py-1 text-sm font-bold text-white bg-pink-600 rounded-3xl">
                                Sign Up
                            </p>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    )
};

export default PNavBar;
