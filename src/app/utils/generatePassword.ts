import { PasswordSettingsType } from "../type/type";

export default function generatePassword({
  length,
  isUppercase,
  isLowercase,
  isNumbers,
  isSymbols,
}: PasswordSettingsType) {
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
}
