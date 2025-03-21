/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
// get all products
export const getAllCategory = async () => {
    try {
        const res = await fetch(
            `${process.env.SERVER_URL}/category`
            , {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: "no-store",
            });
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};

// export const getAllListingsByUser = async (page?: string, limit?: string) => {
//     const session = await getServerSession(authOptions);

//     try {
//         const res = await fetch(
//             `${process.env.SERVER_API}/listings/user?limit=${limit}&page=${page}`,
//             {
//                 headers: {
//                     authorization: `${session?.user?.accessToken}`,
//                 },
//             }
//         );
//         const data = await res.json();
//         // revalidateTag("PRODUCT");
//         return data;
//     } catch (error: any) {
//         return Error(error.message);
//     }
// };

// // get single product
// export const getSingleProduct = async (productId: string) => {
//     try {
//         const res = await fetch(
//             `${process.env.SERVER_API}/listings/${productId}`,
//         );
//         const data = await res.json();
//         return data;
//     } catch (error: any) {
//         return Error(error.message);
//     }
// };
