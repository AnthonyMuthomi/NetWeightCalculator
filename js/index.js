
var url = $(location).attr('href');
if(url.indexOf("data") == -1 || url.indexOf("*@*") == -1){
window.location = $(location).attr('pathname')+"?data=*@*";
}
var data = url.substring(url.indexOf("data")+5, url.indexOf("*@*"));

var pallet_count=0;
var crate_count=0;
var pallet_tare=0;
var crate_tare=0;
var total_gross_w=0;

var records_table = $("#records_table");
var summary_table = $("#summary_table");

$("#new_vehicle_text").click(function(){
window.location = $(location).attr('pathname')+"?data=*@*";
});

if(data != ""){

$("#table_new").show(10);
$("#new_vehicle_text").show(10);//.css("display", "block");
$("#records_table").show(10);
$("#summary_table").show(20);


if(data.indexOf(",") == -1){
var dataPts2 = data.split(".");

$("#new_record_text").html("Pallet 2");

pallet_count=1;
crate_count= dataPts2[1].replace("cc","");
pallet_tare=dataPts2[0].replace("pt","");
var crate_tare=(crate_count*2);
var total_gross_w= dataPts2[2].replace("gw","");

var records_table_html = records_table.html();

records_table_html = records_table_html.substring(0, records_table_html.indexOf("</tbody>"));

records_table_html += "<tr><td>";
records_table_html += dataPts2[0].replace("pt","");
records_table_html += "</td><td>";
records_table_html += dataPts2[1].replace("cc","");
records_table_html += "</td><td>";
records_table_html += dataPts2[2].replace("gw","");
records_table_html += "</td></tr></tbody>";

records_table.html(records_table_html);

var summary_table_html = summary_table.html();

summary_table_html = summary_table_html.substring(0, summary_table_html.indexOf("</tbody>"));

summary_table_html += "<tr><td>";
summary_table_html += pallet_count;
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

}else{

var dataPts1 = data.split(",");

$("#new_record_text").html("Pallet " + (dataPts1.length+1));

pallet_count=dataPts1.length;

var records_table_html = records_table.html();
records_table_html = records_table_html.substring(0, records_table_html.indexOf("</tbody>"));

for(var i = 0; i < dataPts1.length; i++){
var dataPts2 = dataPts1[i].split(".");
var gw = dataPts2[2].replace("gw","");
var cc = dataPts2[1].replace("cc","");
var pt = dataPts2[0].replace("pt","");

crate_count += (cc-0);
pallet_tare += (pt-0);
total_gross_w += (gw-0);

records_table_html += "<tr><td>";
records_table_html += pt;
records_table_html += "</td><td>";
records_table_html += cc;
records_table_html += "</td><td>";
records_table_html += gw;
records_table_html += "</td></tr>";
}
records_table_html += "</tbody>";

records_table.html(records_table_html);

var crate_tare=(crate_count*2);

var summary_table_html = summary_table.html();

summary_table_html = summary_table_html.substring(0, summary_table_html.indexOf("</tbody>"));

summary_table_html += "<tr><td>";
summary_table_html += pallet_count;
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
}


$("#submit_form").click(function(){
var pt = $("#pallet_weight_form").val();
//$("#pallet_weight_form option:selected").val();
var cc = $("#crate_count_form").val();
var gw = $("#gross_weight_form").val();

if(cc == "" || cc == 0){
alert("Crate count cannot be less than 1");
}else if(gw == "" || gw == 0){
alert("Gross Weight cannot be less than 1");
}else {

var dataPart = "pt"+pt+".cc"+cc+".gw"+gw;

if(data == ""){
url = url.substring(0, url.indexOf("data=")+5);
url += dataPart + "*@*";
window.location = url;
}else{
url = url.substring(0, url.indexOf("*@*"));
url += ","+dataPart+"*@*";
window.location = url;
}

}
});