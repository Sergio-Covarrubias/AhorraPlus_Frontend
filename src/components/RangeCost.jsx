import React from 'react';

class RangeCost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            register: props.register,
            remove: props.remove,
            getValues: props.getValues,
            index: props.index,
        };
    }

    render() {
        //                <button type='button' onClick={ () => { this.state.remove(this.state.index); } } className='font-bold text-red-600'>Borrar</button>

        return (
            <div className='flex justify-between space-x-2 font-mono'>
                <input style={{ padding: '2px', width: '60px', height: '24px', fontSize: '12px' }} className=' block border text-gray-600 border-gray-300 rounded-md shadow-sm focus:ring-green-500 font-mono p-1' type='text' { ...this.state.register(`rangeCosts.${this.state.index}.name`, { required: true }) } />
                <input style={{ padding: '2px', width: '60px', height: '24px', fontSize: '12px' }} className=' block border text-gray-600 border-gray-300 rounded-md shadow-sm focus:ring-green-500 font-mono p-1' type='number' { ...this.state.register(`rangeCosts.${this.state.index}.minValue`, { required: true }) } />
                <input style={{ padding: '2px', width: '60px', height: '24px', fontSize: '12px' }} className=' block border text-gray-600 border-gray-300 rounded-md shadow-sm focus:ring-green-500 font-mono p-1' type='number' { ...this.state.register(`rangeCosts.${this.state.index}.maxValue`, { required: true }) } />
                <select style={{ padding: '2px', width: '80px', height: '24px', fontSize: '12px' }}  className='px-1 py-1 border border-gray-300 rounded-md text-sm h-6 text-gray-600 ' { ...this.state.register(`rangeCosts.${this.state.index}.frequency`, { required: true }) }>
                    <option value='Mensualmente'>Mensualmente</option>
                    <option value='Semanalmente'>Semanalmente</option>
                    <option value='Diariamente'>Diariamente</option>
                </select>
                <input className='h-6 text-sm font-bold' id='importance' type='range' min='1' max='100' { ...this.state.register(`rangeCosts.${this.state.index}.importance`, { onChange: (e) => { this.forceUpdate() }, required: true }) } />
                <p className='text-sm'>{ this.state.getValues(`rangeCosts.${this.state.index}.importance`) !== undefined ? this.state.getValues(`rangeCosts.${this.state.index}.importance`) : '50' }%</p>
                <p className= 'text-sm'>de imporancia</p>

            </div>
        )
    }
};

export default RangeCost;
