import React, { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const CardLayout: React.FC<Props> = (props) => (
    <div className="w-full bg-white rounded-3xl shadow-2xl">
        {props.children}
    </div>
);

export default CardLayout;