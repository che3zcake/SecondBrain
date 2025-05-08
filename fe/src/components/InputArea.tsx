// @ts-ignore
export default function InputArea({label, placeHolder, onChange, value}){
    return <div>
        <div className="text-white pb-2">{label}</div>
        <textarea placeholder={placeHolder} onChange={onChange} className="rounded-md border-white w-[302px] p-2 resize-none"
         value={value}/>
    </div>
}