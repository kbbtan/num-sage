const Results = () => {
  return (
    <div className="flex justify-around items-center w-1/2 mb-5">
        <div>
            <h2 className="text-sub-color text-2xl">Accuracy:</h2>
            <h1 className="text-accent text-7xl">45%</h1>
        </div>

        <div>
            <h2 className="text-sub-color text-2xl">Missed Numbers:</h2>

            <ol className="border border-sub-color rounded mt-2 w-full">
                <li className="flex justify-between text-xl text-text-accent py-3 px-5 bg-bg-color"><span>Eighty Nine</span><span>4</span></li>
                <li className="flex justify-between text-xl text-text-accent py-3 px-5 bg-sub-color"><span>One Hundred</span><span>1</span></li>
                <li className="flex justify-between text-xl text-text-accent py-3 px-5 bg-bg-color"><span>Fourty Four</span><span>3</span></li>
            </ol>
        </div>
    </div>
  )
}

export default Results