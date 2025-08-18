interface propsModalNootificacao {
    conteudo: string;
}
export default function ModalNotificacao(props: propsModalNootificacao) {
    const { conteudo } = props;

    if (!conteudo) return;

    return (
        <section className="max-w-2xs absolute bottom-10 right-10 border px-8 py-4 rounded-2xl bg-white border-[#dfdfdfd3]">
            <p className="text-[16px] font-semibold text-left text-[#242424]">
                {
                    conteudo
                }
            </p>
        </section>
    )
}