import { createContext, useState, useContext } from 'react';
import GraphCard from '../components/GraphCard';

export const GraphContext = createContext();

export const useGraph = () => {
    const context = useContext(GraphContext);
    if (!context) {
        throw new Error('useGraph must be used within an GraphProvider');
    }
    return context;
};

export const GraphProvider = ({ children }) => {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const createGraph = (data, title, colors = COLORS) => {
        let removedData = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].value === 0) {
                removedData.push(data.splice(i, 1)[0]);
                i--;
            }
        }

        return (
            <div className='bg-green-400/50 border-4 border-black rounded-3xl min-w-fit mx-5 px-5 py-7'>
                <h1 className='text-2xl font-semibold text-center'>{ title }</h1>
                <div className='flex justify-center items-center'>
                    <GraphCard data={ data } title={ title } colors={ colors } />
                </div>
                
            </div>
        )
    }

    // Range Costs //

    const firstSweep = (rangeCosts, earnings, approved = [], underBudgets = [], overBudgets = []) => {
        let sum = rangeCosts.reduce((sum, rangeCost) => sum + rangeCost.importance, 0) + approved.reduce((sum, rangeCost) => sum + rangeCost.importance, 0);

        while (rangeCosts.length > 0) {
            let coefficient = rangeCosts[0].importance / sum;
            let budget = earnings * coefficient;
            
            if (budget >= rangeCosts[0].maxValue) {
                //console.log('ob');
                //console.dir(rangeCosts[0]);

                let newOverBudget = rangeCosts.splice(0, 1)[0];
                earnings -= newOverBudget.maxValue;
                overBudgets.push(newOverBudget);
            } else if (budget < rangeCosts[0].minValue) {
                //console.log('ub');
                //console.dir(rangeCosts[0]);

                let newUnderBudget = rangeCosts.splice(0, 1)[0];
                underBudgets.push(newUnderBudget);
            } else {
                //console.log('app');
                //console.dir(rangeCosts[0]);

                let newApproved = rangeCosts.splice(0, 1)[0];
                approved.push(newApproved);
            }
        }

        return { remainingEarnings: earnings, approved, underBudgets, overBudgets };
    };

    const restoreUnderBudgets = (underBudgets, earnings, approved, overBudgets) => { 
        underBudgets.sort((a, b) => ((a.importance === b.importance) ? a.minValue - b.minValue : b.importance - a.importance));
        
        let trueUnderBudgets = [];
        while (underBudgets.length > 0) {
            //console.log('cunder');
            //console.dir(underBudgets[0]);

            let sum = approved.reduce((sum, rangeCost) => sum + rangeCost.importance, 0) + underBudgets.reduce((sum, rangeCost) => sum + rangeCost.importance, 0);
            let coefficient = underBudgets[0].importance / sum;
            let budget = earnings * coefficient;

            let budgetGotten = -1;
            if (budget >= underBudgets[0].minValue) {
                budgetGotten = budget;
            }
            else {                
                for (let i = underBudgets.length - 1; i >= 1; i--) {
                    sum -= underBudgets[i].importance;

                    let coefficient = underBudgets[0].importance / sum;
                    let budget = earnings * coefficient;

                    if (budget >= underBudgets[0].minValue) {
                        budgetGotten = budget;

                        let newTrueUnderBudgets = underBudgets.splice(i, underBudgets.length - i);
                        trueUnderBudgets.splice(0, 0, ...newTrueUnderBudgets);
                        break;
                    }
                }
            }

            if (budgetGotten === -1) {
                //console.log('ub');

                let trueUnderBudget = underBudgets.splice(0, 1)[0];
                trueUnderBudgets.push(trueUnderBudget);
            } else {
                if (budgetGotten >= underBudgets[0].maxValue) {
                    //console.log('ob');

                    let newOverBudget = underBudgets.splice(0, 1)[0];
                    overBudgets.push(newOverBudget);
                    earnings -= newOverBudget.maxValue;
                } else {
                    //console.log('app');

                    let newApproved = underBudgets.splice(0, 1)[0];
                    approved.push(newApproved);
                }
            }
        }

        return { remainingEarnings: earnings, approved, underBudgets: trueUnderBudgets, overBudgets };
    };

    const convertApprovedOverbudgets = (earnings, approved, overBudgets) => {
        let remainingEarnings = earnings;
        let fixedCosts = [];

        let sum = approved.reduce((sum, rangeCost) => sum + rangeCost.importance, 0);
        approved.forEach(rangeCost => {
            let coefficient = rangeCost.importance / sum;
            let budget = earnings * coefficient;
            
            remainingEarnings -= budget;
            fixedCosts.push({
                name: rangeCost.name,
                value: budget,
                frequency: rangeCost.frequency,
            });
        });

        overBudgets.forEach(rangeCost => {
            fixedCosts.push({
                name: rangeCost.name,
                value: rangeCost.maxValue,
                frequency: rangeCost.frequency,
            });
        });

        return { remainingEarnings, fixedCosts };
    };

    const convertToFixedCosts = (rangeCosts, earnings) => {
        
        const obj1 = firstSweep(rangeCosts, earnings);
        //console.dir(obj1);

        const obj2 = restoreUnderBudgets(obj1.underBudgets, obj1.remainingEarnings, obj1.approved, obj1.overBudgets);
        //console.dir(obj2);

        const obj3 = convertApprovedOverbudgets(obj2.remainingEarnings, obj2.approved, obj2.overBudgets);
        //console.dir(obj3);

        return { remainingEarnings: obj3.remainingEarnings, fixedCosts: obj3.fixedCosts, underBudgets: obj2.underBudgets }
    };

    // Range Costs //

    return (
        <GraphContext.Provider value={{
            createGraph,
            convertToFixedCosts,
        }}>
            { children }
        </GraphContext.Provider>
    )
};
