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
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useState } from "react";
import clsx from "clsx";
type PasswordSettingsType = {
  length: number;
  isUppercase: boolean;
  isLowercase: boolean;
  isNumbers: boolean;
  isSymbols: boolean;
};
const generatePassword = ({
  length,
  isUppercase,
  isLowercase,
  isNumbers,
  isSymbols,
}: PasswordSettingsType) => {
  const characterArray = [];
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "acdefghijklnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "@#$%^&*";
  let password = "";
  if (isUppercase) characterArray.push(uppercase);
  if (isLowercase) characterArray.push(lowercase);
  if (isNumbers) characterArray.push(numbers);
  if (isSymbols) characterArray.push(symbols);
  if (characterArray.length < 1) return "";
  for (let index = 0; index < length; index++) {
    const randomArray = Math.floor(Math.random() * characterArray.length);
    const randomChar = Math.floor(
      Math.random() * characterArray[randomArray].length
    );
    password += characterArray[randomArray][randomChar];
  }
  return password;
};
export default function Home() {
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [passwordStrength, setPasswordStrength] =
    useState<StrengthType>("Medium");
  const [showCopiedInfo, setShowCopiedInfo] = useState(false);
  const form = useForm<PasswordSettingsType>({
    defaultValues: {
      length: 10,
      isUppercase: true,
      isLowercase: true,
      isNumbers: true,
      isSymbols: false,
    },
  });

  function onSubmit(data: PasswordSettingsType) {
    const { isLowercase, isNumbers, isSymbols, isUppercase, length } = data;
    // let typeCharacterScore = 0;
    // if (isLowercase) typeCharacterScore += 1;
    // if (isNumbers) typeCharacterScore += 1;
    // if (isSymbols) typeCharacterScore += 2;
    // if (isUppercase) typeCharacterScore += 1;
    // console.log(length, "length");
    // console.log(length < 5, "length < 5");
    // console.log(typeCharacterScore, "typeCharacterScore");

    if (length < 5) setPasswordStrength("Too weak!");
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
    <main className="max-w-[540px] mx-auto min-h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-0">
      <h1 className="text-[1rem] sm:text-[1.5rem] lg:text-headingM text-grey mb-4 sm:mb-8">
        Password Generator
      </h1>
      <div className="bg-darkGrey flex items-center w-full p-4 mb-6">
        <p
          className={clsx(
            "text-almostWhite/20 text-headingM sm:text-headingL mr-auto",
            { "text-almostWhite/100": generatedPassword }
          )}
        >
          {generatedPassword || "P4$5W0rD!"}
        </p>

        <p
          className={clsx(
            "text-neonGreen opacity-0 duration-300 text-body mr-4",
            { "opacity-100": showCopiedInfo }
          )}
        >
          Copied
        </p>
        <FaRegCopy
          className="text-neonGreen size-5"
          onClick={copyToClipboard}
        />
      </div>
      <div className="w-full p-4 bg-darkGrey">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="length"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-almostWhite text-[1rem] sm:text-body">
                      Character Length
                    </FormLabel>
                    <p className="text-neonGreen text-headingM sm:text-headingL">
                      {form.getValues("length")}
                    </p>
                  </div>
                  <FormControl>
                    <Slider
                      defaultValue={[10]}
                      min={1}
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
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-[1rem] sm:text-body text-almostWhite font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
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
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-[1rem] sm:text-body text-almostWhite font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
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
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-[1rem] sm:text-body text-almostWhite font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
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
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-[1rem] sm:text-body text-almostWhite font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
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
    </main>
  );
}
