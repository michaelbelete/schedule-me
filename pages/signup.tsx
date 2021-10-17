import React, { useState } from "react";
import CardLayout from "../layouts/card";
import Layout from "../layouts/Landing/index"
const Home: React.FC = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [company, setCompany] = useState('');

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        alert("ike")
    };
    return (
        <Layout>
            <div className="py-10">
                <CardLayout>
                    <div className="flex flex-row">
                        <div className="w-full h-auto bg-pink-700 rounded-l-2xl">
                            <div className="flex flex-col gap-2 px-10 py-44">
                                <h1 className="text-5xl font-bold text-white">
                                    Sign Up for Free
                                </h1>
                                <p>Fill the form on the right to get started</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 px-8 py-5">
                            <p className="text-lg font-bold">Create Account</p>
                            <form onSubmit={submitData}>

                                <label htmlFor="FullName" className="mt-2 w-full">Full Name</label>
                                <input
                                    id="FullName"
                                    autoFocus
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Full Name"
                                    className="px-3 py-2 my-2 w-full rounded-xl border-2 border-gray-300"
                                    type="text"
                                    value={fullName}
                                />
                                <label htmlFor="Email" className="mt-2 w-full">Email</label>
                                <input
                                    id="Email"
                                    autoFocus
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    className="px-3 py-2 my-2 w-full rounded-xl border-2 border-gray-300"
                                    type="text"
                                    value={email}
                                />
                                <label htmlFor="Password" className="mt-2 w-full">Password</label>
                                <input
                                    id="Password"
                                    autoFocus
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    className="px-3 py-2 my-2 w-full rounded-xl border-2 border-gray-300"
                                    type="text"
                                    value={password}
                                />
                                <label htmlFor="company" className="mt-2 w-full">Company</label>
                                <input
                                    id="company"
                                    autoFocus
                                    onChange={(e) => setCompany(e.target.value)}
                                    placeholder="Company"
                                    className="px-3 py-2 my-2 w-full rounded-xl border-2 border-gray-300"
                                    type="text"
                                    value={company}
                                />
                                <input disabled={!company || !fullName || !email || !password} className="items-center p-3 mt-5 w-full text-sm font-bold text-white bg-pink-600 rounded-3xl disabled:opacity-80" type="submit" value="Sign Up" />
                            </form>
                        </div>
                    </div>
                </CardLayout>
            </div>
        </Layout>
    );
}

export default Home;