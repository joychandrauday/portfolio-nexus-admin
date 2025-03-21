
"use client";

import { TypeAnimation } from "react-type-animation";


const Designation = ({ }) => {
    return (
        <TypeAnimation
            className="inline text-lg md:text-xl font-semibold"
            sequence={[
                "Full Stack Developer",
                1500,
                "MERN Stack Developer",
                1500,
                "Backend Developer",
                1500,
                "Web App Developer",
                1500,
                "Tech Enthusiast",
                1500,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
        />
    );
};

export default Designation;
