"use client";

import Button from "@/components/ui/button";
import IconButton from "@/components/ui/icon-button";
import { Color, Size } from "@/types";
import { Dialog } from "@headlessui/react";
import { Plus, X } from "lucide-react";
import React, { useState } from "react";
import Filter from "./Filter";

interface MobileFilterProps {
  sizes: Size[];
  colors: Color[];
}

const MobileFilter = ({ colors, sizes }: MobileFilterProps) => {
  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <Button onClick={onOpen} className=" flex items-center gap-x-2 lg:hidden">
        Filters
        <Plus size={20} />
      </Button>
      <Dialog
        as="div"
        open={open}
        onClose={onClose}
        className="relative z-40 lg:hidden"
      >
        {/* background */}
        <div className=" fixed inset-0 bg-black bg-opacity-25" />

        {/* Dialog Position */}
        <div className=" fixed inset-0 z-40 flex">
          <Dialog.Panel className=" relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
            {/* Close Button */}
            <div className=" flex items-center justify-end px-4">
              <IconButton icon={<X size={15} />} onClick={onClose} />
            </div>

            {/* Render the filters */}
            <div className="p-4">
              <Filter data={sizes} valueKey="sizeId" name="Sizes" />
              <Filter data={colors} valueKey="colorId" name="Colors" />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default MobileFilter;
