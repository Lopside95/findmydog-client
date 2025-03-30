import { toast } from "sonner";

interface MyToastProps {
  message: string;
}

const myToast = (message: string) => {
  return toast(<p>{message}</p>, {
    style: {
      fontFamily: "var(--font-serif)",
      boxShadow: "none",
      border: "none",
      width: "100%",
    },
  });
};

export default myToast;

// const MyToast = () => {
//   toast(<p>Successfuly updated</p>, {
//     style: { fontFamily: "var(--font-serif)", fontWeight: "500" },
//   });

//   return <></>;
// };

// export default MyToast;
