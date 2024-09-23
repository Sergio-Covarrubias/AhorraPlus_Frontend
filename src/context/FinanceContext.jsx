import { createContext, useState, useContext } from 'react';
import { saveFixedCostsRequest, getFixedCostsRequest, saveRangeCostsRequest, getRangeCostsRequest } from '../api/costs';

export const FinanceContext = createContext();

export const useFinance = () => {
    const context = useContext(FinanceContext);
    if (!context) {
        throw new Error('useFinance must be used within an FinanceProvider');
    }
    return context;
};

export const FinanceProvider = ({ children }) => {
    const [ earnings, setEarnings ] = useState(0);
    const [ fixedCosts, setFixedCosts ] = useState([]);
    const [ rangeCosts, setRangeCosts ] = useState([]);
    
    const loadFixedCosts = async () => {
        const res = await getFixedCostsRequest();
        //console.log(res);
        
        if (res.data === null) {
            return { earnings: '', fixedCosts: [], };
        }
        
        setEarnings(res.data.earnings);
        setFixedCosts(res.data.fixedCosts);

        return { earnings: res.data.earnings, fixedCosts: [ ...res.data.fixedCosts ], };
    };

    const saveFixedCosts = async (earnings, fixedCosts) => {
        earnings = parseInt(earnings);
        for (let i = 0; i < fixedCosts.length; i++) {
            fixedCosts[i].value = parseInt(fixedCosts[i].value);
        }

        const res = await saveFixedCostsRequest(earnings, fixedCosts);
        //console.log(res);
    };
    
    const loadRangeCosts = async () => {
        const res = await getRangeCostsRequest();
        //console.log(res);

        if (res.data === null) {
            return { rangeCosts: [], };
        }

        setRangeCosts(res.data.rangeCosts);
        
        return { rangeCosts: [ ...res.data.rangeCosts ], };
    };

    const saveRangeCosts = async (rangeCosts) => {
        for (let i = 0; i < rangeCosts.length; i++) {
            rangeCosts[i].minValue = parseInt(rangeCosts[i].minValue);
            rangeCosts[i].maxValue = parseInt(rangeCosts[i].maxValue);
            rangeCosts[i].importance = parseInt(rangeCosts[i].importance);
        }

        const res = await saveRangeCostsRequest({ rangeCosts });
        //console.log(res);
    };

    return (
        <FinanceContext.Provider 
        value={{
            earnings,
            fixedCosts,
            rangeCosts,

            loadFixedCosts,
            loadRangeCosts,
            saveFixedCosts,
            saveRangeCosts,
        }}>
            { children }
        </FinanceContext.Provider>
    )
};
