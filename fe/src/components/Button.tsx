// @ts-ignore
export function Button({label, onClick}) {
    return <button onClick={onClick} type="button" className=" cursor-pointer font-normal text-xl py-5 flex w-full gap-x-3">
        <div className="">{label.img}</div>
        <div className="">{label.value}</div>
    </button>
}