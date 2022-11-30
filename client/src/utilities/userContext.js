import { createContext } from "react";

export const UserContext = createContext({
    'user': null,
    'portfolios': [],
    'investments': null,
    'obj': []
});