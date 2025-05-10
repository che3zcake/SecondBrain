import { Key } from "react";
import axios from "axios";
import Card from "../components/Card";
import { cardState, cardTypeState } from "../state_management/State.tsx";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";

const fetcher = (url: string) =>
    axios
        .get(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            },
        })
        .then((res) => res.data.contentArray);

export default function Dashboard() {
    // @ts-ignore
    const setCards = cardState((state) => state.changeCardState);
    // @ts-ignore
    const cardtype = cardTypeState((state) => state.cardtype);
    // @ts-ignore
    const cards = cardState((state) => state.card);

    const token = localStorage.getItem("authorization");
    const isAuthenticated = !!token;
    const navigate = useNavigate();

    const { data, error, isLoading } = useSWR(
        isAuthenticated ? `${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/content` : null,
        fetcher,
        {
            refreshInterval: 5000,
        }
    );

    if (!isAuthenticated) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <p className="mb-4 text-lg">You are not signed in</p>
                <div className="flex gap-4">
                    <button
                        onClick={() => navigate("/signin")}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => navigate("/signup")}
                        className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-full ">
                No content.
            </div>
        );
    }

    if (data) {
        const filtered = cardtype
            ? data.filter((i: { type: string }) => i.type === cardtype)
            : data;
        setCards(filtered);
    }

    return (
        <div className="w-full h-full overflow-y-auto px-4 md:px-6 lg:px-8 pb-8">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-8">
                {isLoading ? (
                    <div className="absolute top-0 bottom-0 left-50 right-0 flex items-center justify-center">
                        Loading...
                    </div>
                ) : cards.length > 0 ? (
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
