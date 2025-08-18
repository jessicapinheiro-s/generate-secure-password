'use client'
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

interface propsModalNootificacao {
    conteudo: string;
}
export default function ModalNotificacao(props: propsModalNootificacao) {
    const [open, setOpen] = useState<boolean>(true);
    const { conteudo } = props;

    if (!conteudo) return;

    setTimeout(() => {
        setOpen(false);
    }, 1000);
    
    return (
        open && (
            <section className="max-w-2xs absolute bottom-10 right-10 border px-8 py-4 rounded-2xl bg-white border-[#dfdfdfd3] transform-3d flex flex-row items-center gap-1 justify-start">
                <span><FaCheckCircle className="text-[#269626]" /></span>
                <p className="text-[16px] font-semibold text-left text-[#242424]">
                    {
                        conteudo
                    }
                </p>
            </section>
        )
    )
}