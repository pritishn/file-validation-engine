import { putHistory } from "./firebase/firebase-intercations";

const AWS = require("aws-sdk");
const fs = require("fs");
const ID = "";
const SECRET = "";

// The name of the bucket that you have created
const BUCKET_NAME = "";

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
});

export const uploadFileAWS =(file,temp) => {
  const filename = file.name;
  var r = new FileReader();
  
  r.onload = (function (file) {
    return function (e) {
      var contents = e.target.result;
      const params = {
        Bucket: BUCKET_NAME,
        Key: filename, 
        Body: contents
      };
      
      s3.upload(params, function (err, data) {
        if (err) {
          alert("File Upload Failed");
          let d=new Date();
          putHistory({
            date: d.getDate()+","+d.getMonth()+","+d.getFullYear(),
            file: filename,
            template: temp,
            status: "Failed",
            fileStoreLink:"",
          });
          console.log(err);
        } else {
          console.log(`File uploaded successfully. ${data.Location}`);

          alert("File Uploaded Successfully");
          let d=new Date();
          putHistory({
            date: d.getDate()+","+d.getMonth()+","+d.getFullYear(),
            file: filename,
            template: temp,
            status: "Successful",
            fileStoreLink:data.Location
          });
        }
      });
    };
  })(file);
  r.readAsText(file);
};
