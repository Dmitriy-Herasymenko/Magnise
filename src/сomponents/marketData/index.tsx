import {FC} from 'react';
import {IMarketData} from '../../Types';
import './style.scss'

interface IProps {
    data: IMarketData;
}

export const MarketData: FC<IProps> = ({data}) => {
            if(Object.keys(data).length === 0) return <div className='market-data'><h3 className='subscribe'>No Subscribe</h3></div>
                return (
                    <div className='market-data'>
                        <div>
                            <h3>Symbol</h3>
                            <p>{data.symbol_id}</p>
                        </div>
                         <span>
                              <h3>Price</h3>
                             <p>{data.price}</p>
                         </span>
                        <span>
                            <h3>Time Exchange</h3>
                            <p>{new Date(data.time_exchange).toLocaleDateString()}</p>
                        </span>
                    </div>
                )
}