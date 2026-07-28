

import React, { useState,useEffect } from 'react'

export default function UseEffect() {
    const[count , setCount]=useState(0);
    useEffect(()=>{
        console.log("i am from useEffect")// db call
    },[count]);
    
  return (
    <>
      <h1>Welcome to useEffect</h1>
      <p>count:{count}</p>
      <button onClick={()=>setCount(count+1)}>Click me</button>
    </>
  )
}
