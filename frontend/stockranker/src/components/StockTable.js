import React, { useMemo, useState } from "react";
import { useTable, useSortBy } from "react-table";
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
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import axios from "axios";

const StockTable = ({ stocks }) => {
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
        Cell: ({ value }) => <span>{`$${value.toFixed(2)}`}</span>,
      },
      {
        Header: "Ticker",
        accessor: "ticker",
      },
      {
        Header: "Name",
        accessor: "name",
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: stocks }, useSortBy);

  const handleLike = async (stock_id) => {
    await axios
      .get(`http://localhost:8000/stocks/${stock_id}/like?action=like`, {
        withCredentials: true,
      })
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
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
    <Table {...getTableProps()} style={{ border: "solid 1px black" }}>
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableCell
                {...column.getHeaderProps()}
                style={{
                  borderBottom: "solid 3px black",
                  background: "aliceblue",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                <Typography variant="body1">
                  {column.render("Header")}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <TableCell
                    {...cell.getCellProps()}
                    style={{
                      padding: "20px",
                      border: "solid 1px gray",
                      background: "white",
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
  );
};

export default StockTable;
