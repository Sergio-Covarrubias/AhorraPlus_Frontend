import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useFinance } from '../context/FinanceContext';
import RangeCost from '../components/RangeCost';

function RangeCostsPage() {
    const { register, handleSubmit, control, getValues } = useForm({
        defaultValues: {
            rangeCosts: [{ name: '', minValue: '', maxValue: '', frequency: 'Mensualmente', importance: 50 }],
        }
    });
    const { fields, append, remove } = useFieldArray({
        name: 'rangeCosts',
        control,
    });

    const [ amountOfRangeCosts, setAmountOfRangeCosts ] = useState(0);
    const onRemove = (index) => {
        setAmountOfRangeCosts(amountOfRangeCosts - 1);
        remove(index);
    };
    
    const { loadRangeCosts, saveRangeCosts } = useFinance();
    useEffect(() => {
        async function loadRangeCostsFromDatabase() {
            const { rangeCosts } = await loadRangeCosts();
            setAmountOfRangeCosts(rangeCosts.length);

            remove();
            rangeCosts.forEach((element, index) => {
                append(element); 
            });
        }
        loadRangeCostsFromDatabase();
    }, []);

    const onSubmit = handleSubmit(async (data) => {
        await saveRangeCosts(data.rangeCosts);
    });
    
    return (
        <div className='bg-green-50 min-h-screen flex items-center justify-center '>
            <div className='bg-white font-mono w-full max-w-fit rounded-sm shadow-[5px_5px_0px_0px_#cccccc] p-6'>
                <h2 className='text-2xl font-mono mb-4 text-gray-700'>Rango de importancia de tus gastos</h2>
           
                <form className='space-y-6' onSubmit={ onSubmit }>
                    <button className='font-mono px-4 py-2 mr-5 bg-green-500 text-white hover:bg-green-600 rounded-sm shadow-[5px_5px_0px_0px_#218f38]' type='button' onClick={ () => { setAmountOfRangeCosts(amountOfRangeCosts + 1); append({ name: '', minValue: '', maxValue: '', frequency: 'Mensualmente', }) } }>Agregar gasto</button>
                    <button className='font-mono px-4 py-2 bg-red-500 text-white hover:bg-green-600 rounded-sm shadow-[5px_5px_0px_0px_#218f38]' type='button' onClick={ () => { setAmountOfRangeCosts(0); remove() } }>Borrar</button>
        
                    <div className='space-y-4'>
                    {amountOfRangeCosts > 0 && (
                        <div className='flex justify-between space-x-2'>
                            <div className='flex justify-between space-x-2 mb-2'>
                                <div>
                                    <p style={{ padding: '2px', width: '60px', height: '24px', fontSize: '14px' }}>Nombre</p>
                                </div>
                                <div>
                                    <p style={{ padding: '2px', width: '60px', height: '24px', fontSize: '14px' }}>Valor mínimo</p>
                                </div>
                                <div>
                                    <p style={{ padding: '2px', width: '60px', height: '24px', fontSize: '14px' }}>Valor máximo</p>
                                </div>
                                <div>
                                    <p style={{ padding: '2px', width: '60px', height: '24px', fontSize: '14px' }}>Frecuencia</p>
                                </div>
                            </div>
                            <div>
                                <p style={{ padding: '2px', fontSize: '14px' }}>Porcentaje de importancia</p>
                            </div>
                        </div>
                    )}
                    {Array.from(Array(amountOfRangeCosts), (element, index) => (
                        <RangeCost key={ index } register={ register } remove={ onRemove } getValues={ getValues } index={ index } />
                    ))}
                </div>

                <br />
                <button className='w-full px-4 py-2 bg-green-600 text-white rounded-sm shadow-[5px_5px_0px_0px_#218f38] hover:bg-green-700'>Guardar</button>
            </form>
            </div>
        </div>
    )
}

export default RangeCostsPage;