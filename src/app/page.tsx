"use client";
import PasswordStrength from "@/components/PasswordStrength/PasswordStrength";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
type PasswordSettingsType = {
  length: number;
  isUppercase: boolean;
  isLowercase: boolean;
  isNumbers: boolean;
  isSymbols: boolean;
};
export default function Home() {
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
    console.log(data);
  }
  return (
    <main className="">
      <div className="w-[343px] p-4 bg-[#979797]">
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
                      Include Numbers
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>
            <PasswordStrength name="Too weak!" />
            <Button variant="default">Generate</Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
