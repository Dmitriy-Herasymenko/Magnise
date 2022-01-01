import React, {FC} from "react";
import {IExchange, ISymbol} from '../../Types/';
import './style.scss';

interface IProps {
    selectData: IExchange[];
    selectSymbols: ISymbol[];
    handleSubmit: () => void;
    handleChangeExchange: (e:any) => void
    handleChangeSymbol: (e:any) => void
}

export const Subscribe: FC<IProps> = ({selectData, selectSymbols,  handleSubmit, handleChangeExchange, handleChangeSymbol}) => {
    return (
        <div className='market_subscribe' >
            <select name='select' className='select' onChange={handleChangeExchange}>{
                selectData && selectData.map(item => <option
                key={item.exchange_id}
                value={item.exchange_id}>
                {item.exchange_id}
            </option>)
            }
            </select>
            <select name='select' className='select select-symbol' onChange={handleChangeSymbol}>{
                selectSymbols && selectSymbols.map(item => <option
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