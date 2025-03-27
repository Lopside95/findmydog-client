// import React, { createContext, useContext, useState } from "react";
// import type { PostSchema } from "./types/schemas";

// // interface PostData {
// //   title: string;
// //   description: string;
// //   tags: string[];
// //   img: string;
// //   urgency: number;
// //   longitude: number;
// //   latitude: number;
// //   userId?: number;
// // }

// interface PostContextType {
//   postData: PostSchema;
//   setPostData: React.Dispatch<React.SetStateAction<PostData>>;
// }

// const PostContext = createContext<PostContextType | undefined>(undefined);

// export const PostProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [postData, setPostData] = useState<PostData>({
//     title: "",
//     description: "",
//     tags: [],
//     img: "",
//     urgency: 3,
//     longitude: 0,
//     latitude: 0,
//   });

//   return (
//     <PostContext.Provider value={{ postData, setPostData }}>
//       {children}
//     </PostContext.Provider>
//   );
// };

// export const usePostContext = () => {
//   const context = useContext(PostContext);
//   if (!context) {
//     throw new Error("usePostContext must be used within a PostProvider");
//   }
//   return context;
// };
