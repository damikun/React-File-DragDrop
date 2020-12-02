import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import clsx from "clsx";

export type StayledButtonPorps = {
  children?: React.ReactNode;
  selected?: boolean;
  icon?: IconProp;
  isloading?: boolean;
  loadingPlaceholder?: React.ReactNode;
  variant?: keyof typeof VARIANTS;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const VARIANTS = {
  primarygray: {
    base: "text-gray-500 hover:bg-gray-200 hover:text-gray-700",
    selected: "bg-blue-500 text-white font-bold",
  },

  primaryblue: {
    base: "text-blue-500 hover:bg-gray-200 hover:text-blue-500",
    selected: "bg-blue-500 text-white font-bold",
  },

  invisible: {
    base: "",
    selected: "",
  },
};

export default function StayledButton({
  children,
  selected,
  variant = "primarygray",
  isloading,
  loadingPlaceholder,
  icon,
  disabled,
  onClick,
  ...rest
}: StayledButtonPorps) {
  const Var = VARIANTS[variant] || VARIANTS.primaryblue;

  function HandleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
      onClick && onClick(event);
  }

  return (
    <button
      onClick={HandleClick}
      disabled={disabled || isloading}
      {...rest}
      className={clsx(
        `flex-no-wrap 
        bg-transparent 
        px-1 my-auto
        h-full  
        font-semibold 
        border 
        rounded-md 
        outline-none focus:outline-none 
        transition 
        border-transparent 
        duration-200 `,
        selected ? Var.selected : Var.base,
        rest.className
      )}
    >
      <div className="p-1 text-xs md:text-sm w-full">
        { icon ? (
          <div className="flex my-auto flex-nowrap gap-x-2">
            <div className="flex mx-auto my-auto">
              <FontAwesomeIcon
                className={clsx("flex mx-auto justify-center")}
                icon={icon}
              />
            </div>
            {children && (
              <div className="flex mx-auto my-auto text-center">
                {children ? children : null}
              </div>
            )}
          </div>
        ) : (
          children
        )}
      </div>
    </button>
  );
}
