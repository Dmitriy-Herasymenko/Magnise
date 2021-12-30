import React, {FC} from "react";
import {IExchange} from '../../Types/';
import './style.scss';

interface IProps {
    selectData: IExchange[];
    selectSymbols: any;
    handleSubmit: () => void;
    handleChangeExchange: (e: React.SyntheticEvent) => void
    handleChangeSymbol: any
}

export const Subscribe: FC<IProps> = ({selectData, selectSymbols,  handleSubmit, handleChangeExchange, handleChangeSymbol}) => {
    return (
        <div className='market_subscribe' >
            <select name='select' onChange={handleChangeExchange}>{
                selectData && selectData.map((item) => <option
                key={item.exchange_id}
                value={item.exchange_id}>
                {item.exchange_id}
            </option>)
            }
            </select>
            <select name='select' onChange={handleChangeSymbol}>{
                selectSymbols && selectSymbols.map((item:any) => <option
                    key={item.symbol_id}
                    value={item.symbol_id}>
                    {item.symbol_id}
                </option>)
            }
            </select>
            <button className='market_btn-subscribe' onClick={handleSubmit}>Subscribe</button>
        </div>
    )
}