'use client';
import ModalNotificacao from "@/componentes/modal";
import { redirect } from "next/dist/server/api-utils";
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name, type, checked, value
    } = event.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const sortearValor = (arr: any[]): string => {
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
    setOpenModal(true);
  }


  return (
    <main className="w-full h-full flex flex-col gap-[32px] items-center justify-center p-10">
      {
        !generatedPassword && (
          <section className="w-full flex flex-col items-center justify-center">
            <form
              title="Generate a secure Password"
              className="w-full lg:w-4/12 border rounded-2xl border-[#c7c7c7] px-10 py-5"
            >
              <fieldset className="w-full flex flex-col items-start justify-center gap-10">
                <legend className="font-bold text-3xl text-[#303030] my-4">Generate a secure Password</legend>

                <div className="w-full flex flex-row items-center justify-start gap-2 flex-wrap">
                  <label htmlFor="passwordLength text-[#303030]">Password length:</label>
                  <input
                    type="number"
                    required
                    min={6}
                    max={64}
                    className="w-full md:w-8/12 border rounded-2xl border-[#c7c7c7] px-2 py-1 outline-none"
                    id="passwordLength"
                    name="passwordLength"
                    placeholder="6"
                    value={formValues.passwordLength}
                    onChange={handleChange}
                  />
                </div>

                <div className="w-full flex flex-row justify-start items-center gap-4 flex-wrap ">
                  <div className="flex flex-row-reverse items-center justify-end gap-2 md:w-[48%] w-full ">
                    <label htmlFor="uppercaseLetters text-[#303030]">Capital letters</label>
                    <input 
                      type="checkbox" 
                      id="uppercaseLetters" 
                      name="uppercaseLetters" 
                      checked={formValues.uppercaseLetters} 
                      onChange={handleChange} 
                      className="w-5 h-5 accent-[#e61111]"
                    />
                  </div>

                  <div className="flex flex-row-reverse items-center justify-end gap-2 md:w-[48%] w-full ">
                    <label htmlFor="lowercaseLetters text-[#303030]">Lowercase letters</label>
                    <input 
                      type="checkbox" 
                      id="lowercaseLetters" 
                      name="lowercaseLetters" 
                      checked={formValues.lowercaseLetters} 
                      onChange={handleChange} 
                      className="w-5 h-5 accent-[#e61111]"
                    />
                  </div>
                </div>

                <div className="w-full flex flex-row justify-start items-center gap-4 flex-wrap">
                  <div className="flex flex-row-reverse items-center justify-end gap-2 md:w-[48%] w-full ">
                    <label htmlFor="numbers text-[#303030]">Numbers</label>
                    <input 
                      type="checkbox" 
                      id="numbers" 
                      name="numbers" 
                      checked={formValues.numbers} 
                      onChange={handleChange} 
                      className="w-5 h-5 accent-[#e61111]" 
                    />
                  </div>

                  <div className="flex flex-row-reverse items-center justify-end gap-2 md:w-[48%] w-full ">
                    <label htmlFor="specialSymbols text-[#303030]">Special symbols (!@#$%&*)</label>
                    <input 
                      type="checkbox" 
                      id="specialSymbols" 
                      name="specialSymbols" 
                      checked={formValues.specialSymbols} 
                      onChange={handleChange} 
                      className="w-5 h-5 accent-[#e61111]"
                    />
                  </div>
                </div>

                <div className="w-full flex flex-col items-center justify-center">
                  <button
                    className="border rounded-2xl border-[#c7c7c7] px-6 py-2 bg-[#e61111] text-white border-none"
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
          <section className="max-w-2xs flex flex-col items-center justify-center gap-4">
            <h1 className="font-bold text-3xl text-[#303030]">Senha gerada!</h1>
            <div className="flex flex-row border rounded-2xl border-[#c7c7c7] px-4 py-2">
              <input type="password" readOnly className="outline-none text-[#303030]" value={generatedPassword.slice(0, 30)}/>
              <button onClick={(e) => { e.preventDefault(); pasteText(); }}>
                <FaRegCopy className="text-[#303030]" />
              </button>
            </div>
            <div className="w-full flex flex-col items-center justify-center">
              <button onClick={(e) => { e.preventDefault(); }} className="w-full bg-[#e61111] text-white px-4 py-4 rounded-2xl flex flex-col justify-center items-center">
                <TfiReload />
              </button>
            </div>
          </section>
        )
      }
      {
        modal && (
          <ModalNotificacao conteudo="Texto copiado!"/>
        )
      }

    </main>
  );
}
