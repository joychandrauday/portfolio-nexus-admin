/* eslint-disable @typescript-eslint/no-explicit-any */
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const DashboardPage = async () => {
  // Get session data
  const session = await getServerSession(authOptions);

  // If session is null, handle it by using default values
  const sanitizedSession = session ? sanitizeSessionData(session) : {
    user: {
      name: "Guest",
      email: "No email available",
      image: "/favicon.png",
    },
  };

  function sanitizeSessionData(session: any) {
    return {
      user: {
        name: session.user?.name || "Guest",
        email: session.user?.email || "No email available",
        image: session.user?.image || "/favicon.png",
      },
    };
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-r  p-8 flex justify-center items-center">
      {/* Main Card */}
      <Card className="max-w-xl w-full p-8 bg-white bg-opacity-90 shadow-2xl rounded-xl border border-gray-800 z-10 relative backdrop-blur-lg">
        {/* Card Header */}
        <CardHeader className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome,{" "}
            <span className="text-yellow-500">{sanitizedSession.user?.name}</span>
          </h1>
          <p className="text-gray-600 mt-2 text-lg">This is your personalized dashboard</p>
        </CardHeader>

        {/* Card Content */}
        <CardContent className="flex flex-col items-center mt-8">
          <div className="w-32 h-32 relative">
            <Image
              src={sanitizedSession.user?.image}
              width={120}
              height={120}
              alt={sanitizedSession.user?.name}
              className="rounded-md border-4 border-gray-300 shadow-xl"
            />
          </div>
          <p className="text-lg mt-4 text-gray-800 font-medium">{sanitizedSession.user?.email}</p>
        </CardContent>
      </Card>

      <div className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 opacity-70 transform rotate-45"></div>
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 opacity-60 transform rotate-45"></div>
    </div>
  );
};

export default DashboardPage;
