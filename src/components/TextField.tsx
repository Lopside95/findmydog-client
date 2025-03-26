import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormInput } from "@/types/utils";
import { useFormContext } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

const TextField = ({
  name,
  type,
  label,
  desc,
  placeholder,
  cn,
  defVal,
}: FormInput) => {
  const { control, getFieldState } = useFormContext();

  const fieldStyle = `w-full ${cn} border-none bg-my-secondary rounded-none shadow-none caret-my-primary focus:border-none focus:shadow-none focus:ring-0 focus:outline-none focus:shadow-none focus:none focus-visible:ring-0`;

  const error = getFieldState(name).error;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={`${error?.message ? "hidden" : ""} text-2xl`}>
            {label}
          </FormLabel>
          <FormMessage />
          <FormControl>
            <Input
              {...field}
              className={fieldStyle}
              type={type}
              placeholder={placeholder}
            />
          </FormControl>
          <FormDescription>{desc}</FormDescription>
        </FormItem>
      )}
    />
  );
};

export default TextField;
