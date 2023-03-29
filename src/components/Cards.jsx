import React, { useState } from "react";
import { getSingleGistUrl } from "./config";
import { Card, Button, Tag, Divider } from "antd";
import { FileBox } from "./FileBox";
import { Forks } from "./Forks";
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import Octicon from "react-octicon";



export const Cards = (gistData) => {
  const unidata = gistData.gistData;
  const files = unidata.files;
  const fileArr = [];
  for (let file in files) {
    let language = files[file].language;
    //remove duplicate file types
    if (fileArr.indexOf(language) === -1) {
      fileArr.push(language);
    }
  }

  const noOfFiles = Object.keys(files).length;

  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const moreOpen = async (value) => {
    if (value !== "") {
      try {
        const URL = getSingleGistUrl(value);
        const res = await fetch(URL);
        const data = await res.json();
        setData(data);
        setShow(true);
      } catch (e) {
        console.log(e);
        setShow(false);
      }
    }
  };
  return (
    <div className="site-card-wrapper">
      <Card
        title= {unidata.owner.login || "No Description"}
        bordered={false}
        extra={
          <>
         
          <Octicon name="code"   style={{marginRight: "5px" , marginLeft: "15px" , fill: "#0000FF"}}/>
          <span className="numberFiles">
          {noOfFiles} {noOfFiles > 1 ? "Files" : "File"}
          </span>
          <span onClick={() => moreOpen(`/${unidata.id}`)} style={{fontColor: "#0000FF"}}> 
          <Octicon name="git-branch"   style={{marginRight: "5px" , marginLeft: "15px"}}  />
          <span className="" style={{fontColor: "#0000FF"}}>
            Forks
          </span>
          </span>

          <Octicon name="comment"   style={{marginRight: "5px" , marginLeft: "15px"}}/>
          <span className="">
            Comments
          </span>
          <Octicon name="star"   style={{marginRight: "5px" , marginLeft: "15px"}}/>
          <span className="">
            Stars
          </span>
           </>
        }
      >
        <span style={{ fontSize: "10px" , fontFamily:"Helvetica"}}>Created At : {unidata.created_at}</span>
        <span style={{ fontSize: "10px" , marginLeft: " 10px" , fontFamily:"Helvetica"}}>Updated At : {unidata.updated_at}</span>
        
        <p>{unidata.description || "No Description"}</p>
        

        <FileBox filelist={files} />

        <br/>
        {show && data !== [] ? <Forks forks={data} /> : null}
      </Card>
      <Divider dashed/>
    </div>
  );
};
