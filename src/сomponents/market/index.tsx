import React, {useEffect, useState} from 'react';
import { MarketData, ChartingData, Subscribe } from '../index';
import {IExchange, IHistory, IMarketData} from '../../Types';
import {config} from "../../utils/config";
import axios from 'axios';
import './style.scss'

export const Market = () => {
    const [selectExchange, setSelectExchange] = useState<IExchange[]>([]);
    const [selectSymbols, setSelectSymbols] = useState<any>([]);
    const [data, setData] = useState<IMarketData>({} as IMarketData)
    const [symbolId, setSymbolId] = useState<any>('')
    const [history, setHistory] = useState<IHistory[]>([])

    const handleChangeExchange = (e: any) => {
        const getExchangeId = e.target.value
        getSymbols(getExchangeId)
    };

    const handleChangeSymbol = (e: any) => {
        const getSymbolId = e.target.value
        getDataHistory(getSymbolId)
        setSymbolId(getSymbolId)
    };

    const handleSubmit = () => {
        exchangeRate()
    };

    const getExchanges = () => {
        axios.get<IExchange[]>('https://rest.coinapi.io/v1/exchanges', {
            headers: {
                'X-CoinAPI-Key': config.api
            }
        })
            .then(resp => setSelectExchange(resp.data))
            .catch(error => console.log(error))
    };

    const getSymbols = (exchangeId:string) => {
       axios.get(`https://rest.coinapi.io/v1/symbols/${exchangeId}`, {
            headers: {
                'X-CoinAPI-Key': config.api
            }})
            .then(resp => setSelectSymbols(resp.data))
            .catch(error => console.log(error))
    };
    const getDataHistory = (symbolId:string) => {
        axios.get<IHistory[]>(`https://rest.coinapi.io/v1/ohlcv/${symbolId}/latest?period_id=5SEC`, {
            headers: {
                'X-CoinAPI-Key': config.api
            }})
            .then(resp => setHistory(resp.data))
            .catch(error => console.log(error))
    };
    const exchangeRate = () => {
        const ws = new WebSocket("wss://ws-sandbox.coinapi.io/v1/");
        const apiCall = {
            type: "hello",
            apikey: config.api,
            heartbeat: false,
            subscribe_data_type: ["trade"],
            subscribe_filter_symbol_id: [symbolId]
        };
        ws.onopen = () => ws.send(JSON.stringify(apiCall));
        ws.onmessage = function (e) {
            try {
                const json = JSON.parse(e.data);
                console.log(json)
                setData(json)
            } catch (err) {
                console.log(err);
            }
        };
    };

    useEffect(() => {
        getExchanges()
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