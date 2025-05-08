import {InputBox} from "./InputBox";
import React, {SetStateAction, useEffect, useState} from "react";
import InputArea from "./InputArea.tsx";
import {descriptionState, imgState, linkState, tagState, titleState, typeState} from "../state_management/State.tsx";
import axios from "axios";

export default function createWindow() {
    // @ts-ignore
    const link = linkState((state) => state.link);
    // @ts-ignore
    const changeLinkState = linkState((state) => state.changeLinkState);

    // @ts-ignore
    const title = titleState((state) => state.title);
    // @ts-ignore
    const setTitle = titleState((state) => state.changeTitleState);

    // @ts-ignore
    const description = descriptionState((state) => state.description);
    // @ts-ignore
    const setDescription = descriptionState((state) => state.changeDescriptionState);

    // @ts-ignore
    const type = typeState((state) => state.type);
    // @ts-ignore
    const setType = typeState((state) => state.changeTypeState);

    // @ts-ignore
    const img = imgState((state) => state.img);
    // @ts-ignore
    const setImg = imgState((state) => state.changeImgState);

    // @ts-ignore
    const tag = tagState((state) => state.tag);
    // @ts-ignore
    const addTag = tagState((state) => state.changeTagState)
    // @ts-ignore
    const removeLastTag = tagState((state) =>  state.removeLastTag)

    const [tagInput, setTagInput] = useState("");

    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && tagInput.trim()) {
            e.preventDefault();
            if (!tag.includes(tagInput.trim())) {
                addTag(tagInput.trim())
            }
            setTagInput("");
        } else if (e.key === "Backspace" && !tagInput) {
            removeLastTag()
        }
    };


    useEffect(() => {
        if (!link) return;

        axios.get('http://localhost:3000/api/v1/meta', {
            params: {url: link}
        })
            .then((response: { data: any; }) => {
                const data = response.data;
                setTitle(data.title || "");
                setDescription(data.description || "");
                if (link.includes("youtube.com") || link.includes("youtu.be")) {
                    setType("youtube");
                } else if (link.includes("x.com") || link.includes("twitter.com")) {
                    setType("tweet");
                } else {
                    setType("document");
                }
                setImg(data.images[0])
            })
            .catch(console.error);
    }, [link]);

    return (
        <div>
            <h2 className="text-xl font-bold">New note</h2>

            <InputBox
                onChange={(e: { target: { value: any; }; }) => changeLinkState(e.target.value)}
                placeholder="Link"
                value={link}
                label="Link"
            />

            <InputBox
                onChange={(e: { target: { value: SetStateAction<string>; }; }) => setType(e.target.value)}
                placeholder="Type"
                label="Type"
                value={type}
            />

            <InputBox
                onChange={(e: { target: { value: SetStateAction<string>; }; }) => setTitle(e.target.value)}
                placeholder="Title"
                label="Title"
                value={title}
            />

            <InputArea
                onChange={(e: { target: { value: SetStateAction<string>; }; }) => setDescription(e.target.value)}
                placeHolder="Description"
                label="Description"
                value={description}
            />

            <div className="py-2">Tags</div>
            <div
                className="border rounded px-2 py-1 flex overflow-x-auto items-center min-h-[40px] cursor-text focus-within:ring-2 focus-within:ring-blue-400 ">
                {tag.map((t:string, i:number) => (
                    <span key={i} className="bg-white text-black px-2 py-1 rounded-full text-sm mr-1 mb-1">
                        {t}
                     </span>
                ))}

                <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    placeholder="Press Enter to add tag"
                    className="min-w-[80px] focus:outline-none text-sm resize-none overflow-x-auto"
                />
            </div>
        </div>
    );
}