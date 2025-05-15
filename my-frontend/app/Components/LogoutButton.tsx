'use client';

import { useRouter } from "next/navigation";
import MenuLink from "./navbar/MenuLink";
import { resetAuthCookies } from "../lib/action";

const LogoutButton: React.FC = () => {
    const router = useRouter();

    const submitLogout = async () => {
        console.log("logout submit");
        
        resetAuthCookies();

        router.push('/')
    }

    return (
        <MenuLink
            label="Log out"
            onClick={submitLogout}
        />
    )
}

export default LogoutButton;