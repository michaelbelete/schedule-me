import React from "react";
import Image from "next/image";
import Link from "next/link";

const LandingHeader: React.FC = (props) => {
    return (
        <div className="flex flex-row justify-between mb-10">
        <div>
          <h1 className="text-6xl font-bold text-white">
            Easy scheduling
            <div className="pt-2 text-pink-700">ahead</div>
          </h1>
          <div className="flex flex-row gap-3 mt-10">
            <Link href="/signup">
              <p className="items-center px-7 py-2 text-sm font-bold text-white bg-pink-600 rounded-3xl">Join us</p>
            </Link>
            <Link href="/login">
              <p className="items-center px-7 py-2 text-sm font-bold text-black bg-white rounded-3xl">Log in</p>
            </Link>
          </div>
        </div>
        <div className="lg:mr-24">
          <Image
            src="/images/event.svg"
            height={200}
            width={200}
          />
        </div>
      </div>  
    );
};

export default LandingHeader;
