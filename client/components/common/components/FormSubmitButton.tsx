"use client"

import { useFormStatus } from "react-dom"
import ThreeDotsBounce from "../Icons/3-dots-bounce";

export default function FormSubmitButton({label}:{label:string}){
    const status = useFormStatus();
    return(
        <div className="flex items-center justify-center">
          {status.pending ? <ThreeDotsBounce className="w-8 h-8" /> : <button type="submit" className="btn-hover">{label}</button>}
        </div>
    )
}