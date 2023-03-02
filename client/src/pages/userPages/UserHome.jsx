import React from "react";
import UserNavbar from '../../layouts/UserNavbar'
import UserBanner from '../../compnents/userComponents/UserBanner'
import Services from '../../compnents/userComponents/Service'
import SecondBanner from '../../compnents/userComponents/SecondBanner'
import UserFooter from '../../layouts/UserFooter'
export default function UserHome() {
    return (
        <div>
           <UserNavbar/> 
           <UserBanner/>
           <Services/>
           <SecondBanner/>
           <UserFooter/>
        </div>
    );
}
