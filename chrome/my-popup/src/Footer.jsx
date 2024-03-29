import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
    useEffect(() => {
        var settingsNavEl = document.getElementById("settingsNav");
        if (settingsNavEl) {
            document.getElementById("linksNav").click();
        }
    }, []);
    return (
        <footer>
            <div className="btm-nav max-w-xl mx-auto min-w-max dark:bg-darkMode border-t border-black">
                <NavLink to="/" id="linksNav">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="19"
                        height="18"
                        viewBox="0 0 22 22"
                        fill="none">
                        <path
                            d="M11.94 7.43803C12.5899 7.74828 13.1557 8.20996 13.5901 8.78427C14.0245 9.35857 14.3148 10.0287 14.4365 10.7385C14.5581 11.4482 14.5077 12.1768 14.2894 12.863C14.0712 13.5492 13.6914 14.173 13.182 14.682L8.68203 19.182C7.83811 20.0259 6.69351 20.5001 5.50003 20.5001C4.30655 20.5001 3.16195 20.0259 2.31803 19.182C1.47411 18.3381 1 17.1935 1 16C1 14.8065 1.47411 13.6619 2.31803 12.818L4.07503 11.061M17.425 10.439L19.182 8.68203C20.0259 7.83811 20.5001 6.69351 20.5001 5.50003C20.5001 4.30655 20.0259 3.16195 19.182 2.31803C18.3381 1.47411 17.1935 1 16 1C14.8065 1 13.6619 1.47411 12.818 2.31803L8.31803 6.81803C7.80866 7.32703 7.42889 7.95084 7.21061 8.63705C6.99233 9.32326 6.94191 10.0518 7.0636 10.7616C7.18528 11.4713 7.47552 12.1415 7.90992 12.7158C8.34432 13.2901 8.9102 13.7518 9.56003 14.062"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </NavLink>
                <NavLink to="/settings" id="settingsNav">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="19"
                        height="18"
                        viewBox="0 0 19 18"
                        fill="none">
                        <path
                            d="M7.75 3H17.5M7.75 3C7.75 3.39782 7.59196 3.77936 7.31066 4.06066C7.02936 4.34196 6.64782 4.5 6.25 4.5C5.85218 4.5 5.47064 4.34196 5.18934 4.06066C4.90804 3.77936 4.75 3.39782 4.75 3M7.75 3C7.75 2.60218 7.59196 2.22064 7.31066 1.93934C7.02936 1.65804 6.64782 1.5 6.25 1.5C5.85218 1.5 5.47064 1.65804 5.18934 1.93934C4.90804 2.22064 4.75 2.60218 4.75 3M4.75 3H1M7.75 15H17.5M7.75 15C7.75 15.3978 7.59196 15.7794 7.31066 16.0607C7.02936 16.342 6.64782 16.5 6.25 16.5C5.85218 16.5 5.47064 16.342 5.18934 16.0607C4.90804 15.7794 4.75 15.3978 4.75 15M7.75 15C7.75 14.6022 7.59196 14.2206 7.31066 13.9393C7.02936 13.658 6.64782 13.5 6.25 13.5C5.85218 13.5 5.47064 13.658 5.18934 13.9393C4.90804 14.2206 4.75 14.6022 4.75 15M4.75 15H1M13.75 9H17.5M13.75 9C13.75 9.39782 13.592 9.77936 13.3107 10.0607C13.0294 10.342 12.6478 10.5 12.25 10.5C11.8522 10.5 11.4706 10.342 11.1893 10.0607C10.908 9.77936 10.75 9.39782 10.75 9M13.75 9C13.75 8.60218 13.592 8.22064 13.3107 7.93934C13.0294 7.65804 12.6478 7.5 12.25 7.5C11.8522 7.5 11.4706 7.65804 11.1893 7.93934C10.908 8.22064 10.75 8.60218 10.75 9M10.75 9H1"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </NavLink>
                <NavLink id="helpNav" to="/help">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none">
                        <path
                            d="M7.629 5.519C8.8 4.494 10.7 4.494 11.871 5.519C13.043 6.544 13.043 8.206 11.871 9.231C11.668 9.41 11.441 9.557 11.201 9.673C10.456 10.034 9.751 10.672 9.751 11.5V12.25M18.75 10C18.75 11.1819 18.5172 12.3522 18.0649 13.4442C17.6126 14.5361 16.9497 15.5282 16.114 16.364C15.2782 17.1997 14.2861 17.8626 13.1942 18.3149C12.1022 18.7672 10.9319 19 9.75 19C8.5681 19 7.39778 18.7672 6.30585 18.3149C5.21392 17.8626 4.22177 17.1997 3.38604 16.364C2.55031 15.5282 1.88738 14.5361 1.43508 13.4442C0.982792 12.3522 0.75 11.1819 0.75 10C0.75 7.61305 1.69821 5.32387 3.38604 3.63604C5.07387 1.94821 7.36305 1 9.75 1C12.1369 1 14.4261 1.94821 16.114 3.63604C17.8018 5.32387 18.75 7.61305 18.75 10ZM9.75 15.25H9.758V15.258H9.75V15.25Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </NavLink>
            </div>
        </footer>
    );
};

export default Footer;
