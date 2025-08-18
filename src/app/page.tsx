'use client';
import ModalNotificacao from "@/componentes/modal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";

export default function Home() {
  const [formValues, setFormValues] = useState({
    passwordLength: 6,
    uppercaseLetters: false,
    lowercaseLetters: false,
    numbers: false,
    specialSymbols: false,
  });

  const [generatedPassword, setGeneratedPassword] = useState<string>('');
  const [modal, setOpenModal] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name, type, checked, value
    } = event.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const sortearValor = (arr: string[]): string => {
    const index = Math.floor(Math.random() * arr.length);

    return arr[index];
  }

  const proncessarSenha = () => {
    if (!formValues.lowercaseLetters && !formValues.specialSymbols && !formValues.uppercaseLetters && !formValues.numbers) return;

    const arrNumBase = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const arrLetrasBase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    const arrLetrasBaseMaiusculas = [
      "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
      "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
      "U", "V", "W", "X", "Y", "Z"
    ];
    const arrCarcEspeciais = `!@#$%^&*()_+-=[]{}|;:'",.<>?/\\\``.split("");

    const objBaseToParam = [
      {
        required: formValues.numbers,
        valueParm: arrNumBase
      },
      {
        required: formValues.lowercaseLetters,
        valueParm: arrLetrasBase
      },
      {
        required: formValues.uppercaseLetters,
        valueParm: arrLetrasBaseMaiusculas
      },
      {
        required: formValues.specialSymbols,
        valueParm: arrCarcEspeciais
      }
    ]

    const arrParametrosAserConsiderados = objBaseToParam.filter(item => item.required);
    const unionParamConsiderados = arrParametrosAserConsiderados.map(item => item.valueParm).reduce((prev, current) => [...prev, ...current], []);

    let password = '';

    for (let i = 0; i < formValues.passwordLength; i++) {
      const valorSorteado = sortearValor(unionParamConsiderados);
      password += valorSorteado;
    }

    setGeneratedPassword(password);
  }

  function pasteText() {
    navigator.clipboard.writeText(generatedPassword);
    console.log(`modal ${modal}`);
    setOpenModal(true);
  }

  function redirectUser(routerTo: string) {
    router.replace(routerTo);
  }

  return (
    <main className="w-full min-h-full flex flex-col gap-[32px] items-center justify-center p-4 md:p-10">
      {
        !generatedPassword && (
          <section className="w-full flex flex-col items-center justify-center">
            <form
              title="Generate a secure Password"
              className="w-full lg:w-5/12 bg-white shadow-xl rounded-lg px-10 py-8 flex flex-col items-center justify-center gap-10"
            >
              <div className="text-center space-y-2">
                <h1 className="font-bold text-3xl text-gray-800">Generate a Secure Password</h1>
                <p className="text-gray-500">Protect your accounts with strong, unique passwords</p>
              </div>

              <fieldset className="w-full flex flex-col items-start justify-center gap-8">
                {/* Comprimento */}
                <div className="w-full flex flex-col gap-2">
                  <label htmlFor="passwordLength" className="text-gray-700 font-semibold">
                    Password length
                  </label>
                  <input
                    type="number"
                    min={6}
                    max={64}
                    className="w-full border-2 rounded-lg border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-red-500"
                    id="passwordLength"
                    name="passwordLength"
                    value={formValues.passwordLength}
                    onChange={handleChange}
                  />
                </div>

                {/* Opções */}
                <div className="w-full grid grid-cols-2 gap-4">
                  {[
                    { id: "uppercaseLetters", label: "A-Z" },
                    { id: "lowercaseLetters", label: "a-z" },
                    { id: "numbers", label: "0-9" },
                    { id: "specialSymbols", label: "!@#$%&*" },
                  ].map(({ id, label }) => (
                    <label
                      key={id}
                      htmlFor={id}
                      className="flex items-center gap-2 font-semibold text-gray-700"
                    >
                      <input
                        type="checkbox"
                        id={id}
                        name={id}
                        checked={formValues[id as keyof typeof formValues] as boolean}
                        onChange={handleChange}
                        className="w-5 h-5 accent-red-600"
                      />
                      {label}
                    </label>
                  ))}
                </div>

                {/* Botão */}
                <div className="w-full flex justify-center">
                  <button
                    className="rounded-xl px-6 py-3 bg-red-600 hover:bg-red-700 transition text-white font-semibold shadow-md"
                    onClick={proncessarSenha}
                    type="button"
                  >
                    Generate password
                  </button>
                </div>
              </fieldset>
            </form>
          </section>
        )
      }

      {
        generatedPassword && (
          <section className="w-5/5 md:w-1/5 flex flex-col items-center justify-center gap-4">
            <div className="flex flex-col items-center justify-center gap-4">
              <h1 className="font-bold text-3xl text-[#303030]">Senha gerada!</h1>
            </div>

            <div className="w-full flex flex-row items-center justify-center gap-4 flex-wrap">
              <div className="w-5/5 md:w-3/5 flex flex-row border-2 rounded-lg border-gray-300 px-3 py-2 ">
                <input type="password" readOnly className="outline-none text-[#303030] w-full " value={generatedPassword.slice(0, 30)} />
                <button onClick={(e) => { e.preventDefault(); pasteText(); }}>
                  <FaRegCopy className="text-[#303030]" />
                </button>
              </div>
              <div className="w-5/5 md:w-1/5 flex flex-col items-center justify-center">
                <button onClick={(e) => { e.preventDefault(); redirectUser('/'); setGeneratedPassword(''); setOpenModal(false)}} className="w-full bg-[#e61111] focus:ring-2 focus:ring-red-500 text-white px-4 py-4 rounded-lg flex flex-col justify-center items-center">
                  <TfiReload />
                </button>
              </div>
            </div>
          </section>
        )
      }
      {
        modal && (
          <ModalNotificacao conteudo="Texto copiado!" />
        )
      }

    </main>
  );
}
