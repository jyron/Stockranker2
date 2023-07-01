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

const StockTable = ({stocks, onUpdateStock}) => {
  const [isEditing, setIsEditing] = useState(false)
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
              onClick={() => handleLike(row.original._id)}
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

  const handleLike = async (stock_id) => {
    await axios
      .get(`http://localhost:8000/stocks/${stock_id}/like?action=like`, {
        withCredentials: true,
      })
      .then(
        (response) => {
          console.log(response.data)
          displayLikeOrDislike(stock_id, "like")
        }
      )
      .catch((err) => console.log(err));
  };

  const handleDislike = async (stock_id) => {
    await axios
      .get(`http://localhost:8000/stocks/${stock_id}/dislike?action=dislike`, {
        withCredentials: true,
      })
      .then(
        (response) => {
          console.log(response.data)
          displayLikeOrDislike(stock_id, "dislike")
        }
      )
      .catch((err) => console.log(err));
  };

  function handleStockUpdate(updatedStock) {
    setIsEditing(false);
    onUpdateStock(updatedStock);
  }

  const displayLikeOrDislike = async (stock_id, action) => {
    if (action === "like") {
      const updatedStock = stocks?.map(stock => {
        if (stock._id === stock_id) {
          stock.likes += 1
          return stock;
        } else { // No change
          return stock;
        }
      });
      handleStockUpdate(updatedStock)
      console.log(stocks);
    } else {
      const updatedStock = stocks?.map(stock => {
        if (stock._id === stock_id) {
          stock.dislikes += 1
          return stock;
        } else { // No change
          return stock;
        }
      });
      handleStockUpdate(updatedStock)
      console.log(stocks);
    }
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
