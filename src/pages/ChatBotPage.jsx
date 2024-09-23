import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { chatbotRequest } from '../api/chatbot';
import { useFinance } from '../context/FinanceContext';
import { useGraph } from '../context/GraphContext';

function ChatBotPage() {
    const { register, handleSubmit } = useForm();
    
    const { loadFixedCosts, loadRangeCosts } = useFinance();
    const { convertToFixedCosts } = useGraph();

    const [ responseFragment, setResponseFragment ] = useState('');
    const [ response, setResponse ] = useState('');

    const onSubmit = handleSubmit(async (data) => {     
        let { earnings: valueEarnings, fixedCosts: valueFixedCosts } = await loadFixedCosts();
        let { rangeCosts: valueRangeCosts } = await loadRangeCosts();

        // console.log(earnings);
        // console.log(fixedCosts);
        // console.log(rangeCosts);

        let earnings = valueEarnings;
        valueFixedCosts.forEach(fixedCost => {
            valueEarnings -= fixedCost.value;
        });

        let { remainingEarnings, fixedCosts: transfomedCosts, underBudgets } = convertToFixedCosts(valueRangeCosts, valueEarnings);
        valueFixedCosts.splice(valueFixedCosts.length - 1, 0, ...transfomedCosts);
        let combinedCosts = [ ...valueFixedCosts ];
        
        let gastosTexto = '';
        combinedCosts.forEach((cost, index) => {
            gastosTexto += `Gasto ${index + 1}: ${cost.name.toLowerCase()} con un costo de ${cost.value} pesos ${cost.frequency.toLowerCase()}.\n`;
        });

        const question = `Soy un ${data.profesion.toLowerCase()} con una edad de ${data.age} años. Tengo un salario mensual de ${earnings} pesos y mis gastos son los siguientes:\n${gastosTexto}¿Qué estrategias me recomiendas para ahorrar?`;   
        console.log(question);

        const res = await chatbotRequest(question);
        console.log(res.data.response);
        setResponse(res.data.response);

        //setResponse(question);
    });

    const customSleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    const wordSpeed = 100;
    useEffect(() => {
        if (response.length === 0) {
            return;
        }

        async function startResponse() {
            await customSleep(1000 / wordSpeed);
            setResponseFragment(response[0]);
        }
        startResponse();
    }, [response]);

    
    useEffect(() => {
        if (response.length === 0 || response.length === responseFragment.length) {
            return;
        }

        async function continueResponse() {
            await customSleep(1000 / wordSpeed);
            setResponseFragment(responseFragment + response[responseFragment.length])
        }
        continueResponse();
    }, [responseFragment]);
    
    return(
        <div className='bg-green-50 min-h-screen flex items-center justify-center '> 
            <div className='bg-white w-full max-w-4xl rounded-sm shadow-[5px_5px_0px_0px_#cccccc] p-6'>
                <h1 className= 'text-2xl font-mono mb-4 text-gray-700'>ChatBot</h1>
                
                <form onSubmit={ onSubmit }>
                    <div className='flex'>
                        <div className='w-1/2 mr-5'>
                            <label htmlFor='profesion' className='font-mono'>Profesión:</label>
                            <input type='text' id='profesion' placeholder='Escriba su profesión' { ...register('profesion', { required: true }) } className='block w-full px-3 py-2 border text-gray-600 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 font-mono mb-6'/>
                        </div>
                        
                        <div className='w-1/2 mr-5'>
                            <label htmlFor='edad' className='font-mono'>Edad:</label>
                            <input type='number' id='edad' placeholder='Escriba su edad' { ...register('age', { required: true, min: 1 }) } className='block w-full px-3 py-2 border text-gray-600 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 font-mono mb-6'/>
                        </div>
                    </div>

                    <button className='font-mono px-4 py-2 bg-green-500 text-white mt-2 hover:bg-green-600 rounded-sm shadow-[5px_5px_0px_0px_#218f38]'>Click</button>
                </form>
                
                <p className='block w-full px-3 py-2 border text-gray-600 border-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-green-500 font-mono mb-1 mt-6'>{ responseFragment ? responseFragment : '' }</p>
            </div>
        </div>
    )
};

export default ChatBotPage;
