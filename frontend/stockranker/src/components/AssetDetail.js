import React, { useMemo, useEffect, useState } from "react";
import { useTable, useSortBy, useFilters, useGlobalFilter } from "react-table";
import { createRoot } from "react-dom/client";
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

const AssetDetail = ({ stock }) => {
  return (
    <div className="centeringdiv">
      <div className="assetdetailcontainer">
        <Typography variant="h3">Stock Detail</Typography>
      </div>
      <div className="assetcard">
        <div className="assetcardtitle">
          <div className="assetcardtitledivimage">
            <img className="assetcardtitleimage" src={`${stock.logo}`} />
          </div>
          <div className="assetcardtitlediv">
            <div className="assetcardtitleinfo">{`${stock.name}`}</div>
            <div className="assetcardsubtitleinfo">{`${stock.ipo}`}</div>
          </div>
          <div className="assetcardtitleicons">
            <img className="icons iconfb" alt="Facebook" />
            <img className="icons icontwitter" alt="Twitter" />
            <img className="icons iconig" alt="Instagram" />
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
            <li className="assetcarddivlistli">{`${stock.name}`}</li>
          </ul>
          <ul className="assetcarddivlistul">
            <li className="assetcarddivlistli">Industry</li>
            <li className="assetcarddivlistli">{`${stock.finnhubIndustry}`}</li>
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
    </div>
  );
};

export default AssetDetail;
