import { createContext } from "react";

export const UserContext = createContext({
    'user': '',
    'portfolios': [],
    'investments': [],
    'obj': [],
    'options':[]
});