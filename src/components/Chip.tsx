import React, { ReactNode } from "react";
import "./Chip.css";
import { returnRandomFromSeed } from "../functions/ReturnRandomFromSeed";

type ChipProps = {
  text: string;
};

const Chip: React.FC<ChipProps> = ({ text }) => {
  const colorClass = returnRandomFromSeed(text, [
    "from-primary-700 text-primary-100",
    "from-secondary-700 text-secondary-100",
    "from-accent-700 text-accent-100",
    "from-red-700 text-red-100",
    "from-orange-800 text-orange-100",
    "from-green-700 text-green-100",
    "from-blue-700 text-blue-100",
    "from-purple-700 text-purple-100",
    "from-pink-700 text-pink-100",
    "from-indigo-700 text-indigo-100",
    "from-teal-700 text-teal-100",
  ]);

  return <div className={`chip ${colorClass}`}>{text}</div>;
};

export default Chip;
