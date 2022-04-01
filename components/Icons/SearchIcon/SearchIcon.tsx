import styles from './SearchIcon.module.scss'

export default function SearchIcon(props) {
    return (
        <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_25_125)">
            <g filter="url(#filter0_d_25_125)">
            <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="#0AB30E"/>
            </g>
            </g>
            <defs>
            <filter id="filter0_d_25_125" x="-1" y="-1" width="25.49" height="25.49" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.141176 0 0 0 0 1 0 0 0 0 0 0 0 0 0.5 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_25_125"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_25_125" result="shape"/>
            </filter>
            <clipPath id="clip0_25_125">
            <rect width="24" height="24" fill="white"/>
            </clipPath>
            </defs>
        </svg>
    )
}