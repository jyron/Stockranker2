import React, { useMemo, useEffect, useState } from "react";
import { useTable, useSortBy, useFilters, useGlobalFilter } from "react-table";
import { createRoot } from 'react-dom/client';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  IconButton,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import axios from "axios";

const AssetDetail = ({stock}) => {
  
  return (
    <div className="centeringdiv">
      <div className="assetdetailcontainer">
        <Typography variant="h3">Asset Detail</Typography>
      </div>
      <div className="assetcard">
        <div className="assetcardtitle">
          <div className="assetcardtitledivimage">
            <img className="assetcardtitleimage" src={`${stock.logo}`}/>
          </div>
          <div className="assetcardtitlediv">
            <div className="assetcardtitleinfo">{`${stock.name}`}</div>
            <div className="assetcardsubtitleinfo">{`${stock.ipo}`}</div>
          </div>
          <div className="assetcardtitleicons">
            <img class="icons iconfb" alt="Facebook" />
            <img class="icons icontwitter" alt="Twitter" />
            <img class="icons iconig" alt="Instagram" />
          </div>
        </div>
        <div className="divider"></div>
        <div className="assetcarddivlist">
          <ul className="assetcarddivlistul">
            <li className="assetcarddivlistli">Price</li>
            <li className="assetcarddivlistli">${`${stock.price}`}</li>
          </ul>
          <ul className="assetcarddivlistul">
            <li className="assetcarddivlistli">Ticker</li>
            <li className="assetcarddivlistli">${`${stock.ticker}`}</li>
          </ul>
          <ul className="assetcarddivlistul">
            <li className="assetcarddivlistli">Name</li>
            <li className="assetcarddivlistli">Fortive Corp</li>
          </ul>
          <ul className="assetcarddivlistul">
            <li className="assetcarddivlistli">Industry</li>
            <li className="assetcarddivlistli">Machinery</li>
          </ul>
          <ul className="assetcarddivlistul">
            <li className="assetcarddivlistli">Likes</li>
            <li className="assetcarddivlistli">{`${stock.likes}`}</li>
          </ul>
          <ul className="assetcarddivlistul">
            <li className="assetcarddivlistli">Dislikes</li>
            <li className="assetcarddivlistli">{`${stock.dislikes}`}</li>
          </ul>
        </div>
      </div>
      <div className="assetdetailcontainer">
        <Typography variant="h5">Transactions</Typography>
        <div className="divider"></div>
      </div>
      <div className="assetcardtransactions">
        <div className="assetcardtransactionsheader">
          <div className="assetcardtransactionsheadertitle">Rank</div>
          <div className="assetcardtransactionsheadertitle">Address</div>
          <div className="assetcardtransactionsheadertitle">Quantity</div>
          <div className="assetcardtransactionsheadertitle">Percentage</div>
        </div>
        <div className="assetcardtransactionscontent">
          <div className="assetcardtransactionscontenttxt"><span className="assetcardtransactionscircle">1</span></div>
          <div className="assetcardtransactionscontenttxt">bnb18d ... 0hy0js</div>
          <div className="assetcardtransactionscontenttxt">89,999,972,094.50</div>
          <div className="assetcardtransactionscontenttxt">99.99</div>
        </div>
        <div className="assetcardtransactionscontent2">
          <div className="assetcardtransactionscontenttxt">2</div>
          <div className="assetcardtransactionscontenttxt">bnb165 ... zy9jc9</div>
          <div className="assetcardtransactionscontenttxt">4,170.55</div>
          <div className="assetcardtransactionscontenttxt">&lt;0.01%</div>
        </div>
        <div className="assetcardtransactionscontent">
          <div className="assetcardtransactionscontenttxt">3</div>
          <div className="assetcardtransactionscontenttxt">bnb1cj ... 6u849e</div>
          <div className="assetcardtransactionscontenttxt">2,751.00</div>
          <div className="assetcardtransactionscontenttxt">&lt;0.01%</div>
        </div>
        <div className="assetcardtransactionscontent2">
          <div className="assetcardtransactionscontenttxt">4</div>
          <div className="assetcardtransactionscontenttxt">bnb1a2 ... 79erd4</div>
          <div className="assetcardtransactionscontenttxt">1,343.63</div>
          <div className="assetcardtransactionscontenttxt">&lt;0.01%</div>
          </div>
      </div>
    </div>
  );
};

export default AssetDetail;
