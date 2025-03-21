"use client";

import React from "react";

interface EducationItem {
    degree: string;
    institution: string;
    year: string;
    description: string;
}

const educationData: EducationItem[] = [
    {
        degree: "Bachelor of Arts in English Literature",
        institution: "National University Bangladesh",
        year: "2019 - Present",
        description: "A detailed study in English and European literature.",
    },
    {
        degree: "Higher Secondary Certificate",
        institution: "Govt. Janata College",
        year: "2018 - 2020",
        description:
            "Focused on science subjects with a specialization in mathematics and physics.",
    },
    {
        degree: "Secondary School Certificate",
        institution: "Lebukhali Habibullah Secondary School",
        year: "2012 - 2017",
        description: "Completed secondary education with a focus on general science.",
    },
];

const Education: React.FC = () => {
    return (
        <section>
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-left mb-6 text-white">
                    Education
                </h2>
                <div className="relative border-l-2 border-gray-600 pl-6">
                    {educationData.map((education, index) => (
                        <div key={index} className="mb-8">
                            <div className="absolute w-4 h-4 bg-blue-600 rounded-full -left-2.5 border-2 border-white"></div>
                            <time className="text-sm ">{education.year}</time>
                            <h3 className="text-lg font-semibold  mt-1">
                                {education.degree}
                            </h3>
                            <p className="text-base text-gray-500">{education.institution}</p>
                            <p className="text-sm ">{education.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
