"use client";

import { ItemButton } from "@/components/ItemButton";
import { LuPlus } from "react-icons/lu";
import { usePathname } from "next/navigation";
const page = () => {
    7;
    const pathname = usePathname();
    return (
        <div className="px-3">
            <div className="flex gap-2 justify-between items-center">
                <h1 className="text-xl font-medium">Tipos de documentos</h1>
                <ItemButton
                    IconElement={LuPlus}
                    label="Novo"
                    active={true}
                    href={pathname + "/novo"}
                />
            </div>
        </div>
    );
};

export default page;
