import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useFinance } from '../context/FinanceContext';
import FixedCost from '../components/FixedCost';

function FixedCostsPage() {
    const { register, handleSubmit, control, setValue } = useForm({
        defaultValues: {
            earnings: 0,
            fixedCosts: [{ name: '', value: '', frequency: 'Mensualmente', }],
        },
    });
    const { fields, append, remove } = useFieldArray({
        name: 'fixedCosts',
        control,
    });

    const onRemove = (id) => {
        console.log('enter', fields);
        console.log('sent', id);
        for (let i = 0; i < fields.length; i++) {
            console.log('current', fields[i].id);
            if (fields[i].id == id) {
                console.log('here');
                remove(i);
                break;
            }
        }
    };

    // useEffect(() => {
    //     console.log('update', fields);
    // }, [fields]);

    const { loadFixedCosts, saveFixedCosts } = useFinance();
    useEffect(() => {
        async function loadFixedCostsFromDatabase() {
            console.log('load');
            const { earnings,  fixedCosts } = await loadFixedCosts();

            setValue('earnings', earnings);
            //setAmountOfFixedCosts(fixedCosts.length);

            remove();
            fixedCosts.forEach((element, index) => {
                console.log(element)
                append(element);
            });
        }
        loadFixedCostsFromDatabase();
    }, []);

    const onSubmit = handleSubmit(async (data) => {
        await saveFixedCosts(data.earnings, data.fixedCosts);
    });

    return (
        <div className='bg-green-50 min-h-screen flex items-center justify-center '> 
            <div className='bg-white w-full max-w-fit rounded-sm shadow-[5px_5px_0px_0px_#cccccc] p-6'>
                <h2 className='text-2xl font-mono mb-4 text-gray-700'>Gastos fijos</h2>
                
                <form onSubmit={onSubmit} className='space-y-4'>
                    <div>
                        <label htmlFor='earnings' className='block text-sm font-medium text-gray-600 mb-1 font-mono'>Ingresos totales:</label>
                        <input 
                        id='earnings' 
                        type='number' 
                        placeholder='Escriba ganancias' 
                        { ...register('earnings', { required: true }) } 
                        className='block w-full px-3 py-2 border text-gray-600 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 font-mono'
                        />
                    </div>
            
                    <button 
                        type='button' 
                        onClick={ () => { 
                            //setAmountOfFixedCosts(fields.length + 1); 
                            append({ name: '', value: '', frequency: 'Mensualmente' }); 
                        }} 
                        className='font-mono px-4 py-2 mr-5 bg-green-500 text-white hover:bg-green-600 rounded-sm shadow-[5px_5px_0px_0px_#218f38]'
                    >
                        Agregar gastos
                    </button>

                    <button className='font-mono px-4 py-2 bg-red-500 text-white hover:bg-green-600 rounded-sm shadow-[5px_5px_0px_0px_#218f38]' type='button' onClick={ () => { remove() } }>Borrar</button>
                    
                    <div className='space-y-4'>
                        {
                            // Array.from(Array(amountOfFixedCosts), (element, index) => (
    
                            //     <FixedCost key={index} register={register} remove={onRemove} index={index} />
                            // ))
                            fields.map((field, index) => (
                                <FixedCost key={ index } register={ register } remove={ onRemove } index={index} id={field.id} />
                            ))
                        }
                    </div>

                    <button className='w-full px-4 py-2 bg-green-600 text-white font-mono rounded-sm shadow-[5px_5px_0px_0px_#218f38] hover:bg-green-700'>Guardar</button>
                </form>
            </div>
        </div>
    )
}

export default FixedCostsPage;
