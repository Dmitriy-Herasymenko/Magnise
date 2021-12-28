import {FC} from "react";
import {IExchange} from '../../Types/';
import './style.scss';

interface IProps {
    selectData: IExchange[];
}

export const Subscribe: FC<IProps> = ({selectData}) => {
    return (
        <div className='market_subscribe'>
            <select name='select'>{selectData && selectData.map((item) => <option key={item.exchange_id}
                                                                                       value={item.exchange_id}>{item.name}</option>)}</select>
            <button className='market_btn-subscribe'>Subscribe</button>
        </div>
    )
}