import React from 'react';
import Agent from "@/components/Agent";
const Page = () =>{
    return(
        <>
            <h3>Interview Generation</h3>
            <Agent username = "You" type="generate" userId="user"/>
        </>
    )
}
export default Page;