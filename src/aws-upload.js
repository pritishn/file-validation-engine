const AWS = require('aws-sdk');
const fs = require('fs');

const ID = 'AKIAWZBXEMJZ2HZK6OUT';
const SECRET = '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';

// The name of the bucket that you have created
const BUCKET_NAME = 'sudocoders';

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

const uploadFileAWS = (fileName) => {
    // Read content from the file
    const fileContent = fs.readFileSync(fileName);
   // console.log(fileContent);
    // Setting up S3 upload parameters
    const params = {
        Bucket: BUCKET_NAME,
        Key: 'test.csv', // File name you want to save as in S3
        Body: fileContent
    };

    // // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};

uploadFileAWS('src/test.csv');


// AWS.config.update(
//     {
//       accessKeyId: ".. your key ..",
//       secretAccessKey: ".. your secret key ..",
//     }
//   );
//   var s3 = new AWS.S3();
//   s3.getObject(
//     { Bucket: "my-bucket", Key: "my-picture.jpg" },
//     function (error, data) {
//       if (error != null) {
//         alert("Failed to retrieve an object: " + error);
//       } else {
//         alert("Loaded " + data.ContentLength + " bytes");
//         // do something with data.Body
//       }
//     }
//   );