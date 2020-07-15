// API backend =======================================================
var express = require("express")
var bodyParser = require("body-parser")
var path = require("path")
var app = express()
var REST_PORT = 8080
const https = require('https');
const config = require('./config');
const base_url = config.base_url
const secret_key = config.secret_key

app.use(express.static("build"))
app.use(bodyParser.json())
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  )
  
  next()
})


app.get("/tradehotdetails/:request", function (req, resolve) {
    const request = JSON.parse(req.params.request)
    let symbol = request.symbol
    let quoteUrl= base_url+'stable/stock/'+symbol+'/quote?token='+secret_key
    let tradayChartUrl= base_url+'stable/stock/'+symbol+'/intraday-prices?token='+secret_key
    let newsUrl = base_url+'stable/stock/'+symbol+'/news/last/5?token='+secret_key
    https.get(quoteUrl, res => {
        if(res.statusCode==404)
            resolve.status(404).send('Stock not found');
        else{
            res.setEncoding("utf8");
        let body = "";
        res.on("data", data => {
          body += data;
        });
        res.on("end", () => {
          body = JSON.parse(body);
          
          https.get(tradayChartUrl, res1 => {
            res1.setEncoding("utf8");
            let body1 =""
            res1.on("data", data => {
              body1 += data;
            });
            res1.on("end", () => {
              body.chart = JSON.parse(body1);
              
              https.get(newsUrl, res2 => {
                res2.setEncoding("utf8");
                let body2 =""
                res2.on("data", data => {
                  body2 += data;
                  
                });
                res2.on("end", () => {
                  body.news = JSON.parse(body2);
                  
                  resolve.send(body)
                });
              });
            });
          });
        });
        }
        
      });
  })

  app.get("/tradecolddetails/:request", function (req, resolve) {
    const request = JSON.parse(req.params.request)
    let symbol = request.symbol
    let range = request.range
    let quoteUrl= base_url+'stable/stock/'+symbol+'/quote?token='+secret_key
    let historicalChartUrl = base_url+'stable/stock/'+symbol+'/chart/'+range+'?token='+secret_key
    let overviewUrl = base_url+'stable/stock/'+symbol+'/company?token='+secret_key
    let peerUrl = base_url+'stable/stock/'+symbol+'/peers?token='+secret_key
    let tradayChartUrl= base_url+'stable/stock/'+symbol+'/intraday-prices?token='+secret_key
    let newsUrl = base_url+'stable/stock/'+symbol+'/news/last/5?token='+secret_key
    https.get(quoteUrl, res => {
        if(res.statusCode==404)
            resolve.status(404).send('Stock not found');
        else{
            res.setEncoding("utf8");
            let body = "";
            res.on("data", data => {
            body += data;
            
            });
            res.on("end", () => {
            body = JSON.parse(body);
            
            https.get(tradayChartUrl, res1 => {
                res1.setEncoding("utf8");
                let body1 =""
                res1.on("data", data => {
                  body1 += data;
                });
                res1.on("end", () => {
                  body.chart = JSON.parse(body1);
                  
                  https.get(newsUrl, res2 => {
                    res2.setEncoding("utf8");
                    let body2 =""
                    res2.on("data", data => {
                      body2 += data;
                      
                    });
                    res2.on("end", () => {
                      body.news = JSON.parse(body2);
                     
                        https.get(historicalChartUrl, res3 => {
                            res3.setEncoding("utf8");
                            let body3 =""
                            res3.on("data", data => {
                                body3 += data;
                            
                            });
                            res3.on("end", () => {
                                body.hischart = JSON.parse(body3);
                                
                                https.get(overviewUrl, res4 => {
                                    res4.setEncoding("utf8");
                                    let body4 =""
                                    res4.on("data", data => {
                                    body4 += data;
                                    
                                    });
                                    res4.on("end", () => {
                                    body.overview = JSON.parse(body4);
                                    
                                    https.get(peerUrl, res5 => {
                                        res5.setEncoding("utf8");
                                        let body5 =""
                                        res5.on("data", data => {
                                        body5 += data;
                                        
                                        });
                                        res5.on("end", () => {
                                        body.peers = JSON.parse(body5);
                                        
                                        resolve.send(body)
                                        });
                                    });
                                    });
                                });
                            });
                    });
                    });
                  });
                });
              });
            
            });
            }
        
      });
  })

  app.get("/normalhotdetails/:request", function (req, resolve) {
    const request = JSON.parse(req.params.request)
    let symbol = request.symbol
    let newsUrl = base_url+'stable/stock/'+symbol+'/news/last/5?token='+secret_key
    
    https.get(newsUrl, res => {
        if(res.statusCode==404)
            resolve.status(404).send('Stock not found');
        else{
            res.setEncoding("utf8");
            let body = "";
            res.on("data", data => {
            body += data;
            
            });
            res.on("end", () => {
            body = JSON.parse(body);
            
            resolve.send(body)
            });
        }
        
      });
  })

  app.get("/normalcolddetails/:request", function (req, resolve) {
    const request = JSON.parse(req.params.request)
    let symbol = request.symbol
    let range = request.range
    let quoteUrl= base_url+'stable/stock/'+symbol+'/quote?token='+secret_key
    let historicalChartUrl = base_url+'stable/stock/'+symbol+'/chart/'+range+'?token='+secret_key
    let overviewUrl = base_url+'stable/stock/'+symbol+'/company?token='+secret_key
    let peerUrl = base_url+'stable/stock/'+symbol+'/peers?token='+secret_key
    let newsUrl = base_url+'stable/stock/'+symbol+'/news/last/5?token='+secret_key
    https.get(quoteUrl, res => {
        if(res.statusCode==404)
            resolve.status(404).send('Stock not found');
        else{
            res.setEncoding("utf8");
            let body = "";
            res.on("data", data => {
            body += data;
            
            });
            res.on("end", () => {
            body = JSON.parse(body);
            //console.log('quote normal'+ historicalChartUrl)
            https.get(historicalChartUrl, res1 => {
                res1.setEncoding("utf8");
                let body1 =""
                res1.on("data", data => {
                body1 += data;
                
                });
                res1.on("end", () => {
                    body.chart = JSON.parse(body1);
                    //console.log('chart normal')
                    https.get(overviewUrl, res2 => {
                    res2.setEncoding("utf8");
                    let body2 =""
                    res2.on("data", data => {
                        body2 += data;
                        
                    });
                    res2.on("end", () => {
                        body.overview = JSON.parse(body2);
                        //console.log('overview normal')
                        
                        
                        https.get(peerUrl, res3 => {
                        res3.setEncoding("utf8");
                        let body3 =""
                        res3.on("data", data => {
                            body3 += data;
                            
                        });
                        res3.on("end", () => {
                            body.peers = JSON.parse(body3);
                            
                            https.get(newsUrl, res4 => {
                                
                                res4.setEncoding("utf8");
                                let body4 = "";
                                res4.on("data", data => {
                                body4 += data;
                                
                                });
                                res4.on("end", () => {
                                body.news = JSON.parse(body4);
                                
                                resolve.send(body)
                                });
                                
                                
                              });
                        });
                        });
                    });
                    });
                });
                });
            });
            }
        
      });
  })

app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "../../build/index.html"))
})

app.listen(REST_PORT)
console.log("Express server listening on http://localhost:"+REST_PORT)


