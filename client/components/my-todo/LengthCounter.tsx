import { useEffect, useState } from "react"

export default function LengthCounter({
    text,
    max
} : {
    text: number
    max: number
}){
    // const [length, setLength] = useState<number>(text.length)
    return(

          <p className={`text-xs text-right ${text > max ? 'text-red-500' : null}`}>{text}/{max}</p>
    )

}