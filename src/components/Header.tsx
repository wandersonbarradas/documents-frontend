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
        <header className="py-4 flex justify-between items-center border-b-2 border-gray-300">
            <Link className="w-12 h-12" href="/">
                <img className="w-full" src="/logo.png" alt="Logo" />
            </Link>
            <nav>
                <ul className="flex items-center gap-4">
                    <li>
                        <ItemButton
                            href="/"
                            label="Inicio"
                            IconElement={LuHome}
                            active={verifyPathname("/", pathname)}
                        />
                    </li>
                    <li>
                        <ItemButton
                            href="/configuracoes"
                            label="Configurações"
                            IconElement={LuSettings}
                            active={verifyPathname("/configuracoes", pathname)}
                        />
                    </li>
                </ul>
            </nav>

            <ItemButton
                onClick={() => handleLogOut()}
                label="Sair"
                IconElement={LuLogOut}
            />
        </header>
    );
};
