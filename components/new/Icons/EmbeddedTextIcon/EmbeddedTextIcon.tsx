import styles from './EmbeddedTextIcon.module.scss'

export default function EmbeddedTextIcon(props) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_670_50)">
                <g filter="url(#filter0_d_670_50)">
                    <path d="M2.5 4V7H7.5V19H10.5V7H15.5V4H2.5ZM21.5 9H12.5V12H15.5V19H18.5V12H21.5V9Z" fill="#0AB30E" />
                </g>
            </g>
            <defs>
                <filter id="filter0_d_670_50" x="-1.5" y="0" width="27" height="23" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.141176 0 0 0 0 1 0 0 0 0 0 0 0 0 0.5 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_670_50" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_670_50" result="shape" />
                </filter>
                <clipPath id="clip0_670_50">
                    <rect width="24" height="24" fill="white" />
                </clipPath>
            </defs>
        </svg>
    )
}