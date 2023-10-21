"use client"
import { useState } from "react";

const page = () => {
  const [language, setLanguage] = useState<string>("English");
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  const selectOption = (option: string) => {
    setLanguage(option);
    setIsLanguageMenuOpen(false);
  }

  return (
    <div className="h-[87vh] w-full flex justify-center items-center">
        <div className="flex flex-col items-center">
            
            <div className="relative w-full text-center">
                <button 
                    className="
                        bg-transparent text-3xl text-center
                        text-sub-color
                        hover:text-text-accent hover:cursor-pointer
                    "
                    onClick={() => setIsLanguageMenuOpen(true)}
                >
                    {language}
                </button>

                {isLanguageMenuOpen && <div className="absolute flex flex-col mt-3 border border-sub-color rounded w-full text-2xl">
                    <a className="py-1 bg-sub-color cursor-pointer hover:text-white" onClick={() => selectOption("English")}>English</a>
                    <a className="py-1 bg-bg-color cursor-pointer hover:text-white" onClick={() => selectOption("Chinese (Simplified)")}>Chinese (Simplified)</a>
                    <a className="py-1 bg-sub-color cursor-pointer hover:text-white" onClick={() => selectOption("Chinese (Traditional)")}>Chinese (Traditional)</a>
                    <a className="py-1 bg-bg-color cursor-pointer hover:text-white" onClick={() => selectOption("Korean (Native)")}>Korean (Native)</a>
                    <a className="py-1 bg-sub-color cursor-pointer hover:text-white" onClick={() => selectOption("Korean (Sino-Korean)")}>Korean (Sino-Korean)</a>
                </div>}
            </div>

            <h1 className="text-7xl my-10 font-medium text-text-accent">다섯</h1>
        
            <input
                type="number" 
                autoFocus
                className="
                    w-1/2 px-5 py-2 bg-transparent border border-sub-color rounded 
                    text-text-accent text-2xl
                    text-center
                "
            />

            <button className="mt-4 px-5 py-1 border border-sub-color rounded text-xl text-sub-color">Restart</button>
        </div>
    </div>
  )
}

export default page