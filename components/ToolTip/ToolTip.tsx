import Image from "next/image"
import styles from "./ToolTip.module.scss"
import { useState, useEffect, useRef } from "react"

function ToolTip({ title, body }) {
    
    const [showBody, setShowBody] = useState(false)
    const toolTipButton = useRef(null)
    useOutsideAlerter(toolTipButton, () => setShowBody(false))

    if (showBody) {
        return (
            <div onClick={() => {setShowBody(true)}} ref={toolTipButton}>
                <Image src="/help_black_24dp.svg" width={24} height={24}/>
                <TextBox title={title} body={body} />
            </div>
        )
    } else {
        return (
            <div onClick={() => {setShowBody(true)}} ref={toolTipButton}>
                <Image src="/help_black_24dp.svg" width={24} height={24}/>
            </div>
        )    
    }
}

function TextBox({ title, body }) {
    return (
        <div>
            <span className={}>
                {title}
            </span>
            <span>
                {body}
            </span>
        </div>
    )
}

function useOutsideAlerter(ref, handleClickOutside) {
    useEffect(() => {
        function checkClickLocation(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                handleClickOutside()
            }
        }
        document.addEventListener("mousedown", checkClickLocation)
        return () => {
            document.removeEventListener("mousedown", checkClickLocation)
        }
    })
}

export default ToolTip