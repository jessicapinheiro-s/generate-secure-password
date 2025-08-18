import { PiPasswordBold } from "react-icons/pi";
import { TbLockPassword } from "react-icons/tb";

export default function Header () {
    return(
        <header className="flex flex-row w-full bg-white shadow-xl rounded-lg px-50 py-6  items-center justify-between gap-10">
            <div className="flex flex-row">
                <TbLockPassword  className="text-4xl"/>
                <PiPasswordBold className="text-4xl"/>

            </div>
            <div>
                <h1>GENERATE PASSWORD</h1>
            </div>
        </header>
    )
}