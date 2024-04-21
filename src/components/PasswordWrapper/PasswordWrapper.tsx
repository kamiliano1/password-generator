"use client";
import PasswordStrength, {
  StrengthType,
} from "@/components/PasswordStrength/PasswordStrength";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { FaRegCopy } from "react-icons/fa";
import { MdArrowForward } from "react-icons/md";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useState } from "react";
import clsx from "clsx";
import { cn } from "@/lib/utils";
import { PasswordSettingsType } from "@/app/type/type";
import generatePassword from "@/app/utils/generatePassword";

export default function PasswordWrapper() {
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState<StrengthType>("");
  const [showCopiedInfo, setShowCopiedInfo] = useState(false);
  const form = useForm<PasswordSettingsType>({
    defaultValues: {
      length: 0,
      isUppercase: false,
      isLowercase: false,
      isNumbers: false,
      isSymbols: false,
    },
  });
  function onSubmit(data: PasswordSettingsType) {
    const { isLowercase, isNumbers, isSymbols, isUppercase, length } = data;

    if (
      length == 0 ||
      (!isLowercase && !isNumbers && !isSymbols && !isUppercase)
    )
      setPasswordStrength("");
    else if (length < 5) setPasswordStrength("Too weak!");
    else if (length < 10) setPasswordStrength("Weak");
    else if (length < 15) setPasswordStrength("Medium");
    else setPasswordStrength("Strong");
    setGeneratedPassword(
      generatePassword({
        isLowercase,
        isNumbers,
        isSymbols,
        isUppercase,
        length,
      })
    );
  }
  const copyToClipboard = () => {
    if (!generatedPassword) return;
    navigator.clipboard.writeText(generatedPassword);
    setShowCopiedInfo(true);
    setTimeout(() => {
      setShowCopiedInfo(false);
    }, 3000);
  };

  return (
    <>
      <div className="bg-darkGrey flex items-center w-full p-4 sm:px-8 sm:py-[1.155rem] mb-6 relative justify-center">
        <h1 className="text-[1rem] sm:text-[1.5rem] lg:text-headingM text-grey mb-4 sm:mb-8 absolute z-[5] top-[-2.8rem] sm:top-[-3.8rem] text-center">
          Password Generator
        </h1>
        <p
          className={cn(
            " mr-auto text-headingM sm:text-headingL break-words",
            " text-almostWhite/20 w-[90%]",
            {
              "text-almostWhite/100": generatedPassword,
              "sm:text-[1.8rem]": form.getValues("length") == 20,
            }
          )}
        >
          {generatedPassword || "P4$5W0rD!"}
        </p>

        <p
          className={clsx("text-neonGreen text-body mr-4 w-full", {
            hidden: !showCopiedInfo,
          })}
        >
          Copied
        </p>
        <FaRegCopy
          className={clsx("text-neonGreen size-6 ", {
            "cursor-pointer hover:text-almostWhite": generatedPassword,
          })}
          onClick={copyToClipboard}
        />
      </div>
      <div className="w-full p-4 sm:p-8 sm:pt-6 bg-darkGrey">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="length"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between ">
                    <FormLabel className="text-almostWhite text-[1rem] sm:text-body">
                      Character Length
                    </FormLabel>
                    <p className="text-neonGreen text-headingM sm:text-headingL sm:font-semibold">
                      {form.getValues("length")}
                    </p>
                  </div>
                  <FormControl>
                    <Slider
                      defaultValue={[0]}
                      min={0}
                      max={20}
                      step={1}
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="space-y-5 mb-8">
              <FormField
                control={form.control}
                name="isUppercase"
                render={({ field }) => (
                  <FormItem className="flex space-y-0 space-x-5 sm:space-x-6 items-center">
                    <FormControl>
                      <Checkbox
                        name="isUppercaseActivated"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-[1rem] sm:text-body text-almostWhite font-bold leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Include Uppercase Letters
                    </FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isLowercase"
                render={({ field }) => (
                  <FormItem className="flex space-y-0 space-x-5 sm:space-x-6 items-center">
                    <FormControl>
                      <Checkbox
                        name="isLowercaseActivated"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-[1rem] sm:text-body text-almostWhite font-bold leading-none cursor-pointer  peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Include Lowercase Letters
                    </FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isNumbers"
                render={({ field }) => (
                  <FormItem className="flex space-y-0 space-x-5 sm:space-x-6 items-center">
                    <FormControl>
                      <Checkbox
                        name="isNumbersActivated"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-[1rem] sm:text-body text-almostWhite font-bold leading-none cursor-pointer  peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Include Numbers
                    </FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isSymbols"
                render={({ field }) => (
                  <FormItem className="flex space-y-0 space-x-5 sm:space-x-6 items-center">
                    <FormControl>
                      <Checkbox
                        name="isSymbolsActivated"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-[1rem] sm:text-body text-almostWhite font-bold leading-none cursor-pointer  peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Include Symbols
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>
            <PasswordStrength name={passwordStrength} />
            <Button variant="default">
              Generate <MdArrowForward className="size-5 ml-4" />
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
