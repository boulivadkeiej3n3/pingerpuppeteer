const Mongoose  = require("mongoose");
const Axios      = require("axios");
const randomUserAgent = require("random-useragent");
const ServersDB = Mongoose.model(`servers`, new Mongoose.Schema({url:String}));
const asyncTimeout = async(duration)=>{await new Promise((resolve)=>{setTimeout(resolve,duration)}) }
let ServersToPing = [];
/*************************************************/
async function main(){
 
   ServersToPing = await ServersDB.find({url:{$regex:/.+/}});
  ServersToPing.slice((process.argv.slice(2))[0],(process.argv.slice(2))[1])
  //Looping forever and ping all list of servers every 2 minutes:
    while(true){
        for(const ServerURL of ServersToPing)
        {
           console.log(`GOTO: ${ServerURL}`);
           try{
              await Axios.get(ServerURL.url,{headers:{"user-agent": randomUserAgent.random()}});             
           }catch(e){if(e){ console.log(`[PINGER ERROR]: ${e.message}`)}}
           await asyncTimeout(20000);
          
        }
           await asyncTimeout(30000)
    }
}


Mongoose.connect(`mongodb+srv://maximous:123MONGODB.com@m001.cmsqx.mongodb.net/?retryWrites=true&w=majority`).then((connection)=>{
connection ? console.log(`Database Connected!`): console.log(`Error Occured during connection to database`);
main();
})




