import Button2 from "./Button2.tsx";
// import axios from "axios";
import {deleteState} from "../state_management/State.tsx";
import toast, { Toaster } from 'react-hot-toast';


// @ts-ignore
export default function Card( {label}) {
    const svg_type = [{
        id: 'youtube',
        svg: (<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="50" viewBox="0 0 50 50">
            <path fill="#FF3D00"
                  d="M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z"></path>
            <path fill="#FFF" d="M20 31L20 17 32 24z"></path>
        </svg>)
    }, {
        id: 'tweet',
        svg: (<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="40" viewBox="0 0 50 50">
            <path
                d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"></path>
        </svg>)
    }, {
        id: 'document',
        svg: (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 -5 24 28" stroke-width="1.5"
                    stroke="currentColor" className="size-7">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"/>
        </svg>)
    }]

    const currentSvg = svg_type.find((item) => item.id === label.type)?.svg;

    // @ts-ignore
    const updateDeleteStateTrue = deleteState((state) => state.changeDeleteStateTrue)
    // @ts-ignore
    const setContentId = deleteState((state) => state.changeContentId)
    return (
        <div className="rounded-xl overflow-hidden border border-gray-300 shadow-sm flex flex-col h-full">
            <Toaster position="top-center"/>
            <div className="relative h-36 bg-gray-200">
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{backgroundImage: `url(${label.image || 'https://picsum.photos/seed/picsum/900/1000'})` }}
                />
                <div className="absolute top-2 right-2 flex items-center gap-2 ">
                    <Button2
                        svg={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                                 stroke="white" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"/>
                            </svg>
                        }
                        onClick={async () => {
                            await navigator.clipboard.writeText(label.link);
                            toast.success('Copied to clipboard!');
                        }}
                    />
                    <Button2
                        svg={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="white" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                            </svg>
                        }
                        onClick={() => {
                            setContentId(label._id)
                            updateDeleteStateTrue()
                        }}
                    />
                </div>
            </div>

            <div className="p-3 flex flex-col h-56">
                <h3 className="text-xl font-bold mb-2 line-clamp-1 pb-1">{label.title}</h3>

                <div className="flex-grow overflow-y-auto mb-3">
                    <p className="text-base">{label.description}</p>
                </div>

                <div className="flex justify-between ">
                    <div className="mt-auto">
                        <div className="flex flex-wrap gap-2 mb-1">
                            {label.tag?.map((tagObj: any) => (
                                <span
                                    key={tagObj._id}
                                    className="bg-blue-200 text-blue-700 px-2 py-0.5 rounded-xl text-sm"
                                >
                                    {tagObj.title}
                                </span>
                            ))}
                        </div>
                        <div className="text-xs text-gray-500 ">Added: {label.date.substring(0, 10)}</div>
                    </div>
                    <div className="pr-2">{currentSvg}</div>
                </div>
            </div>
        </div>
    );
}
