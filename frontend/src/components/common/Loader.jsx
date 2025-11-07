import { Loader2 } from "lucide-react"

export const Loader = () => {
    return (
        <div className="fixed top-0 left-0 backdrop-blur-md h-[100dvh]">
            <Loader2 size={24} className="animate-spin" /> 
        </div>
    )
}