import React, { useMemo, useEffect, useState } from "react";
import { useTable, useSortBy, useFilters, useGlobalFilter } from "react-table";
import { createRoot } from 'react-dom/client';
import {
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
//import SearchTableHeader from "./SearchTableHeader.js";
import axios from "axios";

const StockTable = ({ stocks }) => {
  const [myState, setState] = useState(stocks)
  const initialState = React.useMemo(() => stocks.initialState);

  useEffect(() => {}, [stocks])
  const [loading, setLoading] = useState(false);

  const columns = useMemo(
    () => [
      {
        Header: "",
        accessor: "logo",
        Cell: ({ value }) => (
          <img src={value} alt="Logo" width={50} height={50} />
        ),
      },
      {
        Header: "Price",
        accessor: "price",
        sortType: 'basic',
        Cell: ({ value }) => <span>{`$${value.toFixed(2)}`}</span>,
      },
      {
        Header: "Ticker",
        accessor: "ticker",
        sortType: 'basic',
      },
      {
        Header: "Name",
        accessor: "name",
        sortType: 'basic',
      },
      {
        Header: "Industry",
        accessor: "finnhubIndustry",
      },
      {
        Header: "Likes",
        accessor: "likes",
        sortType: "basic",
      },
      {
        Header: "Dislikes",
        accessor: "dislikes",
        sortType: "basic",
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <span>
            <IconButton
              onClick={() => handleLike(row.original._id, row)}
              aria-label="Like"
            >
              <ThumbUpIcon />
            </IconButton>

            <IconButton
              onClick={() => handleDislike(row.original._id)}
              aria-label="Dislike"
            >
              <ThumbDownIcon />
            </IconButton>
          </span>
        ),
      },
    ],
    [loading]
  );

const {
  getTableProps,
  getTableBodyProps,
  headerGroups,
  rows,
  prepareRow,
  state,
  setGlobalFilter
} = useTable(
  {
    columns,
    data: stocks,
    initialState: {
      globalFilter: ""
    }
  },
  useFilters,
  useGlobalFilter,
  useSortBy
);

const { globalFilter } = state;
//  console.log(rows);

  if(stocks!= null) console.log(stocks);
  const handleLike = async (stock_id, row) => {
    await axios
      .get(`http://localhost:8000/stocks/${stock_id}/like?action=like`, {
        withCredentials: true,
      })
      .then(
//        (response) => console.log(response.data)
      )
      .then(
        displayLikeOrDislike(stock_id, row, "like")
      )
      .catch((err) => console.log(err));
  };

//  const domNode = document.getElementById('root');
//  const root = createRoot(domNode);

  const displayLikeOrDislike = async (stock_id, row, action) => {
    console.log(row)
    if (action === "like") {
//      let stockToChange = stocks.filter(stocks => stocks._id.includes(stock_id))
//      stockToChange = stockToChange.likes+1
//      console.log(stockToChange[0][action])
//      console.log(stockToChange[0]['likes'])
//      (action === "like") ?
//        stockToChange[0]['likes'] = stockToChange[0]['likes'] + 1
//      :
//         stockToChange[0]['dislike'] = stockToChange[0]['dislike'] + 1;
//      console.log(stockToChange[0]['likes'])
//      stockToChange[0]['likes'] = stockToChange[0]['likes'] + 1
//      console.log(stockToChange)
//      console.log(stockToChange[0]['likes'])
      const newStocks = stocks?.map(stock => {
        if (stock._id === stock_id) {
          stock.likes += 1
          return stock;
        } else { // No change
          return stock;
        }
      });
//      await setState(newStocks);
//      root.render(<StockTable stocks={newStocks} />);
      console.log(stocks);
    } else {
      console.log(stocks.filter(stocks => stocks._id.includes(stock_id)))
    }

//    console.log(stocks.filter(stocks => stocks._id.includes(stock_id)))
  };
  const handleDislike = async (stock_id) => {
    await axios
      .get(`http://localhost:8000/stocks/${stock_id}/dislike?action=dislike`, {
        withCredentials: true,
      })
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {/*<SearchTableHeader value={{searchTable, searchInput}}/>*/}
      <div style={{width: "100%", display: "flex", flexFlow: "row", justifyContent: "flex-end", marginBottom: "30px"}}>
        <div style={{marginRight: "10px"}}>
          <input type="text" onChange={e => setGlobalFilter(e.target.value)} value={globalFilter} name="searchInput" placeholder="asset, name, currency"
            style={{fontSize: "16px", color: "#000", width: "300px", height: "35px", display: "block", borderRadius: "5px", paddingLeft: "5px"}} />
        </div>
        <button style={{
          fontSize: "15px",
          color: "#fff",
          width: "87px",
          height: "35px",
          display: "block",
          cursor: "pointer",
          borderRadius: "5px",
          backgroundColor: "#222",
          outline: "var(--colorSearchInput)",
          marginRight: "50px",
        }}>Search</button>
      </div>
      <Table {...getTableProps()} style={{ border: "solid 1px black" }}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    borderBottom: "solid 3px black",
                    background: "aliceblue",
                    color: "black",
                    fontWeight: "bold",
                    cursor: "pointer"
                  }}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                  </span>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell, indexc) => {
                  return (
                    <TableCell
                      {...cell.getCellProps()}
                      style={{
                      padding: "20px",
                        border: "solid 1px gray",
                        background: (index%2==0) ? "#FFFFFF" : "#f2f2f2",
                        color: (indexc===2) ? "#4472de" : "#000000",
                      }}
                    >
                      {cell.render("Cell")}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default StockTable;
