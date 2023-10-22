// https://www.npmjs.com/package/rosaenlg-n2words

type LanguageMenuProps = {
  selectOption: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

const LanguageMenu = ({ selectOption }: LanguageMenuProps) => {
  return (
    <div className="absolute mt-3 flex w-full flex-col rounded border border-sub-color text-2xl">
      <a
        className="cursor-pointer bg-sub-color py-1 hover:text-white"
        id="en"
        onClick={selectOption}
      >
        English
      </a>
      <a
        className="cursor-pointer bg-bg-color py-1 hover:text-white"
        id="es"
        onClick={selectOption}
      >
        Spanish
      </a>
      <a
        className="cursor-pointer bg-sub-color py-1 hover:text-white"
        onClick={selectOption}
        id="zh"
      >
        Chinese (Simplified)
      </a>
      <a
        className="cursor-pointer bg-bg-color py-1 hover:text-white"
        onClick={selectOption}
        id="ko"
      >
        Korean (Sino-Korean)
      </a>
      <a
        className="cursor-pointer bg-sub-color py-1 hover:text-white"
        onClick={selectOption}
        id="fr"
      >
        French
      </a>
      <a
        className="cursor-pointer bg-bg-color py-1 hover:text-white"
        onClick={selectOption}
        id="ru"
      >
        Russian
      </a>
    </div>
  );
};

export default LanguageMenu;
