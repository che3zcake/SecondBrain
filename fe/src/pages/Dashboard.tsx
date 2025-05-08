import { Key, useEffect} from "react";
import axios from "axios";
import Card from "../components/Card";
import {cardState, cardTypeState} from "../state_management/State.tsx";

export default function Dashboard() {
    // @ts-ignore
    const cards = cardState((state) => state.card);
    // @ts-ignore
    const setCards = cardState((state) => state.changeCardState)
    // @ts-ignore
    const cardtype = cardTypeState((state) => state.cardtype);

    useEffect(() => {
        // @ts-ignore
        const fetchContent = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/content", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authorization')}`,
                    },
                });
                if (!cardtype){
                    setCards(response.data.contentArray);
                    console.log(cardtype)
                    return
                }
                const content = response.data.contentArray.filter((i:{type:string})=>i.type===cardtype)
                console.log(cardtype)
                setCards(content)
            } catch (error) {
                // @ts-ignore
                console.error("Error fetching content:", error.response?.data || error.message);
            }
        };

        fetchContent();
        console.log('working')

        const interval = setInterval(fetchContent, 5000);

        return () => clearInterval(interval);
    }, [cardtype]);


    return (
        <div className="w-full h-full overflow-y-auto px-4 md:px-6 lg:px-8 pb-8">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-8">
                {cards.length > 0?cards.map((card: unknown, index: Key | null | undefined) => (
                    <Card key={index} label={card}/>
                )):<div className="absolute top-0 bottom-0 left-50 right-0 flex items-center justify-center ">
                    Nothing here
                </div>}
            </div>
        </div>
    );
}
