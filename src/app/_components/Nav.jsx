import Image from "next/image";
import React from "react";

const Nav = () => {
  return (
    <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center ">
      <nav className="flex w-full justify-between">
        <Image
          src="/assets/images/apple.svg"
          alt="appleImg"
          width={28}
          height={36}
        />

        <div className="flex flex-1 justify-center sm:hidden">
          {["Store", "Mac", "iPhone", "Support"].map((navItem) => (
            <div
              key={navItem}
              className="px-5 text-sm cursor-pointer text-gray-300 hover:text-white transition-all"
            >
              <UselessButtons text="Nav buttons are for looks :)">
                <p>{navItem}</p>
              </UselessButtons>
            </div>
          ))}
        </div>

        <div className="flex items-baseline gap-7 ">
          <UselessButtons text="So is this button">
            <Image
              src="/assets/images/search.svg"
              alt="search"
              width={18}
              height={18}
            />
          </UselessButtons>

          <UselessButtons text="And this button">
            <Image
              src="/assets/images/bag.svg"
              alt="bag"
              width={18}
              height={18}
            />
          </UselessButtons>
        </div>
      </nav>
    </header>
  );
};

export default Nav;

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const UselessButtons = ({ text, children }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button>{children}</button>
      </PopoverTrigger>
      <PopoverContent className="w-32 bg-white border-none rounded-2xl">
        <h5 className="text-sm">{text} </h5>
      </PopoverContent>
    </Popover>
  );
};
