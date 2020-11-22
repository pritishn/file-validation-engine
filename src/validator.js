import {db} from "./firebase/firebase-intercations";

export const validateRow = async (rowNum, data, fileError, template) => {
  //data is row
  
  let default_message = "At row:" + rowNum + "\n";

  if (fileError.length) {
    return (
      default_message +
      "Error Type:" +
      fileError.type +
      "\n Error message:" +
      fileError.message +
      "\n"
    );
  }
  if (data.__parsed_extra) {
    return default_message + " Extra Information Is Parsed\n";
  }

  let fields = template.fields;
  let binary_expression = template.groupRelations;
  let group = {};
  for (const field of fields) {
    group[field.group] = true;
  }

  for (const field of fields) {
    if (!field.header in data) {
      return default_message + " Header Missing : " + field + "\n";
    }
    if (field.required == true && data[field.headerName] == "") {
      return (
        default_message + " Required field " + field.headerName + "is missing\n"
      );
    }
    if (field.required == false && data[field.headerName] == "") {
      group[field.group] = false;
    }
    if(field.dataType=='Number' && isNaN(data[field.headerName])){
      return (
        default_message+ field.headerName + "is not a Number\n"
      );
    }
    if(field.dataType=='Alpha-Numeric' && verifyRegex(data[field.headerName],'^[a-zA-Z0-9]+$')){
      return (
        default_message+ field.headerName + "is not a Alpha Numeric\n"
      );
    }
    if(field.dataType=='Date' && verifyDate(data[field.headerName],data[field.dateType])){
      return (
        default_message+ field.headerName + " is not a valid Date for format in template!\n"
      );
    }
    
    if (field.regex != "" && verifyRegex(data[field.headerName], field.regex)) {
      return default_message + " Regex matching failed\n";
    }
    if (field.collection != "") {
      let resp = "";
      if (field.databaseQuery == "") {
        resp = await verifyDB(
          field.collection,
          data,
          field.headerName + ",==," + field.headerName
        );
        if (!resp) {
          return (
            default_message +
            " Database Query Failed : " +
            " Collection:" +
            field.collection +
            ", Query:" +
            field.headerName +
            ",==," +
            field.headerName +
            "\n"
          );
        }
      } else {
        resp = await verifyDB(field.collection, data, field.databaseQuery);
        if (!resp) {
          return (
            default_message +
            " Database Query Failed : " +
            " Collection:" +
            field.collection +
            ", Query:" +
            field.databaseQuery +
            "\n"
          );
        }
      }
    }
    group[field.group] = group[field.group] & true;
  }

  if ((await booleanExpressionParser(group, binary_expression)) == false) {
    console.log("binary fail");
    return default_message + " Binary Expression Failed!\n";
  }
};

export const validateRow_N = async (rowNum, data, fileError, template) => {
  //data is row
  let default_message = "At row:" + rowNum + "\n";
  if (fileError) {
    return (
      default_message +
      "Error Type:" +
      fileError.type +
      "\n Error message:" +
      fileError.message +
      "\n"
    );
  }
  if (data.__parsed_extra) {
    return default_message + " Extra Information Is Parsed\n";
  }

  let fields = template.fields;
  let rule =  "col3 = row1 + row2"; 


 
};


async function verifyDate(data,format){
  if(format=="MM/DD/YYYY"){

  }else if(format=="DD/MM/YYYY"){

  }else if(format=="YYYY/MM/DD"){
    
  }
 return true;
}
async function booleanExpressionParser(group, binary_expression) {
  if(binary_expression=='')return true;
  let postfix = await getPostFixForm(binary_expression);
  return await evaluatePostFix(group, postfix);
}
async function evaluatePostFix(group, postfix) {
 
  let stack = [];
  for (let c of postfix) {

    if ((c >= "a" && c <= "z") || (c >= "A" && c <= "Z")) {
      //console.log("putting value of "+c+" "+group[c]);
      stack.push(group[c]);
    } else {
      let val1,val2;
      switch (c) {
        case "!":
          val1 = !stack.pop();
          stack.push(val1);
          break;

        case "&":
          val1 = stack.pop();
          val2 = stack.pop();
          stack.push(val1 & val2);
          break;

        case "|":
          val1 = stack.pop();
          val2 = stack.pop();
          stack.push(val1 | val2);
          break;

        default:
          alert("Unidentified character in expression!" + c);
      }
    }
  }
  // console.log(stack[0]);
  return stack.pop();
}
async function getPostFixForm(expression) {
  console.log("exp=",expression);
  let postfix = "";
  let stack = [];
  let precedence = { "!": 3, "&": 2, "|": 1 };
  for (let c of expression) {
    if ((c >= "a" && c <= "z") || (c >= "A" && c <= "Z")) {
      postfix += c;
    } else if (c == "(") {
      stack.push("(");
    } else if (c == ")") {
      while (stack.length > 0 && stack[stack.length - 1] != "(") {
        postfix += stack.pop();
      }
      if (stack.length > 0 && stack[stack.length - 1] == "(") {
        stack.pop();
      }
    } else {
      while (
        stack.length > 0 &&
        precedence[c] <= precedence[stack[stack.length - 1]]
      ) {
        postfix += stack.pop();
      }
      stack.push(c);
    }
  }
  while (stack.length > 0) postfix += stack.pop();

  return postfix;
}

//write a date parser
function verifyRegex(dataValue, pattern) {
  let pat = new RegExp(pattern);
  return pat.test(dataValue);
}

async function verifyDB(collection, data, Query) {
  let dbQuery = db.collection(collection);
  let subqueries = Query.split("&&");
  let success = true;
  console.log(subqueries);
  subqueries.forEach((subquery) => {
    let condition = subquery.split(",");
    console.log(condition[0], condition[1], data[condition[2]]);
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
