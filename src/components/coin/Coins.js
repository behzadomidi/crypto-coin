import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Coins.css";
import Coin from "../../routes/Coin";
import CoinItem from "./CoinItem";

const Coins = (props) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  return (
    <>
      <div className="container">
        <div>
          <form action="" className="form">
            <input
              type="search"
              required
              onChange={(e) => setSearch(e.target.value)}
            />
            <i className="fa fa-search"></i>
          </form>
          <div className="select">
            <select onChange={(e) => setSort(e.target.value)}>
              <option value="Market Cap Rank">Market Cap Rank</option>
              <option value="Highest">Highest</option>
              <option value="Lowest">Lowest</option>
            </select>
          </div>
        </div>
        <div>
          <div className="heading">
            <p>#</p>
            <p className="coin-name">Coin</p>
            <p>Price</p>
            <p>24h</p>
            <p className="hide-mobile">Volume</p>
            <p className="hide-mobile">Mkt Cap</p>
          </div>

          {props.coins
            .filter(
              (item) =>
                item.symbol.toLowerCase().includes(search.toLowerCase()) ||
                item.name.toLowerCase().includes(search.toLowerCase())
            )
            .sort((x, y) => {
              switch (sort) {
                case "Market Cap Rank":
                  return y.market_cap - x.market_cap;
                case "Highest":
                  return y.current_price - x.current_price;
                case "Lowest":
                  return x.current_price - y.current_price;
                default:
                  return y.market_cap - x.market_cap;
              }
            })
            .map((coins) => {
              return (
                <Link
                  to={`/coin/${coins.id}`}
                  element={<Coin />}
                  key={coins.id}
                >
                  <CoinItem coins={coins} />
                </Link>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Coins;
