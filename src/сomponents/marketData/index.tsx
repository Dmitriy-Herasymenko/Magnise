import {FC} from "react";
import {IMarketData} from "../../Types";
import "./style.scss"

interface IProps {
    data: IMarketData;
}

export const MarketData: FC<IProps> = ({data}) => {
        const date = new Date(data.time_exchange).toLocaleDateString()
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
                            <p>{date}</p>
                        </span>
                    </div>
                )
}