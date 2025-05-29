import React from "react";
import { Typography } from "../ui/typography";

interface Props {
  sectionTitle: string;
}

const SectionSeparator = ({ sectionTitle }: Props) => {
  return (
    <section className="text-center px-4 py-8">
      <Typography
        variant="h3"
        className="capitalize font-extrabold text-2xl sm:text-3xl tracking-wide text-foreground hover:text-chart-1 transition-colors duration-300"
      >
        {sectionTitle}
      </Typography>

      {/* Stylish gradient underline */}
      <div className="mt-2 sm:mt-3 mx-auto h-[3px] w-24 rounded-full bg-primary transition-all duration-500 hover:w-36" />
    </section>
  );
};

export default SectionSeparator;
