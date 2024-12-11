import clsx from "clsx";
import { Marker } from "./Marker";

import React, { ReactNode, MouseEventHandler } from "react";

interface ButtonCustomProps {
    icon?: string;
    children: ReactNode;
    href?: string;
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    markerFill?: string;
}

const ButtonCustom: React.FC<ButtonCustomProps> = ({
    icon,
    children,
    href,
    className,
    onClick,
    markerFill,
}) => {
    const Inner = () => (
        <>
            <div className="relative flex items-center px-4 g4 rounded-2xl inner-before group-hover:before:opacity-100 overflow-hidden">
                <span className="absolute -left-[1px]">
                    <Marker fill={markerFill} />
                </span>

                {icon && (
                    <img
                        src={icon}
                        alt="circle"
                        className="size-10 mr-5 object-contain z-10"
                    />
                )}

                <span className="relative z-2 font-poppins base-bold text-p1 uppercase">
                    {children}
                </span>
            </div>

            <div className="glow-before glow-after" />
        </>
    );


    return href ? (
        <button>
            <a
                className={clsx(
                    "relative inline   g5 rounded-2xl shadow-500 group",
                    className,
                )}
                href={href}
            >
                <Inner />
            </a>
        </button>
    ) : (
        <button
            className={clsx(
                "relative g5 rounded-2xl shadow-500 group",
                className,
            )}
            onClick={onClick}
        >
            <Inner />
        </button>
    );
};
export default ButtonCustom;
