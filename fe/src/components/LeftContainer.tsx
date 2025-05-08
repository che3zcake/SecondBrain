import {Button} from "./Button";
// import {useNavigate} from "react-router-dom";
import {cardTypeState} from "../state_management/State.tsx";

export default function LeftContainer(){
    // @ts-ignore
    const setCardType = cardTypeState((state) => state.changeCardTypeState)
    // @ts-ignore
    const cardtype = cardTypeState((state) => state.cardtype);

    const typeContainer = [{
        'id': null,
        'value': 'All Notes',
        'img': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 -5 24 28" stroke-width="1.5"
                    stroke="currentColor" className="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"/>
        </svg>
    }, {
        'id': 'tweet',
        'value': 'Tweets',
        'img': <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="30" viewBox="0 0 30 30">
            <path
                d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z"></path>
        </svg>
    }, {
        'id': 'youtube',
        'value': 'Youtube',
        'img': <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="30" viewBox="0 0 50 50">
            <path
                d="M 24.402344 9 C 17.800781 9 11.601563 9.5 8.300781 10.199219 C 6.101563 10.699219 4.199219 12.199219 3.800781 14.5 C 3.402344 16.898438 3 20.5 3 25 C 3 29.5 3.398438 33 3.898438 35.5 C 4.300781 37.699219 6.199219 39.300781 8.398438 39.800781 C 11.902344 40.5 17.898438 41 24.5 41 C 31.101563 41 37.097656 40.5 40.597656 39.800781 C 42.800781 39.300781 44.699219 37.800781 45.097656 35.5 C 45.5 33 46 29.402344 46.097656 24.902344 C 46.097656 20.402344 45.597656 16.800781 45.097656 14.300781 C 44.699219 12.101563 42.800781 10.5 40.597656 10 C 37.097656 9.5 31 9 24.402344 9 Z M 24.402344 11 C 31.601563 11 37.398438 11.597656 40.199219 12.097656 C 41.699219 12.5 42.898438 13.5 43.097656 14.800781 C 43.699219 18 44.097656 21.402344 44.097656 24.902344 C 44 29.199219 43.5 32.699219 43.097656 35.199219 C 42.800781 37.097656 40.800781 37.699219 40.199219 37.902344 C 36.597656 38.601563 30.597656 39.097656 24.597656 39.097656 C 18.597656 39.097656 12.5 38.699219 9 37.902344 C 7.5 37.5 6.300781 36.5 6.101563 35.199219 C 5.300781 32.398438 5 28.699219 5 25 C 5 20.398438 5.402344 17 5.800781 14.902344 C 6.101563 13 8.199219 12.398438 8.699219 12.199219 C 12 11.5 18.101563 11 24.402344 11 Z M 19 17 L 19 33 L 33 25 Z M 21 20.402344 L 29 25 L 21 29.597656 Z"></path>
        </svg>
    },
        {
            'id': 'document',
            'value': 'Documents',
            'img': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 -5 24 28" stroke-width="1.5"
                        stroke="currentColor" className="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"/>
            </svg>
        },
        // {
        //     'id': 'tag',
        //     'value': 'Tags',
        //     'img': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
        //                 stroke="currentColor" className="size-6">
        //         <path stroke-linecap="round" stroke-linejoin="round"
        //               d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"/>
        //         <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z"/>
        //     </svg>
        // }
        ]
    return <div className="h-full border-b border-l border-r border-gray-200 shadow-md">
        <div className="pt-2">
            <ul>
                {typeContainer.map((item) => (
                    <li key={item.id} className={"flex justify-between items-center px-8"}>
                        <Button onClick={() => {
                            setCardType(item.id)
                            console.log(cardtype)
                        }}
                                label={item}/>
                    </li>
                ))}
            </ul>
            <div className="pt-2">
                <div className="flex justify-between items-center px-8" >
                    <Button onClick={() => {
                    }}
                            label={{
                                'id': 'tag',
                                'value': 'Tags',
                                'img': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 -5 24 28" stroke-width="1.5"
                                                    stroke="currentColor" className="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                  d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"/>
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z"/>
                                        </svg>
                            }}/>
                </div>
            </div>
        </div>
    </div>
}