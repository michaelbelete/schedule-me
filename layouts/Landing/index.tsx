import React, { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const LandingLayout: React.FC<Props> = (props) => (
    <div>
        <div className="absolute w-full h-4/6 bg-indigo-700"></div>
        <div className="relative z-10 px-40 align-middle">
            <div className="px-3">
                { props.children }
            </div>
        </div>
    </div>
);

export default LandingLayout;