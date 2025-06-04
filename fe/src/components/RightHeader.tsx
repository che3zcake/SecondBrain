import {cardTypeState, createState} from "../state_management/State.tsx";
// import axios from "axios";
// import toast, {Toaster} from "react-hot-toast";


export default function RightHeader(){
    // @ts-ignore
    const updateCreateStateTrue = createState((state)=>state.changeCreateStateTrue)
    // @ts-ignore
    const cardtype = cardTypeState((state) => state.cardtype);

    return <div className="pt-12 px-2 pr-4 pb-1 flex justify-between">
        {/*<Toaster position="top-center"/>*/}
        <div className="text-3xl font-bold pl-8">
            {cardtype?'ok':'All Notes'}
        </div>
        <div className="flex items-center px-8 gap-4">
            {/*<button onClick={async ()=>{*/}
            {/*    try {*/}
            {/*        const response = await axios.get('http://localhost:3000/api/v1/brain/share', {*/}
            {/*            headers: {*/}
            {/*                Authorization: `Bearer ${localStorage.getItem('authorization')}`,*/}
            {/*            }*/}
            {/*        })*/}

            {/*        await navigator.clipboard.writeText('http://localhost:5173/brain/'+response.data.hash);*/}
            {/*        toast.success('Copied to clipboard!'));*/}

            {/*    } catch(e){*/}
            {/*        console.log(e)*/}
            {/*    }*/}
            {/*}{} className="flex justify-between gap-x-3 bg-black text-white px-3 pr-6 py-2 rounded-xl cursor-pointer">*/}
            {/*    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"*/}
            {/*         stroke="currentColor" className="size-6">*/}
            {/*        <path stroke-linecap="round" stroke-linejoin="round"*/}
            {/*              d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"/>*/}
            {/*    </svg>*/}
            {/*    Share Brain*/}
            {/*</button>*/}
            <button onClick={() => {
                updateCreateStateTrue()
            }} className="flex justify-between gap-x-3 bg-black text-white px-4 pr-5 py-2 rounded-xl cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                </svg>
                Add Content
            </button>
        </div>
    </div>
}