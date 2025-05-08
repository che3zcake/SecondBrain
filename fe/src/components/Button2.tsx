// eslint-disable-next-line react/prop-types
// @ts-ignore
export default function Button2({svg, onClick}) {
    return <button onClick={onClick} type="button" className="
      cursor-pointer font-medium rounded-lg text-xs px-2 py-1  mb-2 hover:bg-indigo-300 rounded-full">{svg}</button>
}