var data = 10;
var circle = $('#downloader');
var upcircle = $('#uploader');
var button = $('#showmore');
var table = $('#loadingtable');
var search = $('#search');
var searchForm = $('#searchform');
var alertBox = $('#alertBox');
var c = "";
search.keyup(function () {
    c = search.val();
    console.log(c);
});


$(function () {
    button.click((function () {
        button.css('display','none');
        circle.css('display','');
        data += 10;
        $.ajax({
            url:"/orders",
            type:'GET',
            contentType: "application/json",
            data:{'data':data,
                'search':c
            },
            success: function (response) {
                button.css('display','');
                circle.css('display','none');
                if (response.orders.length < 1){
                    data -= 10;
                    button.text("No More Results To Show");
                }
                for(order of response.orders){
                    var form = "";
                    var moreInfo = "";
                    if(order.status === 'pending'){
                        form = "<td><span class=\"badge-danger badge\" >" +order.status+"</span></td>"
                    }else {
                        form = "<td><span class=\"badge-success badge\" >" +order.status+"</span></td>"
                    }
                    moreInfo = "<td><a class=\"btn btn-warning btn-rounded btn-block\" href=\"\\orders\\"+order._id+"\">More Info</a></td>";
                    table.append('<tr>' +
                        '<td>' + order.name +'</td>'+
                        '<td>' +  order._id +'</td>'+
                        '<td>' +  order.postalCode +'</td>'+
                        '<td>' +  order.cart.totalQty+'</td>'+
                        '<td>' +  order.cart.totalPrice +'</td>'+
                        '<td>' + order.createdAt  +'</td>'+
                        form+
                        moreInfo+
                        '</tr>'
                );
                }
            }
        });
    }))
});

$(document).ready(function () {
   searchForm.submit(function (event) {
       event.preventDefault();
       console.log("down ajax is working");
       upcircle.css('display','');
       data = 10;
       if (1){
           button.text('Show More');
           var x;
           if (search.val() === ""){
               x = {
                   'data':data
               }
           } else {
               x = {
                   search: c
               }
           }
           $.ajax({
               url: "/orders",
               type: 'GET',
               contentType: "application/json",
               data: x,
               success: function (response) {
                   table.html('');
                   if(response.noMatch){
                       alertBox.css('display','');
                   }else {
                       alertBox.css('display','none');
                   }
                   upcircle.css('display','none');
                   for(order of response.orders){
                       var form = "";
                       var moreInfo = "";
                       if(order.status === 'pending'){
                           form = "<td><span class=\"badge-danger badge\" >" +order.status+"</span></td>"
                       }else {
                           form = "<td><span class=\"badge-success badge\" >" +order.status+"</span></td>"
                       }
                       moreInfo = "<td><a class=\"btn btn-warning btn-rounded btn-block\" href=\"\\orders\\"+order._id+"\">More Info</a></td>";
                       table.append('<tr>' +
                           '<td>' + order.name +'</td>'+
                           '<td>' +  order._id +'</td>'+
                           '<td>' +  order.postalCode +'</td>'+
                           '<td>' +  order.cart.totalQty+'</td>'+
                           '<td>' +  order.cart.totalPrice +'</td>'+
                           '<td>' + order.createdAt  +'</td>'+
                           form+
                           moreInfo+
                           '</tr>'
                       );
                   }
               }
           })
           }else {
               upcircle.css('display','none')
           }
   })
});
