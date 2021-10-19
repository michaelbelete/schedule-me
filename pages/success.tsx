import Link from "next/link";
import Image from "next/image";
import React from "react";
import CardLayout from "../layouts/card";
import Layout from "../layouts/Landing";

const Success: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-10 items-center px-10 pt-14">
        <div>
          <Image src="/images/logo.png"
            height={80}
            width={300}
            layout="fixed"
          />
        </div>
        <CardLayout>
          <div className="flex flex-col items-center py-10">
            <div className="px-6 py-10 w-28 h-28 text-3xl font-bold text-white bg-green-600 rounded-full">
              Sent
            </div>
            <h1 className="mt-3 text-4xl font-bold text-green-700">Success</h1>
            <p className="mt-3 text-gray-800">Your event has been created successfully</p>
            <Link href="/">
              <p className="px-10 py-2 mt-6 text-white bg-green-600 rounded">Go Back</p>
            </Link>
          </div>
        </CardLayout>
      </div>
    </Layout>
  )
}

export default Success;