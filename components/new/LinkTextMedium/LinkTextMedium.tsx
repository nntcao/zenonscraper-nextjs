import Link from "next/link";
import TextMedium from "../TextMedium/TextMedium";

export default function LinkTextMedium({href, children}) {
    return (
        <Link href={href}>
            <TextMedium>{children}</TextMedium>
        </Link>
    )
}