import { createContext } from "react";

export const UserContext = createContext({
    'user': null,
    'portfolios': null,
    'investments': null,
    'obj': [],
    'options':[]
});