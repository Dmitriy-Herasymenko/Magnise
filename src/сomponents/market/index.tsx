import React, {ChangeEvent, useEffect, useState} from 'react';
import { MarketData, ChartingData, Subscribe } from '../index';
import {IExchange, IHistory, IMarketData, ISymbol} from '../../types';
import {getExchangeRate, getDataHistory, getExchanges, getSymbols} from '../../utils/api';
import './style.scss'


export const Market = () => {
    const [selectExchange, setSelectExchange] = useState<IExchange[]>([]);
    const [selectSymbols, setSelectSymbols] = useState<ISymbol[]>([]);
    const [data, setData] = useState<IMarketData>({} as IMarketData);
    const [symbolId, setSymbolId] = useState<string>('');
    const [history, setHistory] = useState<IHistory[]>([]);

    const handleChangeExchange = async (e:ChangeEvent<{ value: string }>) => {
        const getExchangeId = e.target.value
        getSymbols(getExchangeId, (data) => setSelectSymbols(data))
    };
    const handleChangeSymbol = async (e: ChangeEvent<{ value: string }>) => {
        const getSymbolId = e.target.value;
        setSymbolId(getSymbolId)
        getDataHistory(getSymbolId, (data) => setHistory(data))
    };
    const handleSubmit = async () => {
        let checkSymbol = symbolId;
        if(checkSymbol === '' && selectSymbols.length) checkSymbol = selectSymbols[0].symbol_id;
        getExchangeRate(checkSymbol, (data) => {setData(data)})
    };

    useEffect(() => {
            getExchanges((data) => setSelectExchange(data))
    }, [])

    return (
        <div className='market'>
          <Subscribe
              selectData={selectExchange}
              selectSymbols={selectSymbols}
              handleChangeExchange={handleChangeExchange}
              handleChangeSymbol={handleChangeSymbol}
              handleSubmit={handleSubmit}
          />
          <MarketData data={data} />
          <ChartingData history={history} />
        </div>
    )
}