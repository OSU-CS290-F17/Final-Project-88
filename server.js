/*
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name:Yuanjun Zhang
 * Email:zhangyu6@oregonstate.edu
 */

var path = require('path');
var fs = require('fs');
var url = require('url');
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var exphbs = require('express-handlebars');
var postData = require('./postData');
var peopleData = require('./peopleData');
var myData;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  res.status(200).render('homePage', {
    height: postData,
    hideFilter: false,
    hidePicture: false,
    hideButton: false
  });
  console.log(" == homePage is working");
  console.log(" == Length:", postData.length);

});

var nameArray = new Array(peopleData.length);

for(var i = 0; i < peopleData.length; i++){
  nameArray[i] = peopleData[i].name;
}
console.log(nameArray);
console.log(typeof(nameArray[0]));

app.get('/posts/:name', function(req, res, next) {
  var playerName = req.params.name;
  playerName = playerName.replace("_", " ");
  console.log(playerName);
  if(nameArray.indexOf(playerName) != -1){
    console.log("EXIST!");
    for(var j = 0; j < nameArray.length; j++){
      if(nameArray[j] == playerName){
        console.log(j, "MATCHED!");
        console.log(peopleData[j]);
        res.status(200).render('person', peopleData[j]);
      }
      else{
        console.log("UNMATCHED!");
      }
    }
  }
  else{
    next();
  }
  // if(parseInt(number) == number){
  //   number = parseInt(number);
  //   if(array.indexOf(number) != -1){
  //     //res.status(200).render('partials/header');
  //     for(var j = 0; j < array.length; j++){
  //       if(j == number){
  //         res.status(200).render('homePage', {
  //           price: [postData[number]],
  //           hideFilter: true,
  //           hideButton: true
  //         });
  //       }
  //     }
  //     console.log(postData[number]);
  //   }
  //   else{
  //     next();
  //   }
  // }
  // else{
  //   next();
  // }
});

// app.get('/posts/curry.jpg', function (req, res){
//   fs.readFile('public/curry.jpg', function(err, data){
//       if (err) {
//         throw err;
//       }
//       else{
//         myData = data;
//         res.writeHead(200, {
//             "Content-Type": "image/jpeg"
//         });
//         res.write(myData);
//         res.end();
//       }
// });


app.use(express.static('public'));

 app.get('*', function (req, res) {
   res.status(404).render('404Page');
   console.log(" == 404 is working");
 });


app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
