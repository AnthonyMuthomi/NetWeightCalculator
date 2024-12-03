//variables
var url = $(location).attr('href');
var data = "";
var pallet_count=0;
var crate_count=0;
var pallet_tare=0;
var crate_tare=0;
var total_gross_w=0;
var records_table = $("#records_table");
var summary_table = $("#summary_table");

//fetch data
var fetch_data = function(){
  return url.substring(url.indexOf("data")+5, url.indexOf("*@*"));
}

//reset url
var reset_url = function(){
  window.location = $(location).attr('pathname')+"?data=*@*";
}

//configure url correctly
if(url.indexOf("data") == -1 || url.indexOf("*@*") == -1){
    reset_url();
}

data = fetch_data();

function delete_row(dt){
var data = fetch_data();
if(data.indexOf(",") == -1){
data = data.replace(dt, "");
}else{
var pts = data.split(",");
var dt_idx = pts.indexOf(dt);
if(dt_idx != 0){
data = data.replace(","+dt, "");
}else{
data = data.replace(dt+",", "");
}
}
window.location = $(location).attr('pathname')+"?data="+data+"*@*";
}

var animate_views = function(){
$("#table_new").show(10);
$("#new_vehicle_text").show(10);
$("#records_table").show(10);
$("#summary_table").show(20);
}

var update_records_table_rows = function(dataPts2){

var rthr = "";
rthr += "<tr><td>";
rthr += dataPts2[0].replace("pt","");
rthr += "</td><td>";
rthr += dataPts2[1].replace("cc","");
rthr += "</td><td>";
rthr += dataPts2[2].replace("gw","");
rthr += "</td>";
rthr += "</td><td>";
rthr += "<h3 onclick=delete_row('"+dataPts2[0]+"."+dataPts2[1]+"."+dataPts2[2]+"') class='alert alert-danger' style='padding:2 10px;margin:0;font-weight:bold'>X</h3>";
rthr += "</td></tr>";

return rthr;

}

var close_records_table = function(records_table_html){
records_table_html += "</tbody>";
records_table.html(records_table_html);
}

var update_summary_table = function(pallet_count, pallet_tare, crate_count, total_gross_w, summary_table_html){
var crate_tare=(crate_count*2);
summary_table_html = summary_table_html.substring(0, summary_table_html.indexOf("</tbody>"));

summary_table_html += "<tr><td>";
summary_table_html += pallet_count;
summary_table_html += "(" + pallet_tare + " kgs)";
summary_table_html += "</td><td>";
summary_table_html += crate_count;
summary_table_html += "</td><td>";
summary_table_html += total_gross_w;
summary_table_html += "</td></tr>";

var net_weight = total_gross_w - crate_tare - pallet_tare;

summary_table_html += "<tr><th colspan='3'><h1>Net Weight</h1></th></tr>";

summary_table_html += "<tr><td colspan='3' class='text text-danger'>";
summary_table_html += "<h2>"+net_weight+"</h2>";
summary_table_html += "</td></tr></tbody>";

summary_table.html(summary_table_html);
}

if(data != ""){
  animate_views();
if(data.indexOf(",") == -1){
pallet_count=1;
var dataPts2 = data.split(".");
$("#new_record_text").html("Pallet 2");
crate_count= dataPts2[1].replace("cc","");
pallet_tare=dataPts2[0].replace("pt","");
var crate_tare=(crate_count*2);
var total_gross_w= dataPts2[2].replace("gw","");

var records_table_html = records_table.html();
records_table_html = records_table_html.substring(0, records_table_html.indexOf("</tbody>"));
records_table_html += update_records_table_rows(dataPts2);
close_records_table(records_table_html);

var summary_table_html = summary_table.html();
update_summary_table(pallet_count, pallet_tare, crate_count, total_gross_w, summary_table_html);

}else{

var dataPts1 = data.split(",");

$("#new_record_text").html("Pallet " + (dataPts1.length+1));

pallet_count=dataPts1.length;

var records_table_html = records_table.html();
var rthr = "";
records_table_html = records_table_html.substring(0, records_table_html.indexOf("</tbody>"));

for(var i = 0; i < dataPts1.length; i++){
var dataPts2 = dataPts1[i].split(".");
var gw = dataPts2[2].replace("gw","");
var cc = dataPts2[1].replace("cc","");
var pt = dataPts2[0].replace("pt","");

crate_count += (cc-0);
pallet_tare += (pt-0);
total_gross_w += (gw-0);

rthr += update_records_table_rows(dataPts2);
}

records_table_html += rthr;
close_records_table(records_table_html);

var summary_table_html = summary_table.html();
update_summary_table(pallet_count, pallet_tare, crate_count, total_gross_w, summary_table_html);

}
}

//start new vehicle
$("#new_vehicle_text").click(function(){
  reset_url();
});

$("#submit_form").click(function(){

var pt = $("#pallet_weight_form").val();
var cc = $("#crate_count_form").val();
var gw = $("#gross_weight_form").val();

if(cc == "" || cc == 0){
alert("Enter Number of Crates");
}else if(gw == "" || gw == 0){
alert("Enter Gross Weight");
}else {

var dataPart = "pt"+pt+".cc"+cc+".gw"+gw;

if(data == ""){
url = url.substring(0, url.indexOf("data=")+5);
url += dataPart + "*@*";
window.location = url;

//reload_page();

}else{
url = url.substring(0, url.indexOf("*@*"));
url += ","+dataPart+"*@*";
window.location = url;
}
}
});