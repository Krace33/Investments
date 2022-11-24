import { Investment, PortFolio} from "../mongodb.js";

const getPortfolioValue = async (userID, portfolioID) => {
    let value = 0;
    const investments = await Investment.find({ userID, portfolioID });
    for (const investment in investments) {
        value += investment.quantity * 5
    }
    return value;
}

const getNetWorth = async (userID) => {
    let netWorth = 1;
    const portfolios = await PortFolio.find({ userID });
    for (const portfolio in portfolios) {
        const value = getPortfolioValue(userID, portfolio.name);
        netWorth += value;
    }
    return netWorth;
}

const getNetWorth2 = async (userID, portfolios) => {
    let netWorth = 1;
    for (const portfolio in portfolios) {
        const value = await getPortfolioValue(userID, portfolio.name);
        netWorth += value;
    }
    return netWorth
}

export {getNetWorth, getNetWorth2, getPortfolioValue};