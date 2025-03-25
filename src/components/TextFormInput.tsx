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

  const fieldStyle = `w-80 ${cn}`;

  const error = getFieldState(name).error;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={`${error?.message ? "hidden" : ""}`}>
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
