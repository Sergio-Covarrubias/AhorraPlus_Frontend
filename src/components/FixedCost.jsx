import React from 'react';

class FixedCost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            register: props.register,
            remove: props.remove,
            index: props.index,
            id: props.id,
        };

        //console.log('created with:', this.state.id);
    }

    render() {
        //                <button type='button' onClick={ () => { this.state.remove(this.state.id); } } className='font-bold text-red-600'>Borrar</button>

        return (
            <div className='flex justify-evenly font-mono'>
                <input type='text' placeholder={ `Nombre del gasto` } { ...this.state.register(`fixedCosts.${this.state.index}.name`, { required: true }) } />
                <input type='number' placeholder={ `Valor del gasto` } { ...this.state.register(`fixedCosts.${this.state.index}.value`, { required: true }) } />
                <select { ...this.state.register(`fixedCosts.${this.state.index}.frequency`, { required: true }) } className='mr-5'>
                    <option value='Mensualmente'>Mensualmente</option>
                    <option value='Semanalmente'>Semanalmente</option>
                    <option value='Diariamente'>Diariamente</option>
                </select>
            </div>
        )
    }
};

export default FixedCost;
