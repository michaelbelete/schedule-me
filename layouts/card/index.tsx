import React, { ReactNode } from "react";
import Header from "../../components/header";

type Props = {
    children: ReactNode;
};

const CardLayout: React.FC<Props> = (props) => (
    <div className="p-5 w-full bg-white rounded-3xl shadow-2xl">
        {props.children}
    </div>
);

export default CardLayout;