import { useEffect, useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { useGraph } from '../context/GraphContext';

function GraphsPage() {
    const { createGraph, convertToFixedCosts } = useGraph();

    const [ onlyFixedCosts, setOnlyFixedCosts ] = useState([]);
    const [ onlyRangeCosts, setOnlyRangeCosts ] = useState([]);
    const [ fixedAndRangeCosts, setFixedAndRangeCosts ] = useState([]);
    const [ fixedRangeEarningsCosts, setFixedRangeEarningsCosts ] = useState([]);

    const [ isLoading, setIsLoading ] = useState(true);
    const [ err, setErrors ] = useState([]); 
    
    const { loadFixedCosts, loadRangeCosts } = useFinance();
    useEffect(() => {
        async function loadFinanceFromDatabase() {
            let { earnings: valueEarnings, fixedCosts: valueFixedCosts } = await loadFixedCosts();
            let { rangeCosts: valueRangeCosts } = await loadRangeCosts();

            for (let i = 0; i < valueFixedCosts.length; i++) {
                if (valueFixedCosts[i].frequency === 'Semanalmente') {
                    valueFixedCosts[i].value *= 4;
                } else if (valueFixedCosts[i].frequency === 'Diariamente') {
                    valueFixedCosts[i].value *= 30;
                }
            }
            for (let i = 0; i < valueRangeCosts.length; i++) {
                if (valueRangeCosts[i].frequency === 'Semanalmente') {
                    valueRangeCosts[i].minValue *= 4;
                    valueRangeCosts[i].maxValue *= 4;
                } else if (valueRangeCosts[i].frequency === 'Diariamente') {
                    valueRangeCosts[i].minValue *= 30;
                    valueRangeCosts[i].maxValue *= 30;
                }
            }

            let tempErr = {};

            setOnlyFixedCosts([ ...valueFixedCosts ]);
            if (valueFixedCosts.length === 0) {
                tempErr = { ...tempErr, emptyFixedCosts: 'No hay gastos fijos que mostrar' }
                //setErrors({ ...errors, emptyFixedCosts: 'No hay gastos fijos que mostrar' });
            }

            valueFixedCosts.forEach(fixedCost => {
                valueEarnings -= fixedCost.value;
            });
            if (valueEarnings < 0) {
                tempErr = { ...tempErr, insufficientFunds: 'No hay suficientes ingresos para pagar los gastos fijos' }
                //setErrors({ ...errors, insufficientFunds: 'No hay suficientes ingresos para pagar los gastos fijos' });
            }

            let { remainingEarnings, fixedCosts: transfomedCosts, underBudgets } = convertToFixedCosts(valueRangeCosts, valueEarnings);
            setOnlyRangeCosts([ ...transfomedCosts ]);
            if (transfomedCosts.length === 0) {
                tempErr = { ...tempErr, emptyRangeCosts: 'No hay gastos con rango que mostrar' }
                //setErrors({ ...errors, emptyRangeCosts: 'No hay gastos con rango que mostrar' });
            }

            valueFixedCosts.splice(valueFixedCosts.length - 1, 0, ...transfomedCosts);
            setFixedAndRangeCosts([ ...valueFixedCosts ]);
            if (valueFixedCosts.length === 0) {
                tempErr = { ...tempErr, emptyFixedRangeCosts: 'No hay gastos fijos ni gastos con rango que mostrar' }
                //setErrors({ ...errors, emptyFixedRangeCosts: 'No hay gastos fijos ni gastos con rango que mostrar' });
            }

            valueFixedCosts.push({ name: 'Savings', value: remainingEarnings });
            setFixedRangeEarningsCosts([ ...valueFixedCosts ]);

            setErrors(tempErr);
            setIsLoading(false);

            //console.log(remainingEarnings);
            //console.log(valueFixedCosts);
            //console.log(underBudgets);
        } 
        loadFinanceFromDatabase();
    }, []);

    return (
        <div className='bg-green-50 min-h-screen flex items-center justify-center p-20 font-mono'>
            <div className='bg-white w-full max-w-fit rounded-sm shadow-[5px_5px_0px_0px_#cccccc] p-6'>
            <>
            {
                isLoading ? 
                <h1>Loading...</h1>
                :
                <>
                    <div className='place-items-center py-10 grid md:grid-cols-2 gap-4'>
                    {
                        'emptyFixedCosts' in err ?
                            <p className='text-red font-mono'>{ err.emptyFixedCosts }</p>
                        :
                            createGraph(onlyFixedCosts, 'Gastos fijos')
                    }
                    {
                        'emptyRangeCosts' in err ?
                        <p>{ err.emptyRangeCosts }</p>
                        :
                        createGraph(onlyRangeCosts, 'Gastos con rango')
                    }
                    </div>
                
                    <div className='place-items-center py-10 grid md:grid-cols-2 gap-4'>
                    {
                        'emptyFixedRangeCosts' in err ?
                        <p>{ err.emptyFixedRangeCosts }</p>
                        :
                        createGraph(fixedAndRangeCosts, 'Gastos fijos y con rango')
                    }
                    {
                        'insufficientFunds' in err ?
                        <p>{ err.insufficientFunds }</p>
                        :
                        createGraph(fixedRangeEarningsCosts, 'Gastos fijos, gastos con rango y los ahorros')
                    }
                    </div>
                </>
            }
            </>
            </div>
        </div>

    )
}

export default GraphsPage;
