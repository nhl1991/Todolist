'use client'

import { useAuth } from "@/hooks/useAuth"
import { SignOutResponse } from "@/types/todo";

import { useRouter } from "next/navigation";

export default function Logout({ action }: {action: () => Promise<SignOutResponse>}){
    const { setUser } = useAuth();
    const router = useRouter();
    const handleLogout = async () => {
        const result = await action();
        if(result.success || result.code === 401){
            setUser(null);
            router.push('/');
        }else {
            alert(result.message);
        }
    }

    return(
        <button className="btn-hover" onClick={handleLogout}>SIGN OUT</button>
    )
}