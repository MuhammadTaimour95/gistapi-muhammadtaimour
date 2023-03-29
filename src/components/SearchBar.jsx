import React, { useState } from "react";
import { Input, Alert, Spin } from "antd";
import { getAllGistUrl } from "./config";
import { SearchResults } from "./SearchResults";
import Octicon from "react-octicon";
import GithubOutlined from "@ant-design/icons";


const { Search } = Input;

export const SearchBar = () => {
  const [username, setUsername] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onSearch = async (username) => {
    const usersname = username.trim()
    setUsername(usersname);
    setLoading(true);
    if (usersname && usersname !== "") {
      try {
        const URL = getAllGistUrl(usersname);
        const res = await fetch(URL);
        const data = await res.json();
        setData(data);
        console.log(data);
        setLoading(false);
        setError(false);
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    } else if (usersname === "") {
      setLoading(false);
      setError(true);
    }
    setLoading(false);
  };


  return (
    <>
    
    <div style={{padding : "8px", backgroundColor: "#000000" , fontSize: "14px", lineHeight : "1.5" , borderRadius: "0px", margin: "0 0"}}>
     <div style={{borderRadius : "4px", width: "400px" , display: "flex"}}>
     
     <Octicon name="mark-github" mega  style={{marginRight: "15px" , marginLeft: "15px"}}/>
      
      <Search
        placeholder="Search Gists for the username"
        allowClear
        size="large"
        onSearch={onSearch}
      />
       </div>
       </div>
      {loading ? <Spin tip="Loading..." style={{ margin: 10 }} /> : null}

      {username !== "" && data && !error ? (
        <SearchResults data={data} username={username} style={{}}/>
      ) : null}

      {username && data.length === 0 ? (
        <Alert
          message="Error"
          description="No data for this User"
          type="error"
          showIcon
          style={{ marginTop: 10 }}
        />
      ) : null}

      {username ==='' ? (
        <Alert
          message="Error"
          description="Please Enter Valid UserName"
          type="error"
          showIcon
          style={{ marginTop: 10 }}
        />
      ) : null}
     
    </>
  );
};
