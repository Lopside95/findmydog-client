import { Check, ChevronsUpDown, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  TagsCommandInput,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { PostSchema, Tag } from "@/types/schemas";
import { useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { FormInput } from "@/types/utils";

interface TagsInputProps {
  input?: FormInput;
  tags: Tag[];
}

const TagsInput = ({ input, tags }: TagsInputProps) => {
  const { getFieldState, setFocus } = useFormContext<PostSchema>();

  const [open, setOpen] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const handleSelect = (currentValue: string) => {
    const selectedTag = tags.find(
      (tag) => tag.name.toLowerCase() === currentValue.toLowerCase()
    );

    if (selectedTag && !selectedTags.some((tag) => tag.id === selectedTag.id)) {
      setSelectedTags([...selectedTags, selectedTag]);
    }
    setOpen(false);
  };

  const removeTag = (tagId: number) => {
    setSelectedTags(selectedTags.filter((tag) => tag.id !== tagId));
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <Command className="">
        {/* <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            Select tags...
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0"> */}

        {/* <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
          </PopoverTrigger>
          <PopoverContent className="w-92 p-0"> */}
        {/* <CommandList className="w-full"> */}
        <TagsCommandInput
          className={`w-[100%] border-none bg-secondary rounded-none shadow-none caret-accent focus:border-none focus:shadow-none focus:ring-0 focus:outline-none focus:none focus-visible:ring-0`}
          onClick={() => setOpen(!open)}
          placeholder="Search tags..."
          style={{ borderRadius: "0px" }}
        />
        <CommandList
          className={`${open ? "h-52" : "h-0"} rounded-none overflow-scroll`}
        >
          <CommandEmpty>No matching tags</CommandEmpty>
          <CommandGroup className="rounded-none">
            {tags.map((tag) => (
              <CommandItem
                key={tag.id}
                value={tag.name}
                onSelect={handleSelect}
                className="bg-none hover:bg-secondary-alt rounded-none"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedTags.some((t) => t.id === tag.id)
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {tag.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>

      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <Badge
              key={tag.id}
              variant="secondary"
              className="flex items-center gap-1"
              onClick={() => removeTag(tag.id)}
            >
              {tag.name}
              <X className="h-3 w-3 cursor-pointer" />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagsInput;
