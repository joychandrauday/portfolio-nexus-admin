import React from 'react';

const SkillTree = () => {
  return (
    <div className="relative flex h-[600px] w-full items-center justify-center p-10 bg-gray-50">
      {/* Main Tree Container */}
      <div className="flex flex-col items-center justify-between gap-10 w-full max-w-3xl">

        {/* Frontend Branch */}
        <div className="flex flex-row items-center justify-around w-full">
          <SkillNode skill="HTML" color="blue-500" />
          <SkillNode skill="CSS" color="blue-500" />
          <SkillNode skill="JavaScript" color="yellow-500" />
          <SkillNode skill="React" color="cyan-500" />
        </div>

        {/* Backend Branch */}
        <div className="flex flex-row items-center justify-around w-full">
          <SkillNode skill="Node.js" color="green-500" />
          <SkillNode skill="Express.js" color="green-500" />
          <SkillNode skill="MongoDB" color="green-500" />
          <SkillNode skill="REST API" color="green-500" />
        </div>

        {/* Others Branch */}
        <div className="flex flex-row items-center justify-around w-full">
          <SkillNode skill="Git" color="purple-500" />
          <SkillNode skill="Docker" color="purple-500" />
          <SkillNode skill="AWS" color="purple-500" />
          <SkillNode skill="GraphQL" color="purple-500" />
        </div>

      </div>

      {/* Connect nodes with beams */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Frontend to Backend */}
        <AnimatedBeam from="HTML" to="Node.js" curvature={-50} />
        <AnimatedBeam from="CSS" to="Express.js" curvature={50} />
        <AnimatedBeam from="JavaScript" to="MongoDB" curvature={-50} />
        <AnimatedBeam from="React" to="REST API" curvature={50} />

        {/* Frontend to Others */}
        <AnimatedBeam from="HTML" to="Git" curvature={50} />
        <AnimatedBeam from="CSS" to="Docker" curvature={-50} />
        <AnimatedBeam from="JavaScript" to="AWS" curvature={50} />
        <AnimatedBeam from="React" to="GraphQL" curvature={-50} />
      </div>
    </div>
  );
};

// Skill Node Component
const SkillNode = ({ skill, color }: { skill: string, color: string }) => {
  return (
    <div
      className={`flex items-center justify-center w-24 h-24 rounded-full bg-${color} text-white font-bold text-xl`}
      id={skill}
    >
      {skill}
    </div>
  );
};

// Animated Beam Component (Just a placeholder for now, you can create your own logic)
const AnimatedBeam = ({
  from,
  to,
  curvature,
}: {
  from: string;
  to: string;
  curvature: number;
}) => {
  return (
    <svg className="absolute" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <path
        d={`M${from} ${curvature} Q50 50, ${to} ${curvature}`}
        stroke="black"
        strokeWidth="2"
        fill="transparent"
      />
    </svg>
  );
};

export default SkillTree;
