"use client"

import { useEffect, useRef } from "react";
 
export const useClickOutside = ( elementRef, callback ) =>{

    const callbackRef = useRef();
    callbackRef.current = callback;

    const handleClickOutside = (e) =>{
        if(!elementRef?.current?.contains(e.target) && callbackRef.current){
            callbackRef.current();
        }
    }

    useEffect(()=>{
        document.addEventListener("click", handleClickOutside, true )
        return ()=>{
            document.removeEventListener("click", handleClickOutside, true);
        }
    }, [callbackRef, elementRef]);
}