import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import FixedCost from '../components/FixedCost';
import { useFinance } from '../context/FinanceContext';

function FixedCostsPage() {
    // useForm and useField
    const { register, handleSubmit, control, setValue } = useForm({
        defaultValues: {
            earnings: 0,
            fixedCosts: [{ name: '', value: '', frequency: 'Mensualmente' }],
        },
    });
    const { fields, append, remove } = useFieldArray({
        name: 'fixedCosts',
        control,
    });

    const [ amountOfFixedCosts, setAmountOfFixedCosts ] = useState(0);
    const onRemove = (index) => {
        setAmountOfFixedCosts(amountOfFixedCosts - 1);
        remove(index);
    };

    const { loadFixedCosts, saveFixedCosts } = useFinance();
    useEffect(() => {
        async function loadFixedCostsFromDatabase() {
            const { earnings,  fixedCosts } = await loadFixedCosts();

            setValue('earnings', earnings);
            setAmountOfFixedCosts(fixedCosts.length);

            remove();
            console.log(fixedCosts)
            fixedCosts.forEach((element, index) => {
                append(element);
            });
        }
        loadFixedCostsFromDatabase();
    }, []);

    const onSubmit = handleSubmit(async (data) => {
        await saveFixedCosts(data.earnings, data.fixedCosts);
    });

    return (
        <div>
            <form onSubmit={ onSubmit }>
                <label htmlFor='earnings'>Earnings: </label>
                <input id='earnings' type='number' placeholder='Insert earnings' { ...register('earnings', { required: true }) } />
                <br /> <br />
                
                <button type='button' onClick={ () => { setAmountOfFixedCosts(amountOfFixedCosts + 1); append({ name: '', value: '', frequency: 'Monthly', }) } }>Add</button>
                <br /><br />

                {
                    Array.from(Array(amountOfFixedCosts), (element, index) => (
                        <FixedCost key={ index } register={ register } remove={ onRemove } index={ index } />
                    ))
                }

                <br />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default FixedCostsPage;
