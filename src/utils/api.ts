import {config} from "./config";
import axios, {AxiosError} from "axios";
import {IExchange, IHistory, IMarketData, ISymbol} from "../Types";

const settings = {headers: {
        'X-CoinAPI-Key': config.api
    }};

export const getExchanges = async (setSelectExchange:(data:IExchange[]) => void) => {
    try {
        const {data} = await axios.get<IExchange[]>(`https://rest.coinapi.io/v1/exchanges`, settings)
        setSelectExchange(data)
    } catch (e) {
        const err = e as AxiosError
        console.log(err.response?.data)
    }
};
export const getSymbols = async (exchangeId:string, setSelectSymbols:(data:ISymbol[]) => void) => {
    try {
        const {data} = await axios.get<ISymbol[]>(`https://rest.coinapi.io/v1/symbols/${exchangeId}`, settings)
        setSelectSymbols(data)
    } catch (e) {
        const err = e as AxiosError
        console.log(err.response?.data)
    }
};
export const getDataHistory = async (symbolId:string, setHistory:(data:IHistory[]) => void) => {
    try {
        const {data} = await axios.get<IHistory[]>(`https://rest.coinapi.io/v1/ohlcv/${symbolId}/latest?period_id=5SEC`, settings)
        setHistory(data)
    } catch (e) {
        const err = e as AxiosError
        console.log(err.response?.data)
    }
};
export const getExchangeRate = (symbolId:string, setData:(data:IMarketData)=> void ) => {
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
            setData(JSON.parse(e.data))
        } catch (err) {
            console.log(err);
        }
    };
};