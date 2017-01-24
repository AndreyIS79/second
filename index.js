'use strict';

//var quests = "whois  google.com";
//var quests = "whois avmix.com.ua";

const exec = require('child_process').exec;




let hosts = [
    'whois avmix.com.ua',
    'whois google.com',
    'whois traf.info',
    'whois ya.ru',
    'whois razetka.ua'
];


for (let i = 0; i < hosts.length; i += 1) {
    let host = hosts[i];

    let days = getDays(host);

}

function getDays (host) {

    exec(host, function (error, stdout, stderr) {
        if (error) {
            console.error('exec error: ${error}');
            return;
        }
        var str = stdout.toString();

//    console.log(str);


        function cutDate(longStr) {

            if (longStr.includes("Expiration Date: ")) {

                longStr = longStr.substring(longStr.indexOf("Expiration Date: "));

            }

            if (longStr.includes("expires: ")) {

                longStr = longStr.substring(longStr.indexOf("expires: "), longStr.indexOf("source:"));

            }

            if (longStr.includes("paid-till: ")) {

                longStr = longStr.substring(longStr.indexOf("paid-till: "), longStr.indexOf("free-date:"));

            }

            if (longStr.includes("Registry Expiry Date: ")) {

                longStr = longStr.substring(longStr.indexOf("Registry Expiry Date: "), longStr.indexOf("Registrar:"));

                //           console.log("first - 5 --- " + longStr);
            }

            return longStr;
        };

        var res = cutDate(str);
        //console.log("first - 5 --- " + res);
        var result = res.substring(res.indexOf(": "), 32);

        //console.log("first --- " + result);

        var resalt = result.substring(2, 1);

        while ((resalt.localeCompare(" ")) == 0) {

            result = result.substring(1);
            resalt = result.substring(0, 1);

        }

        result = result.substring(0, 11);

       // console.log(result);

        var ms = Date.parse(result);
     //   console.log(ms);
        var now = new Date();
        var msNow = Date.parse(now);
    //    console.log(msNow);
        var timeF = ms - msNow;
        timeF = timeF / 2678400000;
        timeF = Math.round(timeF);
        console.log(timeF + " months left until the end for " + host);
        console.log(" ");
    })
};