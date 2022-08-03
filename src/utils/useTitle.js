import { useEffect } from "react"

const useTitle = (title) => {
    useEffect(() => {
        const nameTitle = document.title
        document.title = `${title} | Al Quran`
        return () => {
            document.title = nameTitle
        }
    })
}

export default useTitle