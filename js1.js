var request = require('request');
var StartRef = 'http://www.csd.tsu.ru';

var Referens=[];
var Emails=[];

var SumEmails = 0;

var EmailRe = /\b[\w\d_.+-]+@[\w\d-]+.[\w\d-.]+/g;
var RefRe = /<a href=\"(\/[-+\w:\/#@$.]*)/g;
var maxdeep = 3;

find(StartRef, 0)


           

function find(url, iter)
{
	iter=iter+1;
    request(url, function (err,res,body) 
    {
        if (err) throw err;
        
        var pageEmails=body.match(EmailRe);
            
		if(pageEmails) {
				
            pageEmails=getOnly(pageEmails);
		
			if(pageEmails) 
				for (i = 0; i < pageEmails.length; i++) 
					if (Emails.indexOf(pageEmails[i]) == -1) 
						Emails.push(pageEmails[i]);
        }
			
        ref=body.match(RefRe);
        if (typeof(ref) != null) {
            ref=getOnly(ref);
            for(i=0; i<ref.length; i++)    
                if (Referens.indexOf(ref[i]) == -1 && iter<maxdeep) {
                    newRef=ref[i].split('href="')[1];
                    find(StartRef + newRef, iter);
                    Referens.push(ref[i]);
                }
              
        }
        
        
        if (SumEmails < Emails.length) 
        {
            console.log("Кол-во на данном этапе = " + Emails.length + "\n" + Emails + "\n\n");
            SumEmails = Emails.length;
        }
    });

}

function getOnly(All) {
  var result = [];
  if (All != undefined) 
    result = All.filter(function(item, pos) {
		return All.indexOf(item) == pos;
	})
  
  return result;
}

