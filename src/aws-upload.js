const AWS = require("aws-sdk");
const fs = require("fs");

const ID = "AKIAWZBXEMJZ2HZK6OUT";
const SECRET = "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";

// The name of the bucket that you have created
const BUCKET_NAME = "sudocoders";

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
});

export const uploadFileAWS = (file) => {
  const filename = file.name;
 
  var r = new FileReader();
  r.onload = (function (file) {
    return function (e) {
      var contents = e.target.result;
        const params= {
            Bucket: BUCKET_NAME,
            Key: filename+".csv", // File name you want to save as in S3
            Body: contents
          };

      console.log(contents);
      s3.upload(params, function (err, data) {
        if (err) {
            alert("fail");
          console.log(err);
        }else{
            alert("success");
        console.log(`File uploaded successfully. ${data.Location}`);
        }
      });
    };
  })(file);
  r.readAsText(file);
};


