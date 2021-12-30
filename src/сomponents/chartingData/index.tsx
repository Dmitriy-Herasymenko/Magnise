import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import {IHistory} from "../../Types/";
import {FC} from "react";
import './style.scss';

interface IPops {
    history: any
}

export  const ChartingData: FC<IPops> = ({history}) => {
    const dataNew = history.map((item:any) => {
        const date = new Date(item.time_close).toLocaleDateString()
        return {
            name: date,
            uv: item.price_close
        }
    })

    return (
        <div className='market-charting'>
            <LineChart width={1000} height={300} data={dataNew}>
                <XAxis dataKey="name"/>
                <YAxis/>
                <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            </LineChart>
        </div>
    )
}