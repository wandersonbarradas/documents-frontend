"use client";

import Image from "next/image";
import z from "zod";
import { InputField } from "@/components/InputField";
import { Button } from "@/components/Button";
import { useState, useEffect } from "react";
import { ErrorItem } from "@/types/ErrorItem";
import { getErrorFromZod } from "@/utils/getErrorFromZod";
import * as api from "@/api/auth";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { addAlert } from "@/utils/addAlert";

const page = () => {
    const router = useRouter();
    const [emailField, setEmailField] = useState("");
    const [passwordField, setPasswordField] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<ErrorItem[]>([]);

    const loginSchema = z.object({
        emailField: z.string().email("E-mail inválido"),
        passwordField: z
            .string()
            .min(6, "Senha deve conter pelo menos 6 caracteres"),
    });

    const handleBtnLogin = async () => {
        setErrors([]);
        const data = loginSchema.safeParse({ emailField, passwordField });
        if (!data.success) return setErrors(getErrorFromZod(data.error));
        setLoading(true);
        const result = await api.login({
            email: emailField,
            password: passwordField,
        });
        setLoading(false);
        if (!result.status) {
            addAlert("error", result.error);
        } else {
            addAlert("success", "Login bem sucedido!");
            setCookie("token", result.token, {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            });
            router.refresh();
        }
    };

    const handleKeyPasswordField = (
        e: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (e.key === "Enter") {
            handleBtnLogin();
        }
    };

    return (
        <>
            <main className="w-full min-h-screen flex justify-center items-center">
                <div className="flex-1 flex justify-center items-center">
                    <div className="min-w-96">
                        <h2 className="text-3xl font-medium mb-12">
                            Comece agora
                        </h2>
                        <div className="mb-5">
                            <label
                                htmlFor="emailField"
                                className="block text-lg mb-1"
                            >
                                Email
                            </label>
                            <InputField
                                onChange={(e) => setEmailField(e.target.value)}
                                disabled={loading}
                                errorMessage={
                                    errors.find(
                                        (item) => item.field === "emailField",
                                    )?.message
                                }
                                id="emailField"
                                placeholder="Digite seu e-mail"
                                type="email"
                                value={emailField}
                            />
                        </div>
                        <div className="mb-7">
                            <label
                                htmlFor="passwordField"
                                className="block text-lg mb-1"
                            >
                                Password
                            </label>
                            <InputField
                                onChange={(e) =>
                                    setPasswordField(e.target.value)
                                }
                                onKeyDown={handleKeyPasswordField}
                                disabled={loading}
                                errorMessage={
                                    errors.find(
                                        (item) =>
                                            item.field === "passwordField",
                                    )?.message
                                }
                                id="passwordField"
                                placeholder="Digite sua senha"
                                type="password"
                                value={passwordField}
                            />
                        </div>
                        <div>
                            <Button
                                value={loading ? "Entrando..." : "Entrar"}
                                onClick={handleBtnLogin}
                                disabled={loading}
                                type="add"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <Image
                        className="max-w-xl"
                        width={2000}
                        height={2000}
                        src="/img/loginImage.png"
                        alt="Imagem ilustrativas de documentos"
                        priority={true}
                    ></Image>
                </div>
            </main>
        </>
    );
};

export default page;
