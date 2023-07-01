import React from "react";

function SearchTableHeader({searchTable, searchInput}) {
  
  return (
    <div style={{width: "100%", display: "flex", flexFlow: "row", justifyContent: "flex-end", marginBottom: "30px"}}>
      <div style={{marginRight: "10px"}}>
        <input type="text" onChange={searchTable} value={searchInput} name="searchInput" placeholder="asset, name, currency"
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
  );
}

export default SearchTableHeader;
