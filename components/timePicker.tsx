import { on } from "events";
import React, { ReactElement } from "react";

const TimePicker = (props: any): ReactElement => {
    const { duration, onClick } = props
    let timepicker = [];
    // let timeBoolean = true;
    // let time;
    // const F = (n) => {
    //     if (n == 0) return 1
    //     else return n - M(F(n - 1))
    // }

    // const M = (n) => {
    //     if (n == 0) return 0
    //     else return n - F(M(n - 1))
    // }

    // for (let index = 0; index < 36; index++) {
    //     time = `${F(index)}:${timeBoolean ? "00" : "30"}`;
    // timepicker.push(
    //     <button key={index} onClick={(e) => onClick(e.target.value)} className="py-1 mb-3 w-full text-2xl text-center text-purple-700 bg-white rounded-lg border-2 border-purple-700 cursor-pointer" value={time} >
    //         {time}
    //     </button >
    // );
    //     timeBoolean = !timeBoolean;
    // }
    const times = []
    //return how many times the hour repeats in the time picker
    // eg. if the duration is 30 min. 60/30 returns 2 so the repetition return 2 times 
    // that is 0:00 to 0:30, 0:30 - 1:30.... 
    // const repetition = 60 / Number(duration);
    const repetition = 60 / Number(duration);
    for (let i = 0; i < repetition; i++) {
        for (let hour = 0; hour < 23; hour++) {
            times.push(hour)
        }
    }
    //sort times so they can arrange accordingly
    times.sort((a, b) => {
        return a - b
    });

    let minute = 0;
    let index = 1;
    times.forEach((hour) => {
        let time = `${hour}:${(minute === 0) ? "00" : minute}`;
        timepicker.push(
            <button key={index} onClick={(e) => onClick(e.target.value)} className="py-1 mb-3 w-full text-2xl text-center text-purple-700 bg-white rounded-lg border-2 border-purple-700 cursor-pointer" value={time} >
                {time}
            </button >
        );
        if (minute < (60 - Number(duration))) {
            minute = minute + Number(duration);
        } else {
            minute = 0
        }
        index++;
    })
    return (
        <div className="overflow-x-hidden overflow-y-scroll h-72">
            {timepicker}
        </div>
    )
}

export default TimePicker;