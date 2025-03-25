"use client";

import NavPanel from "@/components/NavPanel";
import { useUser } from "@/hooks/useUser";
import { useOktaAuth } from "@okta/okta-react";
import { useEffect } from "react";

export default function HomeLayout({children}: { children: React.ReactNode }) {

      const { authState } = useOktaAuth();
      const {setUser} = useUser();

      const isAuthenticated = authState?.isAuthenticated;
    
      useEffect(() => {
        if (!isAuthenticated && isAuthenticated !== undefined) {
          setUser(null);
        }
        console.log("AuthState: ",authState?.isAuthenticated);
      }, [authState]);

    return (
        <section className="flex xl:gap-24 flex-col xl:flex-row">
            <div className="flex justify-center xl:justify-start h-[100%]">
                <NavPanel/>
            </div>
            {children}
        </section>
    );
}
