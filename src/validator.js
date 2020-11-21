export const validateRow=async (rowNum,data,fileError,template)=>{
    //data is row
    var default_message="At row:"+rowNum+"\n";
    if(fileError) {
      return default_message+"Error Type:"+fileError.type+"\n Error message:"+fileError.message+"\n";
    } 
    if(data.__parsed_extra){
      return default_message+" Extra Information Is Parsed\n";
    }

    var fields = template.fields;
    var binary_expression = template.binary_expression;
    var group={};

    for(const field of fields){
      if(!field.header in data){
        return default_message+" Header Missing : "+field+"\n";
      }
      if(field.required == true && data[field.header] == ''){
        return default_message+" Required field "+field.header+"is missing\n";
      }
      if(field.required == false && data[field.header] == ''){
        group[field.group]=true;
      }
      if(field.regex!='' && verifyRegex(data[field.header],field.regex)){
        return default_message+" Regex matching failed\n";
      }
      if(field.collection!=''){
        let resp="";
        if(field.databaseQuery==''){
         resp= await verifyDB(field.collection,data,field.header+",==,"+field.header);
         if(!resp){
          return default_message+" Database Query Failed : "+" Collection:"+collection+", Query:"+field.header+",==,"+field.header;
         }
        }else{
         resp= await verifyDB(field.collection,data,field.databaseQuery);
         if(!resp){
          return default_message+" Database Query Failed : "+" Collection:"+collection+", Query:"+databaseQuery;
         }
        }
      }
      group[field.group]=true;
    }
}
//write a date parser 
function verifyRegex(dataValue, pattern) {
  var pat = new RegExp(pattern);
  return pat.test(dataValue);
}

async function verifyDB(collection,data,Query) {
  var dbQuery = db.collection(collection);
  var subqueries = (Query).split('&&');
  var success = true;

  subqueries.forEach(subquery => {
      var condition = subquery.split(',');
      console.log("querying:" + condition[0], condition[1], data[condition[2]]);
      dbQuery = dbQuery.where(condition[0], condition[1], data[condition[2]]);
  });

  await dbQuery.get().then((res) => {
      if (res.empty) {
          success = false;
      }
  }).catch(err => {
      console.log(err);
  });
  return success;
}
