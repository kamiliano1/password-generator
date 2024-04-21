export type StrengthType = "" | "Too weak!" | "Weak" | "Medium" | "Strong";

type PasswordStrengthType = {
  name: StrengthType;
};

const passwordStyle = [
  {
    name: "",
    level: 0,
    background: "border-2 border-almostWhite",
  },
  {
    name: "Too weak!",
    level: 1,
    background: "bg-red",
  },
  {
    name: "Weak",
    level: 2,
    background: "bg-orange",
  },
  {
    name: "Medium",
    level: 3,
    background: "bg-yellow",
  },
  {
    name: "Strong",
    level: 4,
    background: "bg-neonGreen",
  },
];

export default function PasswordStrength({ name }: PasswordStrengthType) {
  const indicatorStyle = passwordStyle.filter((item) => item.name === name)[0];
  const { name: indicatorName, background, level } = indicatorStyle;
  return (
    <div className="bg-[#18171F] p-4 sm:px-8 sm:py-[1.375rem] flex items-center mb-4 sm:mb-8">
      <h2 className="uppercase text-grey text-[1rem] sm:text-body mr-auto">
        Strength
      </h2>
      <p className="uppercase text-almostWhite text-body sm:text-headingM mr-4">
        {indicatorName}
      </p>
      <div className="flex gap-x-2 ">
        {[0, 1, 2, 4].map((item, id) => (
          <StrengthIndicator
            key={id}
            color={background}
            isActive={id < level! ? true : false}
          />
        ))}
      </div>
    </div>
  );
}

function StrengthIndicator({
  color,
  isActive,
}: {
  color?: string;
  isActive: boolean;
}) {
  return isActive ? (
    <span className={`w-[10px] h-[28px] ${color}`}></span>
  ) : (
    <span className="w-[10px] h-[28px] border-2 border-almostWhite"></span>
  );
}
