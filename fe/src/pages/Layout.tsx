import {Outlet} from "react-router-dom";
import LeftHeader from "../components/LeftHeader";
import LeftContainer from "../components/LeftContainer";
import RightHeader from "../components/RightHeader";
import {
    createState, deleteState,
    descriptionState,
    imgState,
    linkState,
    tagState,
    titleState,
    typeState
} from "../state_management/State";
import CreateWindow from "../components/CreateWindow";
import axios from "axios";
// import {useState} from "react";

export default function Layout(){
    // @ts-ignore
    const create = createState((state)=>state.create)
    // @ts-ignore
    const updateCreateStateFalse = createState((state)=>state.changeCreateStateFalse)

    // @ts-ignore
    const deleted = deleteState((state)=>state.delete)
    // @ts-ignore
    const updateDeleteStateFalse = deleteState((state)=>state.changeDeleteStateFalse)
    // @ts-ignore
    const contentId = deleteState((state)=>state.contentId)
    // @ts-ignore
    const setContentId = deleteState((state) => state.changeContentId)

    // @ts-ignore
    const link = linkState((state) => state.link);

    // @ts-ignore
    const title = titleState((state) => state.title);

    // @ts-ignore
    const description = descriptionState((state) => state.description);

    // @ts-ignore
    const type = typeState((state) => state.type);

    // @ts-ignore
    const img = imgState((state) => state.img);

    // @ts-ignore
    const tag = tagState((state) => state.tag);

    // @ts-ignore
    const setLink = linkState((state) => state.changeLinkState);
    // @ts-ignore
    const setTitle = titleState((state) => state.changeTitleState);
    // @ts-ignore
    const setDescription = descriptionState((state) => state.changeDescriptionState);
    // @ts-ignore
    const setType = typeState((state) => state.changeTypeState);
    // @ts-ignore
    const setImg = imgState((state) => state.changeImgState);
    // @ts-ignore
    const resetTag = tagState((state) => state.resetTag);



    return <div>
        <div className={`flex h-screen overflow-hidden transition duration-300 ${create ? 'blur-sm' : ''} ${deleted ? 'blur-sm' : ''}`}>
            <div className="flex flex-col ">
                <LeftHeader/>
                <div className="flex-grow">
                    <LeftContainer/>
                </div>
            </div>
            <div className="flex-auto flex flex-col h-full min-w-0 ">
                <RightHeader/>
                <div className="pr-4 h-full w-full overflow-y-auto"><Outlet/></div>
            </div>
        </div>
        {create && (
            <div className="absolute inset-0  backdrop-blur-lg flex items-center justify-center
                animate-fadeIn">
                <div className="bg-black p-6 rounded-xl shadow-lg text-white w-[350px] h-[560px]">
                    <CreateWindow/>
                    <div className="flex justify-end gap-x-6">
                        <button
                            className="mt-4 px-4  py-2 bg-white text-black rounded cursor-pointer"
                            onClick={() => updateCreateStateFalse()}
                        >
                            Close
                        </button>
                        <button
                            className="mt-4 px-4  py-2 bg-white text-black rounded cursor-pointer"
                            onClick={async () => {
                                try {
                                    console.log('trying')
                                    const response = await axios.post('http://localhost:3000/api/v1/content/create', {
                                        title,
                                        type,
                                        image:img,
                                        description,
                                        tag,
                                        link
                                    },{
                                        headers: {
                                            Authorization: `Bearer ${localStorage.getItem('authorization')}`,
                                        }
                                    });
                                    console.log(response)
                                    updateCreateStateFalse();
                                } catch (err) {
                                    console.error(err);
                                }finally {
                                    setType('')
                                    setImg('')
                                    setTitle('')
                                    setDescription('')
                                    setLink('')
                                    resetTag()
                                }
                            }}
                        >
                            Create
                        </button>
                    </div>
                </div>
            </div>
        )}


        {deleted && (
            <div className="absolute inset-0  backdrop-blur-lg flex items-center justify-center
                animate-fadeIn text-white ">
                <div className="bg-black rounded-xl p-6 w-80 text-center shadow-lg">
                    <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
                    <p className="mb-6">Are you sure you want to delete this content?</p>
                    <div className="flex justify-center gap-4">
                        <button
                            className="bg-white text-black px-4 py-2 rounded cursor-pointer"
                            onClick={() => {updateDeleteStateFalse()}}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-red-600  px-4 py-2 rounded cursor-pointer"
                            onClick={async () => {
                                try {
                                    await axios.delete(`http://localhost:3000/api/v1/content/${contentId}`, {
                                        headers: {
                                            Authorization: `Bearer ${localStorage.getItem('authorization')}`,
                                        }
                                    });
                                    updateDeleteStateFalse();
                                } catch (e) {
                                    console.error(e);
                                    setContentId('');
                                } finally {
                                }
                            }}
                        >
                            Yes, Delete
                        </button>
                    </div>
                </div>
            </div>
        )}



    </div>
}

