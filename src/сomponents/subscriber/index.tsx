import React, {ChangeEvent, FC} from 'react';
import {IExchange, ISymbol} from '../../types/';
import './style.scss';

interface IProps {
    selectData: IExchange[];
    selectSymbols: ISymbol[];
    handleSubmit: () => void;
    handleChangeExchange: (e: ChangeEvent<{ value: string }>) => void
    handleChangeSymbol: (e: ChangeEvent<{ value: string }>) => void
}

export const Subscribe: FC<IProps> = ({
                                          selectData,
                                          selectSymbols,
                                          handleSubmit,
                                          handleChangeExchange,
                                          handleChangeSymbol
                                      }) => {
    return (
        <div className='market_subscribe'>
            <select name='select' className='select' onChange={handleChangeExchange}>
                <option>Choose exchange</option>
                {selectData && selectData.map(item => (
                    <option
                        key={item.exchange_id}
                        value={item.exchange_id}
                        defaultValue={selectData[0].exchange_id}
                    >
                        {item.exchange_id}
                    </option>
                ))}
            </select>
            {selectSymbols.length !== 0 && (
                <select name='select' className='select select-symbol' onChange={handleChangeSymbol}>
                    <option>Choose symbol</option>
                    {selectSymbols && selectSymbols.map(item => <option
                        key={item.symbol_id}
                        value={item.symbol_id}>
                        {item.symbol_id}
                    </option>)}
                </select>
            )}
            <button className='market_btn-subscribe' onClick={handleSubmit}>Subscribe</button>
        </div>
    )
}