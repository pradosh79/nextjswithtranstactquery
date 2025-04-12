import React, { PropsWithChildren, useEffect } from "react";
import ResponsiveAppBar from "../header";
// import FooterFile from "../footer/footerFile";


// interface props {
//     children: React.ReactNode;
// }


export default function Wrapper({ children }: PropsWithChildren) {
    const header = ['/', '/registation'];
    //   const shouldShowHeader = !header.includes(location.pathname);
    return (
        <>
            {<ResponsiveAppBar />}
            {children}
        </>
    );
}