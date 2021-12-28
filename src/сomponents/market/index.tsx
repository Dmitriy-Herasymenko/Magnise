import axios from "axios";
import './style.scss'
import {useEffect, useState} from "react";
import {IExchange} from "../../Types";
import {Subscribe} from "../subscribe";

export const Market = () => {
    const [selectData, setSelect] = useState<IExchange[]>([]);

    const handleCghange = (e: any) => console.log(e);
    const handleSubmit = (e: any) => console.log(e);

    const getExchanges: any = () => {
        axios.get<IExchange[]>('https://rest.coinapi.io/v1/exchanges', {
            headers: {
                'X-CoinAPI-Key': '7BA00E1A-1CEF-4AEC-BA1E-26E8443262FC'
            }
        })
            .then(resp => setSelect(resp.data))
            .catch(error => console.log(error))
    };

    useEffect(() => {
        getExchanges()
    }, [])

    return (
        <div className='market'>
          <Subscribe selectData={selectData} />
        </div>
    )
}