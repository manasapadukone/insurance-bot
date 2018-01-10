var builder = require('botbuilder');
var restify = require('restify');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 8008, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot and listen for messages
var connector = new builder.ChatConnector({
    appId: process.env.APP_ID,
appPassword: process.env.APP_SECRET 
});
server.post('/api/messages', connector.listen());
var bot = new builder.UniversalBot(connector, [
    function (session) {
        builder.Prompts.text(session, 'Hi there! I am Ana, your digital agent from Innovative insurance company.  I will be your assistant today, Please let me know how may I help you To know about our offers for today, please send or say offers');
    },
    function (session,results) {
       if(results.response == "whats up"||results.response == "how are you"||results.response == "how u"){
           builder.Prompts.text(session, "i am doing well,thanks for asking .how can i help you?");}
           else if(results.response == "What's new"||results.response =="Anything interesting"||results.response =="what's latest"){
               builder.Prompts.text(session,"A lot going on To know about our offers for today, please send or say offers ");
           }else if(results.response == "offers"){
              builder.Prompts.text(session,"we have offers available if you buy new policy...");
           }
           else
           {
            
             // session.send("i didnt understand your reply ..")
             session.send("i am very sorry i didnt understand what you said.");
           }
       },
       //session.userData.text = results.response;
       // builder.Prompts.text(session, 'i am doing well,thanks for asking.how may i help u?');
       
          
   // },
    
    function (session, results) {
       //session.userData.text = results.response;
        if(results.response == "Can you help me with my auto insurance"||results.response == "auto insurance"){
        if(results.response){
            builder.Prompts.choice(session, 'Sure, will be glad to assist.  Please let me know if you would like to Buy ',['new policy ',' Renew an existing Policy'] ,{ listStyle : builder.ListStyle.button} );}}
        else{
            session.send("sorry i dont have authority to handle this.please pardon.");
        }
    },
    function (session, results) {
        if (results.response.entity) {
            builder.Prompts.text(session,"Sure.  Will request for some basic information, before we get all set with your insurance policy.  Please let me know of your first name followed by your last name, the way you would like in the policy");}
            else{
                session.send("ohh.sorry you entered a wrong choice");
            }
        },
    function(session,results){
       // session.userData.text = result.response;
        if(results.response){
        //if(results.response == "james smith"||results.response == "i am james smith"){
        builder.Prompts.text(session,`Thank you Mr/ms ${results.response}  Please let me know your car's Make/Model/Year or VIN`);}
        else{
            session.send("sorry i didnt understand what u said... ");
        }
    },
    function(session,results){
       session.userData.text = results.response;
        if(results.response){
        builder.Prompts.text(session,"That's nice.  Please let me know your registration plate, or you can also upload the image of your plate" );
             }     else {
                 session.send("sorry i am not able handle this..");
        }
      },
    function(session,results){
        if(results.response){
            builder.Prompts.confirm(session,"Thank you.  Please confirm on the below details <br/>Vehicle:"+session.userData.text+"<br/>Registration city : karnataka <br/>Month/Year of registration: 2016");
        }else{
            session.send("i didnt understand ...sorry you have to start again");
        }
    },
    function(session,results){
        if (results.response == "looks good"||results.response =="nice"){
            
            //session.endDialog("Thank you.  Please upload images of your vehicle (at least 4 images)");
            builder.Prompts.attachments(session, "Thank you. Please upload images of your vehicle(at least 4 images)");
        }else{
  session.send("please upload your vehicles image(atleast 4) ");
  
        }    }
       

       ]);
       
