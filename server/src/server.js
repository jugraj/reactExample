require('isomorphic-fetch');
require('es6-promise').polyfill();

const express = require('express');
const app = express();
const api = require('./api/');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

/**
  Simple flight search api wrapper.

  TODO: client should provide params

  Api params and location values are here:
  http://business.skyscanner.net/portal/en-GB/Documentation/FlightsLivePricingQuickStart
*/
app.get('/api/search', (req, res) => {
  var OriginPlace = req.query.originplace;
  var DestinationPlace = req.query.destinationplace;
  var OutboundDate = req.query.outbounddate;
  var inboundDate = req.query.inbounddate;
  var CabinClass = req.query.cabinclass;
  var adults = req.query.adults;
  api.livePricing.search({OriginPlace,DestinationPlace,inboundDate,OutboundDate,CabinClass,adults}
  )
  .then((results) => {
    // TODO - a better format for displaying results to the client
    
    res.json(results);
    console.log('TODO: transform results for consumption by client '+results);
  })
  .catch(console.error);
});

app.listen(4000, () => {
  console.log('Node server listening on http://localhost:4000');
});
