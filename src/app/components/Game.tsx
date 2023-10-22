const Game = () => {
  return (
    <>
        <div className="relative w-full text-center">
          {timer ? (
            <>
              <h1 className="text-green-900 text-3xl">{counter}</h1>
              <h1 className="text-sub-color text-5xl">{seconds}</h1>
            </>
          ) : (
            <button
              className={`
                        bg-transparent text-center text-3xl
                        text-sub-color
                        hover:cursor-pointer hover:text-text-accent
                        ${languageMenuOpen && "text-text-accent"}
                    `}
              onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
            >
              {language}
            </button>
          )}

          {languageMenuOpen && <LanguageMenu selectOption={selectOption} />}
        </div>

        <h1
          ref={promptRef}
          className="my-10 text-7xl font-medium text-text-accent"
        >
          {prompt}
        </h1>

        <input
          type="number"
          ref={inputRef}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          autoFocus
          className="
                    w-1/2 rounded border border-sub-color bg-transparent px-5 py-2 
                    text-center text-2xl
                    text-text-accent
                "
        />
    </>
  )
}

export default Game