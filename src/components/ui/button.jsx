import React from "react";

const buttonVariant = {
  ghost: "hover:bg-purple-500 hover:text-black",
  cinema: "bg-gradient-to-r from-primary to-accent",
  hero: "bg-cinema-gold text-background hover:bg-cinema-gold-dark font-semibold transition-smooth shadow-elevated",
  outline:
    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  glass:
    "bg-background/10 border border-primary/20 text-foreground backdrop-blur-sm hover:bg-background/20 transition-smooth",
};
export default function Button({ children, variant, className, ...props }) {
  const buttonClasses = `${className} ${buttonVariant[variant]} flex justify-center items-center rounded-lg`;
  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
}
