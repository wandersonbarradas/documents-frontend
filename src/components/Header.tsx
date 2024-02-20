"use client";

import Link from "next/link";
import { ItemButton } from "./ItemButton";
import { LuLogOut } from "react-icons/lu";
import { LuHome } from "react-icons/lu";
import { LuSettings } from "react-icons/lu";
import { setCookie } from "cookies-next";
import { useRouter, usePathname } from "next/navigation";
import { verifyPathname } from "@/utils/verifyPathname";
import { addAlert } from "@/utils/addAlert";

export const Header = () => {
    const router = useRouter();
    const pathname = usePathname();
    const handleLogOut = () => {
        setCookie("token", "");
        addAlert("success", "Você saiu com segurança!");
        router.refresh();
    };

    return (
        <header className="py-4 flex justify-between items-center border-b-2 border-gray-300 dark:border-gray-600">
            <Link className="w-12 h-12" href="/">
                <img className="w-full" src="/img/logo.png" alt="Logo" />
            </Link>
            <nav>
                <ul className="flex items-center gap-4">
                    <li>
                        <ItemButton
                            href="/"
                            label="Inicio"
                            IconElement={LuHome}
                            classNames={`${
                                verifyPathname("/", pathname)
                                    ? "text-sky-600"
                                    : "text-black dark:text-white"
                            } hover:text-sky-600`}
                        />
                    </li>
                    <li>
                        <ItemButton
                            href="/configuracoes"
                            label="Configurações"
                            IconElement={LuSettings}
                            classNames={`${
                                verifyPathname("/configuracoes", pathname)
                                    ? "text-sky-600"
                                    : "text-black dark:text-white"
                            } hover:text-sky-600`}
                        />
                    </li>
                </ul>
            </nav>

            <ItemButton
                onClick={() => handleLogOut()}
                label="Sair"
                IconElement={LuLogOut}
                classNames={`text-black dark:text-white hover:text-sky-600`}
            />
        </header>
    );
};
