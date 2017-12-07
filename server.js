/*
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name:Yuanjun Zhang
 * Email:zhangyu6@oregonstate.edu
 */

var path = require('path');
var url = require('url');
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var exphbs = require('express-handlebars');
var postData = require('./postData');

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

// app.get('/', function (req, res) {
//   res.status(200).render('homePage', {
//     price: postData,
//     hideFilter: false,
//     hideButton: false
//   });
//   console.log(" == homePage is working");
//   console.log(" == Length:", postData.length);
//
// });
//
// var array = new Array(postData.length);
//
// for(var i = 0; i < postData.length; i++){
//   array[i] = i;
// }
//
// app.get('/posts/:number', function(req, res, next) {
//   var number = req.params.number;
//   if(parseInt(number) == number){
//     number = parseInt(number);
//     if(array.indexOf(number) != -1){
//       //res.status(200).render('partials/header');
//       for(var j = 0; j < array.length; j++){
//         if(j == number){
//           res.status(200).render('homePage', {
//             price: [postData[number]],
//             hideFilter: true,
//             hideButton: true
//           });
//         }
//       }
//       console.log(postData[number]);
//     }
//     else{
//       next();
//     }
//   }
//   else{
//     next();
//   }
// });


app.use(express.static('public'));

 app.get('*', function (req, res) {
   res.status(404).render('404Page');
   console.log(" == 404 is working");
 });


app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
