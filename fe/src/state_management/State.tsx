import { create } from 'zustand'

const createState = create((set)=>({
    create: false,
    changeCreateStateTrue: ()=> set(()=>({create: true})),
    changeCreateStateFalse: ()=> set(()=>({create: false})),
}))

const linkState = create((set)=>({
    link: '',
    changeLinkState: (newLink: any) => set({ link: newLink }),
}))

const titleState = create((set)=>({
    title: '',
    changeTitleState: (newTitle: any) => set({ title: newTitle }),
}))

const descriptionState = create((set)=>({
    description: '',
    changeDescriptionState: (newDescription: any) => set({ description: newDescription }),
}))

const typeState = create((set)=>({
    type: '',
    changeTypeState: (newType: any) => set({ type: newType }),
}))

const tagState = create((set)=>({
    tag: [],
    changeTagState: (newTag: any) =>
        set((state: { tag: any }) => ({ tag: [...state.tag, newTag] })),
    removeLastTag: () =>
        set((state: { tag: string | any[] }) => ({ tag: state.tag.slice(0, -1) })),
    resetTag: () => set({ tag: [] })
}))

const imgState = create((set)=>({
    type: '',
    changeImgState: (newImg: any) => set({ img: newImg }),
}))

const deleteState = create((set)=>({
    delete: false,
    contentId: '',
    changeDeleteStateTrue: ()=> set(()=>({delete: true})),
    changeDeleteStateFalse: ()=> set(()=>({delete: false})),
    changeContentId: (ID: any) => set({ contentId: ID }),
}))

const cardTypeState = create((set) => ({
    cardtype: null,
    changeCardTypeState: (cards: string) => set({ cardtype: cards }),
}))

const cardState = create((set) => ({
    card: [],
    changeCardState: (cards: any) => set({ card: cards }),
}))

export {createState, linkState, titleState, descriptionState, typeState, tagState, imgState, deleteState, cardTypeState, cardState}