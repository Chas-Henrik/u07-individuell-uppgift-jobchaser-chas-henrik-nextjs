"use client";

import * as React from "react";
import { useContext } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { ThemeContext } from "@/context/themeContext";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";


type ComboBoxItem = {
    value: string;
    label: string;
}

type ComboBoxProps = {
    filterTitle: string;
    filterTerms: string[];
    handleSelect: (value: string) => void;
}

export function ComboBox({filterTitle, filterTerms, handleSelect}: ComboBoxProps): React.JSX.Element {
const [open, setOpen] = React.useState(false);
const [value, setValue] = React.useState("");
const comboBoxItems: ComboBoxItem[] = filterTerms.map((item) => { return {value: item, label: item} });
const themeContext = useContext(ThemeContext);
if (!themeContext) {
    throw new Error("ThemeContext is undefined");
}
const { darkTheme } = themeContext;
const themeStyles = darkTheme ? 'bg-stone-800 text-gray-200 ' : 'bg-white text-gray-700 ';
const themeStylesDropDown = darkTheme ? 'bg-stone-800 text-gray-200 ' : 'bg-white text-gray-800 ';

return (
<Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger asChild>
    <Button
        title={`Select '${filterTitle}'...`}
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className={themeStyles + "shadow-lg overflow-hidden text-wrap text-ellipsis w-[250px] justify-between"}
    >
        {value
        ? comboBoxItems.find((item) => item.value === value)?.label
        : `Select '${filterTitle}'...`}
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
    </PopoverTrigger>
    <PopoverContent className="w-[250px] p-0">
    <Command className={themeStylesDropDown}>
        <CommandInput placeholder="Search item..." />
        <CommandList>
        <CommandEmpty>{`No '${filterTitle}' found.`}</CommandEmpty>
        <CommandGroup>
            {comboBoxItems.map((item) => (
            <CommandItem
                key={item.value}
                value={item.value}
                className={themeStylesDropDown}
                onSelect={(currentValue: string) => {
                setValue(currentValue === value ? "" : currentValue);
                setOpen(false);
                handleSelect(currentValue);
                }}
            >
                <Check
                className={cn(
                    "mr-2 h-4 w-4",
                    value === item.value ? "opacity-100" : "opacity-0"
                )}
                />
                {item.label}
            </CommandItem>
            ))}
        </CommandGroup>
        </CommandList>
    </Command>
    </PopoverContent>
</Popover>
);
}
