import { on } from "events";
import React, { ReactElement } from "react";

const TimePicker = (props: any): ReactElement => {
    const { duration, onClick } = props
    let timepicker = [];
    let timeBoolean = true;
    let time;
    const F = (n) => {
        if (n == 0) return 1
        else return n - M(F(n - 1))
    }

    const M = (n) => {
        if (n == 0) return 0
        else return n - F(M(n - 1))
    }

    for (let index = 0; index < 36; index++) {
        time = `${F(index)}:${timeBoolean ? "00" : "30"}`;
        timepicker.push(
            <button key={index} onClick={(e) => onClick(e.target.value)} className = "py-2 mb-4 w-full text-2xl text-center text-white bg-purple-800 rounded-lg border-2 cursor-pointer" value = { time } >
                { time }
            </button >
        );
timeBoolean = !timeBoolean;
    }
return (
    <div className="overflow-x-hidden overflow-y-scroll h-96">
        {timepicker}
    </div>
)
}

export default TimePicker;