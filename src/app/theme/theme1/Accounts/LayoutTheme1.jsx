"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LayoutTheme1({ children, tabs }) {
  const pathname = usePathname();

  return (
    <div className="container mx-auto px-4 mt-7 md:flex">
      <ul className="flex-column space-y-3 text-base font-medium md:me-6 mb-6 md:mb-0 w-60">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          const isDisabled = tab.disabled;

          if (isDisabled) {
            return (
              <li key={tab.name}>
                <span className="inline-flex items-center px-3 py-3 text-zinc-400 rounded-lg cursor-not-allowed w-full text-base border-b border-zinc-300">
                  {tab.icon && (
                    <tab.icon className="w-5 h-5 me-2 text-zinc-400" />
                  )}
                  {tab.name}
                </span>
              </li>
            );
          }

          return (
            <li key={tab.name}>
             <Link
  href={tab.href}
  className={`group inline-flex items-center px-3 py-3 rounded-lg w-full transition-colors duration-200 border-b ${
    isActive
      ? "text-white bg-zinc-900 border-zinc-900 font-normal"
      : "text-zinc-900 border-zinc-300 hover:bg-zinc-900 hover:text-white hover:border-zinc-900"
  }`}
>
  {tab.icon && (
    <tab.icon
      className={`w-5 h-5 me-3 transition-colors duration-200 ${
        isActive ? "text-white" : "text-zinc-900 group-hover:text-white"
      }`}
    />
  )}
  <span className="text-base">{tab.name}</span>
</Link>

            </li>
          );
        })}
      </ul>

      <div className="p-6 text-medium shadow-lg rounded-xl w-full bg-white">
        {children}
      </div>
    </div>
  );
}
