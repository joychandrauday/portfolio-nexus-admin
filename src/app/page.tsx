import React, { FC } from "react";
import Head from "next/head";
import LoginPage from "./login/page";

const HomeBannerElements: FC = () => {
  return (
    <>
      {/* SEO Friendly Head */}
      <Head>
        <title>Joy Chandra Uday | Full Stack Developer</title>
        <meta
          name="description"
          content="I am a passionate MERN Stack Developer specializing in building dynamic and responsive web applications."
        />
        <meta
          name="keywords"
          content="MERN Stack, Developer, React, Next.js, MongoDB, Express.js, Node.js"
        />
        <meta name="author" content="Joy Chandra Uday" />
      </Head>

      <div className="min-h-screen">
        <LoginPage />
      </div>
    </>
  );
};

export default HomeBannerElements;
