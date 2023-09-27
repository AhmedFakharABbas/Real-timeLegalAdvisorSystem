//importing NPM packages.
const natural=require('natural');
const express=require('express');
const bodyParser=require('body-parser');
const sql= require('mysql');
const xlsx=require('xlsx');


//creating sql connection
let connection=sql.createConnection({
  user:'root',
    password:'',
    database:'knowledgebase',
    server:'localhost'
});

connection.connect((err)=>{
  if(err) throw err;
  else console.log('db is connected.....');
});

//starting server
let app=express();
let PORT=process.env.PORT||8000;
app.use(express.static(__dirname));


app.use(bodyParser.json());
// app.use(express.urlencoded(extended =false))
app.listen(PORT,function(){
    console.log('server is listning at port '+PORT+'....');
});

//creating new classifer object by constructor
const classifier=new natural.BayesClassifier();


//Adding Traing data from xlsx file 
const wb=xlsx.readFile("TrainingData.xlsx");
const WS=wb.Sheets["Sheet1"];
const data =xlsx.utils.sheet_to_json(WS);


data.forEach(item=>{                       
    classifier.addDocument(item.text, item.category)
});

//train classifer on data set
var maxIterations = 100000000;
var minImprovement = 0.9;
classifier.train(maxIterations,minImprovement);


//handling incoming request
app.get('/search',function(req,res){
    res.send("sucess")
})
app.post('/search',function(req,res){
let query =req.body.query;

//removing stop words from the user string
  
  stopwords = ['i','me','my','myself','we','our','ours','ourselves','you','your','yours',
  'yourself','yourselves','he','him','his','himself','she','her','hers','herself','it',
  'its','itself','they','them','their','theirs','themselves','what','which','who','whom',
  'this','that','these','those','am','is','are','was','were','be','been','being','have',
  'has','had','having','do','does','did','doing','a','an','the','and','but','if','or',
  'because','as','until','while','of','at','by','for','with','about','against','between',
  'into','through','during','before','after','above','below','to','from','up','down','in',
  'out','on','off','over','under','again','further','then','once','here','there','when',
  'where','why','how','all','any','both','each','few','more','most','other','some','such',
  'no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just',
  'don','should','now','what','punishment',  'if','someone','do','need','legal','advice','related'];

  function remove_stopwords(str) {
    newstring = []
    words = str.split(' ')
    for(i=0;i<words.length;i++) {
       word_clean = words[i].split(".").join("")
       if(!stopwords.includes(word_clean)) {
        newstring.push(word_clean)
       }
    }
    return(newstring.join(' '))
};
const newquery=(remove_stopwords(query));  
console.log(newquery);


//get classification result
let result=classifier.classify(newquery);
let value=classifier.getClassifications(newquery);



//diffrent response on the base of classification result

if (result=='Murder'){
    connection.query('SELECT * FROM `knowledge` WHERE id BETWEEN 1 AND 9;',(err,rows,fields)=>{
      
       
       let legresults=rows;
       
       legresults.unshift(value);

       if(!err)res.send({legresults:legresults});
       else
       console.log('no thing found');
    })

}
if(result=='Kidnap'){
  
    connection.query('SELECT * FROM `knowledge` WHERE id BETWEEN 10 AND 19;',(err,rows,fields)=>{
        let legresults=rows;
        legresults.unshift(value);
        if(!err)res.send({legresults:legresults});
        else
        console.log('no thing found');
    })
   
}
if(result=='Hurt'){
    connection.query('SELECT * FROM `knowledge` WHERE id BETWEEN 20 AND 25;',(err,rows,fields)=>{
        let legresults=rows
        legresults.unshift(value);
        if(!err)res.send({legresults:legresults});
        else
        console.log('no thing found');
    })
    
}
if(result=='Cyber Crime'){
    connection.query('SELECT * FROM `knowledge` WHERE id BETWEEN 27 AND 34;',(err,rows,fields)=>{
        let legresults=rows
        legresults.unshift(value);
        if(!err)res.send({legresults:legresults});
        else
        console.log('no thing found');
    })
    
}
if(result=='Offences Relating Religion'){
    connection.query('SELECT * FROM `knowledge` WHERE id BETWEEN 35 AND 40;',(err,rows,fields)=>{
        let legresults=rows
        legresults.unshift(value);
        if(!err)res.send({legresults:legresults});
        else
        console.log('no thing found');
    })
    
}
});
