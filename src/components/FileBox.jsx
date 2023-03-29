import React from "react";
import Octicon from "react-octicon";


export const FileBox = (filelist) => {
  const files = filelist.filelist;
  return (
    <div className="fileBox">
    <ul style={{ listStyleType: "none"}}>
        {Object.values(files).map((file, index) => {
          return (
            <li key={index} style={{ float: "left" , marginLeft: "35px"}}>
              <Octicon  name="file" fill="#0000FF"  style={{marginRight: "5px" , marginLeft: "5px"}}/>
     
              <a href={file.raw_url} target="_blank" rel="noreferrer">
                {file.filename}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
