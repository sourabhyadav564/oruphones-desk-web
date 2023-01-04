export default function VerificationIcon({ ...rest }) {
    return (
        <div className="self-center">
            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                    fill="#fff"
                    color="#4CAF50"
                    className="drop-shadow-sm"
                ></path>
            </svg> */}
            <svg xmlns="http://www.w3.org/2000/svg" width="38.792" height="38.792" viewBox="0 0 38.792 38.792">
                <defs>
                    <filter id="Path_6" x="0" y="0" width="38.792" height="38.792" filterUnits="userSpaceOnUse">
                        <feOffset dx="5" input="SourceAlpha" />
                        <feGaussianBlur stdDeviation="2.5" result="blur" />
                        <feFlood flood-opacity="0.161" />
                        <feComposite operator="in" in2="blur" />
                        <feComposite in="SourceGraphic" />
                    </filter>
                </defs>
                <g id="icons8-verified-account" transform="translate(2.5 7.5)">
                    <g transform="matrix(1, 0, 0, 1, -2.5, -7.5)" filter="url(#Path_6)">
                        <path id="Path_6-2" data-name="Path 6" d="M27.792,15.9a4.541,4.541,0,0,0-2.418-4A4.461,4.461,0,0,0,21.053,6.27a4.541,4.541,0,0,0-1.154.149,4.522,4.522,0,0,0-8.005,0,4.544,4.544,0,0,0-1.154-.149,4.461,4.461,0,0,0-4.321,5.623,4.522,4.522,0,0,0,0,8.006,4.461,4.461,0,0,0,4.321,5.623,4.541,4.541,0,0,0,1.154-.149,4.522,4.522,0,0,0,8.005,0,4.544,4.544,0,0,0,1.154.149A4.461,4.461,0,0,0,25.374,19.9,4.541,4.541,0,0,0,27.792,15.9Z" transform="translate(-1.5 3.5)" fill="#fff" />
                    </g>
                    <path id="Path_7" data-name="Path 7" d="M19,26.652l-4.41-4.41,1.682-1.682L19,23.287l5.7-5.7,1.682,1.682Z" transform="translate(-8.29 -9.505)" fill="#4caf50" />
            </g>
            </svg>
        </div>
    )
}


