import { Key, useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import { cardState, cardTypeState } from "../state_management/State.tsx";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    // @ts-ignore
    const cards = cardState((state) => state.card);
    // @ts-ignore
    const setCards = cardState((state) => state.changeCardState);
    // @ts-ignore
    const cardtype = cardTypeState((state) => state.cardtype);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("authorization");
        const isAuth = !!token;
        setIsAuthenticated(isAuth);

        if (!isAuth) return;

        const fetchContent = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/content`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!cardtype) {
                    setCards(response.data.contentArray);
                } else {
                    const content = response.data.contentArray.filter((i: { type: string }) => i.type === cardtype);
                    setCards(content);
                }
            } catch (error) {
                // @ts-ignore
                console.error("Error fetching content:", error.response?.data || error.message);
            }
        };

        fetchContent();
        const interval = setInterval(fetchContent, 5000);
        return () => clearInterval(interval);
    }, [cardtype]);

    if (!isAuthenticated) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <p className="mb-4 text-lg">You are not signed in</p>
                <div className="flex gap-4">
                    <button
                        onClick={() => navigate('/signin')}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => navigate('/signup')}
                        className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full overflow-y-auto px-4 md:px-6 lg:px-8 pb-8">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-8">
                {cards.length > 0 ? (
                    cards.map((card: unknown, index: Key | null | undefined) => (
                        <Card key={index} label={card} />
                    ))
                ) : (
                    <div className="absolute top-0 bottom-0 left-50 right-0 flex items-center justify-center">
                        Nothing here
                    </div>
                )}
            </div>
        </div>
    );
}
