import React from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

class GraphCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.title,
            data: props.data,
            createGraph: props.createGraph,
            colors: props.colors,
            animationIsActive: true,
            labelFunc: ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                const RADIAN = Math.PI / 180;   
                
                const radiusPercent = innerRadius + (outerRadius - innerRadius) * 0.60;
                const xPercent = cx + radiusPercent * Math.cos(-midAngle * RADIAN);
                const yPercent = cy + radiusPercent * Math.sin(-midAngle * RADIAN); 
                
                const radiusName = outerRadius + 15;
                const xName = cx + radiusName * Math.cos(-midAngle * RADIAN);
                const yName = cy + radiusName * Math.sin(-midAngle * RADIAN);
                return (
                    <>
                        <text x={ xPercent } y={ yPercent } fill='white' textAnchor={ 'middle' } dominantBaseline='central'>
                            { `${(percent * 100).toFixed(1)}%` }
                        </text> 
                        
                        <text x={ xName } y={ yName } fill='black' textAnchor={ xName > cx ? 'start' : 'end' } dominantBaseline='central'>
                            { this.state.data[index].name }
                        </text>
                    </>
                );
            }
        };
    };

    render() {
        setTimeout(() => { this.setState({
            title: this.state.title,
            data: this.state.data,
            createGraph: this.state.createGraph,
            colors: this.state.colors,
            animationIsActive: false,
            labelFunc: this.state.labelFunc,
        }); }, 2100);

        return (
            <PieChart width={ 450 } height={ 250 } data={ this.state.data } dataKey='value'>
                <Tooltip/>
                <Pie
                    data={ this.state.data }
                    dataKey='value'
                    outerRadius={ 100 }
                    labelLine={ false }
                    animationDuration={ 1500 }
                    label={ this.state.animationIsActive ? false : this.state.labelFunc }
                >
                    {
                        this.state.data.map((entry, index) => (
                            <Cell key={ `cell-${index}` } fill={ this.state.colors[index % this.state.colors.length] } />
                        ))
                    }
                </Pie>
            </PieChart>
        )
    }
};

export default GraphCard;
