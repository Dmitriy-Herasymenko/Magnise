import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend} from 'recharts';
import {IHistory} from '../../Types/';
import {FC} from 'react';
import './style.scss';

interface IPops {
    history: IHistory[]
}

export  const ChartingData: FC<IPops> = ({history}) => {
    const dataNew = history.map((item:any) => {
        const date = new Date(item.time_close).toLocaleDateString()
        return {
            name: date,
            price: item.volume_traded
        }
    })

    return (
        <div className='market-charting'>
            <LineChart width={1000} height={300} data={dataNew}>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip />
                <Legend />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                <Line type="monotone" dataKey="price" stroke="#195fb4" />
            </LineChart>
        </div>
    )
}