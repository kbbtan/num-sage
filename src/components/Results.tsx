import { useRouter } from "next/navigation";

type ResultsProps = {
  setCompleted: React.Dispatch<React.SetStateAction<boolean>>;
};

const Results = ({ setCompleted }: ResultsProps) => {
  const router = useRouter();

  return (
    <>
      <div className="mb-5 flex w-2/3 items-center justify-evenly">
        <div>
          <h2 className="text-2xl text-sub-color">Accuracy:</h2>
          <h1 className="text-7xl text-accent">45%</h1>
        </div>

        <div>
          <h2 className="text-2xl text-sub-color">Missed Numbers:</h2>

          <ol className="mt-2 w-full rounded border border-sub-color">
            <li className="flex justify-between bg-bg-color px-5 py-3 text-xl text-text-accent">
              <span>Eighty Nine</span>
              <span>4</span>
            </li>
            <li className="flex justify-between bg-sub-color px-5 py-3 text-xl text-text-accent">
              <span>One Hundred</span>
              <span>1</span>
            </li>
            <li className="flex justify-between bg-bg-color px-5 py-3 text-xl text-text-accent">
              <span>Fourty Four</span>
              <span>3</span>
            </li>
          </ol>
        </div>
      </div>
      <button
        onClick={() => {
          setCompleted(false);
          router.push("/");
        }}
        className="mt-4 rounded border border-sub-color px-5 py-1 text-xl text-sub-color hover:border-text-accent hover:text-text-accent"
      >
        Restart
      </button>
    </>
  );
};

export default Results;
