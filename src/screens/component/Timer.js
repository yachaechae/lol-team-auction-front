import React, { useEffect, useRef } from "react";

const Timer = ({seconds, setSeconds}) =>{
    const timerId = useRef(null);
    
    useEffect(() => {
        timerId.current = setInterval(() => {
            setSeconds((prev) => prev - 1 )
        }, 1000);

        return () => clearInterval(timerId.current)
    },[seconds])

    useEffect(() => {
        if (seconds <= 0) {
            clearInterval(timerId.current)
        }
    },[seconds])

    return(
        <div className="timer">
            {seconds} 초
        </div>
    )
}

export default Timer;