import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <Button variant="default">Test</Button>
      <div className="flex space-x-5 sm:space-x-6 items-center">
        <Checkbox id="terms1" />
        <div>
          <label
            htmlFor="terms1"
            className="text-sm text-almostWhite font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </label>
        </div>
      </div>
      <Slider />
    </main>
  );
}
