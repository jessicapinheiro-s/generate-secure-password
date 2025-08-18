'use client';
import { useState } from "react";

export default function Home() {
  const [formValues, setFormValues] = useState({
    passwordLength: 6,
    uppercaseLetters: false,
    lowercaseLetters: false,
    numbers: false,
    specialSymbols: false,
  });

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
    console.log(password);
  }


  return (
    <main className="w-full h-full flex flex-col gap-[32px] items-center justify-center">
      <section className="w-full flex flex-col items-center justify-center">
        <form
          title="Generate a secure Password"
          className="w-4/12"
        >
          <fieldset className="w-full border rounded-2xl border-[#c7c7c7] flex flex-col items-start justify-center px-10 py-5 gap-5">
            <legend className="font-bold text-3xl">Generate a secure Password</legend>

            <div className="w-full flex flex-row items-center justify-start gap-2">
              <label htmlFor="passwordLength">Password length:</label>
              <input
                type="number"
                required
                min={6}
                max={64}
                className="w-8/12 border rounded-2xl border-[#c7c7c7] px-2 py-1 outline-none"
                id="passwordLength"
                name="passwordLength"
                placeholder="6"
                value={formValues.passwordLength}
                onChange={handleChange}
              />
            </div>

            <div className="w-full flex flex-row justify-start items-center gap-4">
              <div className="flex flex-row-reverse items-center justify-end gap-2 w-6/12">
                <label htmlFor="uppercaseLetters">Capital letters</label>
                <input type="checkbox" id="uppercaseLetters" name="uppercaseLetters" checked={formValues.uppercaseLetters} onChange={handleChange} />
              </div>

              <div className="flex flex-row-reverse items-center justify-end gap-2 w-6/12">
                <label htmlFor="lowercaseLetters">Lowercase letters</label>
                <input type="checkbox" id="lowercaseLetters" name="lowercaseLetters" checked={formValues.lowercaseLetters} onChange={handleChange} />
              </div>
            </div>

            <div className="w-full flex flex-row justify-start items-center gap-4">
              <div className="flex flex-row-reverse items-center justify-end gap-2 w-6/12">
                <label htmlFor="numbers">Numbers</label>
                <input type="checkbox" id="numbers" name="numbers" checked={formValues.numbers} onChange={handleChange} />
              </div>

              <div className="flex flex-row-reverse items-center justify-end gap-2 w-6/12">
                <label htmlFor="specialSymbols">Special symbols (!@#$%&*)</label>
                <input type="checkbox" id="specialSymbols" name="specialSymbols" checked={formValues.specialSymbols} onChange={handleChange} />
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
    </main>
  );
}
