import React, { ReactNode } from "react";
import Header from "../../components/header";

type Props = {
    children: ReactNode;
};

const LandingLayout: React.FC<Props> = (props) => (
    <div>
        <div className="absolute w-full h-96 bg-indigo-700"></div>
        <div className="relative z-10 px-32 align-middle">
            <Header />
            <div className="bg-white">
                { props.children }
            </div>
        </div>
    </div>
);

export default LandingLayout;