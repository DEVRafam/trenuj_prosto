import AllEvents from "../components/events/allEvents/AllEvents_MAIN";
import SingleEvent from "../components/events/singleEvent/SingleEvent_MAIN";
//
export default [
    {
        path: "/aktualnosci",
        name: "AllEvents",
        component: AllEvents,
        meta: {
            title: "Aktualności"
        },
        query: {
            page: 1
        }
    },
    {
        path: "/aktualnosci/:title",
        name: "SingleEvent",
        component: SingleEvent,
        meta: {
            title: "Aktualnosc"
        }
    }
];
