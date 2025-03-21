import Image from "next/image";

const NotFoundPage = () => {
  return (
    <div className="w-full flex items-center justify-center min-h-screen mx-auto">
      <div className="">
        <Image
          src="https://i.ibb.co/K0NmH2J/favicon.png"
          width={100}
          height={100}
          alt="not found page"
          className="mx-auto"
        />
        <div className="py-2">
          <h1 className="text-gray-600 font-bold">
            X Page Not found or has been deleted!
          </h1>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
