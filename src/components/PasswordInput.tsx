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
import { EyeOff } from "lucide-react";
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
  const { control } = useFormContext();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <>
          <FormItem className="w-full">
            <FormLabel className="pl-1.5 flex gap-4 text-base-txtClr ">
              {" "}
              {label}
              <FormMessage className="text-md capitalize dark:text-red-400" />
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  {...field}
                  className=""
                  placeholder={placeholder}
                  type={showPassword ? "" : "password"}
                />

                {showPassword ? (
                  <EyeOff
                    className="absolute right-4 top-1/2 w-5 -translate-y-1/2 cursor-pointer text-base-bg opacity-70"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <EyeOff
                    className="absolute right-4 top-1/2 w-5 -translate-y-1/2 cursor-pointer text-base-bg opacity-70"
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
