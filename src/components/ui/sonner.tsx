import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group text-2xl text-accent shadow-none"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "text-accent",
          "--normal-border": "var(--border)",
          // "--normal-font": "var(--font-serif)",

          "--normal-font": "var(--font-serif)",
        } as React.CSSProperties
      }
      {...props}
      position="top-center"
    />
  );
};

export { Toaster };
