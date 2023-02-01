import { format } from "date-fns"
import { useEffect, useState } from "react"
import { MensagemProps } from "../reducers/reducer"

export function Mensagem({ author, content }: MensagemProps) {
    const [date, setDate] = useState("")

    useEffect(() => {
        setDate(format(new Date(), 'HH:mm'))
    },[])

    return (
        <div className="flex flex-col mt-7 gap-3 w-full flex-wrap whitespace-pre-wrap">
            <div className={`text-xs ${author === "Cecilia" ? 'mr-auto' : 'ml-auto'}`}>{author} - {date}</div>
            <div className={`
                rounded-br-lg
                rounded-bl-lg
                text-sm
                w-72
                md:w-max p-4
                break-words
                ${author === "Cecilia" ? 'bg-violet-950  rounded-tr-lg mr-auto' : 'bg-cyan-550 rounded-tl-lg ml-auto'}`}>
                <p className="break-words">{content}</p>
            </div>
        </div>
    )
}

