import { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Eye, EyeClosed, EyeOff } from "lucide-react";
import { FormInput } from "@/types/utils";

const PasswordInput = ({
  name,
  type,
  label,
  desc,
  placeholder,
  cn,
  defVal,
}: FormInput) => {
  const { control, getFieldState } = useFormContext();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const fieldStyle = `w-full ${cn} border-none bg-secondary rounded-none shadow-none caret-accent focus:border-none focus:shadow-none focus:ring-0 focus:outline-none focus:shadow-none focus:none focus-visible:ring-0`;

  const error = getFieldState(name).error;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <>
          <FormItem className="w-full">
            <FormLabel className={`${error?.message ? "hidden" : ""} text-2xl`}>
              {label}
            </FormLabel>
            {/* <FormLabel className={`${error?.message ? "hidden" : ""} text-2xl`}>
              {label}
            </FormLabel> */}
            <FormMessage />
            <FormControl>
              <div className="relative">
                <Input
                  {...field}
                  className={fieldStyle}
                  placeholder={placeholder}
                  type={showPassword ? "" : "password"}
                />

                {showPassword ? (
                  <EyeOff
                    className="absolute right-4 top-1/2 w-5 -translate-y-1/2 cursor-pointer text-base-bg opacity-70 text-accent-alt"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <Eye
                    className="absolute right-4 top-1/2 w-5 -translate-y-1/2 cursor-pointer text-base-bg opacity-70 text-accent"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
            </FormControl>
          </FormItem>
        </>
      )}
    />
  );
};

export default PasswordInput;
