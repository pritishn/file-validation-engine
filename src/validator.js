var dataToBeVerified = "",
  errorLog = "";

function readFileAsString() {
  var files = this.files;
  if (files.length === 0) {
    console.log("No file is selected");
    return;
  }
  var reader = new FileReader();
  reader.onload = function (event) {
    dataToBeVerified = Papa.parse(event.target.result.toString(), {
      header: true,
      skipEmptyLines: true,
    }).data;
  };
  reader.readAsText(files[0], "UTF-8");
}
async function matchWithTemplate() {
  var row = 0,
    selectedTemplate = templates[select_field.selectedIndex];

  for (let data of dataToBeVerified) {
    row = row + 1;
    for (let template_field of selectedTemplate.params) {
      var key = template_field["fieldName"];
      if (!key in data) {
        errorLog += "Key: " + key + " not found in row:" + row + "\n";
      }
      if (verifyRegex(data[key], template_field["fieldRegex"]) == false) {
        errorLog += "Regex failed for row : " + row + "\n";
      }
      await verifyDB(data, template_field["fieldDB"]).then((res) => {
        if (res == false) {
          errorLog +=
            "Database Validation Check Failed For Row : " + row + "\n";
          errorLog += "Query used : " + template_field["fieldDB"] + "\n";
        }
      });
    }
  }
  console.log(errorLog);
  if (errorLog == "") {
    alert("Verification Successful!");
  } else {
    alert("File Has Error!!");
    document.getElementById("error-field").innerHTML = errorLog;
  }
}

function verifyRegex(dataValue, pattern) {
  var pat = new RegExp(pattern);
  return pat.test(dataValue);
}

async function verifyDB(data, Query) {
  var validationCollection = Query.split(":")[0];
  var dbQuery = db.collection(validationCollection);
  var subqueries = Query.split(":")[1].split("&&");
  var success = true;

  subqueries.forEach((subquery) => {
    var condition = subquery.split(",");
    console.log("querying:" + condition[0], condition[1], data[condition[2]]);
    dbQuery = dbQuery.where(condition[0], condition[1], data[condition[2]]);
  });

  await dbQuery
    .get()
    .then((res) => {
      if (res.empty) {
        success = false;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return success;
}

validate_button.addEventListener("click", (e) => {
  e.preventDefault();
  if (firebase.auth().currentUser == null) {
    alert("You Need To Login To Verify!");
  } else {
    if (file_upload_field.files.length == 0) {
      alert("Input File!!!");
    } else {
      matchWithTemplate();
    }
  }
});
