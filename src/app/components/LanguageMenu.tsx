// https://www.npmjs.com/package/rosaenlg-n2words

type LanguageMenuProps = {
  selectOption: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

const LanguageMenu = ({ selectOption }: LanguageMenuProps) => {
  return (
    <div className="absolute flex flex-col mt-3 border border-sub-color rounded w-full text-2xl">
      <a
        className="py-1 bg-sub-color cursor-pointer hover:text-white"
        id="en"
        onClick={selectOption}
      >
        English
      </a>
      <a
        className="py-1 bg-bg-color cursor-pointer hover:text-white"
        id="es"
        onClick={selectOption}
      >
        Spanish
      </a>
      <a
        className="py-1 bg-sub-color cursor-pointer hover:text-white"
        onClick={selectOption}
        id="zh"
      >
        Chinese (Simplified)
      </a>
      <a
        className="py-1 bg-bg-color cursor-pointer hover:text-white"
        onClick={selectOption}
        id="ko"
      >
        Korean (Sino-Korean)
      </a>
      <a
        className="py-1 bg-sub-color cursor-pointer hover:text-white"
        onClick={selectOption}
        id="fr"
      >
        French
      </a>
      <a
        className="py-1 bg-bg-color cursor-pointer hover:text-white"
        onClick={selectOption}
        id="ru"
      >
        Russian
      </a>
    </div>
  );
};

export default LanguageMenu;
