interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export const SectionHeading = ({ title, subtitle }: SectionHeadingProps) => (
  <div className="mb-10">
    <h2 className="font-serif text-3xl md:text-4xl text-text-primary tracking-tight leading-tight">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-3 text-text-secondary text-lg">{subtitle}</p>
    )}
  </div>
);
