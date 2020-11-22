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
    return default_message + " Binary Expression Failed!\n";
  }
};



async function verifyDate(data,format){
  if(data.length!=10)return false;

  if(format=="MM/DD/YYYY"){
    return await verifyRegex(data,'/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/');
  }else if(format=="DD/MM/YYYY"){
    return await verifyRegex(data,'/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/');
  }else if(format=="YYYY/MM/DD"){
    return await verifyRegex(data,'/^([0-9]{4})\/([0-9]{2})\/([0-9]{2})$/');
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


////////////////////////////////////////////////////////////////


export const validateRow_N = async (rowNum, data, fileError, template) => {
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

  if(!await evaluateExpression(data,template.rule)){
    return default_message + " Numeric Rule Not Followed\n";
  }
};


async function evaluateExpression(row,expression) {
  
  let x=expression.split('=');
  let exp=x[0],val=x[1];
  console.log(x);
  let lhs,rhs=Number(row[val]);

  let postfix = [];
  let stack = [];
  let precedence = { "*": 3, "+": 1, "-": 1 };

  for (let i=0;i<exp.length; i++) {

    if (exp[i]!='+'&&exp[i]!='-'&&exp[i]!='*') {
      let v="";
      while(i<exp.length && (exp[i]!='+'&&exp[i]!='-'&&exp[i]!='*'))
      {
        v+=exp[i];
        i++;
      }
      i--;
      postfix.push({type:"data",val:v});

    } else if (exp[i] == "(") {
      stack.push("(");
    } else if (exp[i] == ")") {
      while (stack.length > 0 && stack[stack.length - 1] != "(") {
        postfix.push({type:"op",val:stack.pop()})
      }
      if (stack.length > 0 && stack[stack.length - 1] == "(") {
        stack.pop();
      }

    } else {
      
      while (stack.length > 0 && precedence[exp[i]] <= precedence[stack[stack.length - 1]]) {
        postfix.push({type:"op",val:stack.pop()})
      }
      stack.push(exp[i]);
    }
  }
  while (stack.length > 0) 
  {postfix.push({type:"op",val:stack.pop()});}

  console.log("Postfix",postfix);
  stack = [];
  for (let c of postfix) {
    // console.log(stack);
    if (c.type=='data') {
      //console.log("putting value of "+c+" "+group[c]);
      stack.push(Number(row[c.val]));
    } else {
      let val1,val2;
      switch (c.val) {
        case "*":
          val2 = stack.pop();
          val1 = stack.pop();
          stack.push(val1*val2);
          break;

        case "+":
          val2 = stack.pop();
          val1 = stack.pop();
          stack.push(val1 + val2);
          break;

        case "-":
          val2 = stack.pop();
          val1 = stack.pop();
          stack.push(val1 - val2);
          break;

        default:
          alert("Unidentified character in expression!" + c);
      }
    }
  }
  lhs=stack.pop();
  console.log(lhs,rhs);
  if(lhs===rhs){
  
    return true;
  }else{
   
    return false;
  }
}