//variables
var data = "";
var pallet_count=0;
var crate_count=0;
var pallet_tare=0;
var crate_tare=0;
var total_gross_w=0;
var records_table = $("#records_table");
var summary_table = $("#summary_table");
var table_new = $("#table_new");
var new_vehicle_text = $("#new_vehicle_text");
var ccf = $("#crate_count_form");
var noct = $("#no_of_crates_th");
var gwf = $("#gross_weight_form");
var pwf = $("#pallet_weight_form");
var pt= 0;
var cc= 0;
var gw= 0;
var pallet_submit_btn = $("#submit_form");
var dataPart = "";
var dataPts2 = "";
var dataPts1 = "";
var nrt = $("#new_record_text");
var rth = "";
var buttons_area = $("#buttons_area");
var buttons = '';
var ccf_focus = false;
var gwf_focus = false;

var pltDt = localStorage.getItem("pltDt");
var crSp = localStorage.getItem("crSp");

//setInterval(function(){
const da_te = new Date();

var month = moment().date(); 
const hrs = da_te.getHours();
const is_day = hrs > 6 && hrs < 19;
var d_or_n = "NIGHT";
if(is_day){
d_or_n = "DAY";
}
const fmt = moment(da_te).format("ddd MMM DD, YYYY") + " " + d_or_n;
$("#dateArea").html(fmt);
//},1000);

var showAlert = function(txt){
$("#overlay2").show();
$("#inputDiv").show();
$("#inputDivTxt").html(txt);
$("#inputFld").hide();
$("#inputCancel").hide();
$("#inputOk").click(function(){
$("#inputDiv").hide();
$("#overlay2").hide();
});
}

var findReccr = function(s){
s = s.toLowerCase();
pltDt = localStorage.getItem("pltDt");
pltDt = pltDt.toLowerCase();
if(pltDt == null){
return 0;
}else{
var sp_pts_a = pltDt.split("**");
var counter = 0;
for(var i = 0; i < sp_pts_a.length-1; i++){
var suppli = sp_pts_a[i].substring(0, sp_pts_a[i].indexOf("@"));
if(suppli.indexOf(s) != -1){
counter++;
}
}
return counter;
}

return 0;
}

var request_new_supplier_add= function(){
$("#overlay2").show();
$("#inputDiv").show();
$("#inputDivTxt").html("Enter Supplier Name");
$("#inputFld").show();
$("#inputCancel").show();
$("#inputOk").show();

$("#inputFld").off('keyup').keyup(function(){
var txt_i = $(this).val();
txt_i = txt_i.toLowerCase();

pltDt = localStorage.getItem("pltDt");
pltDt = pltDt.toLowerCase();

if(pltDt == null){
$("#searchesArea").hide();
$("#inputDiv").css("height","fit-content");
}else{

var sp_pts_a = pltDt.split("**");
var schsHtml = "";
counter = 0;
for(var i = 0; i < sp_pts_a.length-1; i++){
var suppl = sp_pts_a[i].substring(0, sp_pts_a[i].indexOf("@"));
if(suppl.indexOf(txt_i) != -1){
var indexNm = findReccr(suppl) + 1;
if(suppl.indexOf("-") == -1){
schsHtml += '<div class="searches" style="text-align:left; font-size: 16px; text-transform: capitalize; padding:10px; padding-left:2px; border-bottom: 2px solid rgba(0,0,0,0.7);">'+ suppl + '';
if(indexNm>0){
schsHtml += '-' + indexNm;
}
schsHtml += '</div>';
counter++;
}
}
}
if(schsHtml == ""){
$("#searchesArea").hide();
$("#inputDiv").css("height","fit-content");
}else{
$("#searchesArea").show();
var htdy = 220+((counter-1)*30)+"px";
$("#inputDiv").css("height",htdy).css("max-height", "310px");
$("#searchesArea").html(schsHtml);
$(".searches").off('click').click(function(e){
var optTxt = $(this).html();
$("#inputFld").val(optTxt);
$("#inputOk").click();
$("#inputFld").val("");
});
}

}
});



$("#inputCancel").off('click').click(function(){
$("#inputDiv").hide();
$("#overlay2").hide();
$("#searchesArea").hide();
$("#inputDiv").css("height","fit-content");
});
$("#inputOk").off('click').click(function(){
$("#inputDiv").hide();
$("#overlay2").hide();
$("#searchesArea").hide();
$("#inputDiv").css("height","fit-content");
var sp = $("#inputFld").val();
//prompt("Enter Suppier Name");
$("#inputFld").val("");

if(sp == ""){}else if(sp == null){}else{
pltDt = localStorage.getItem("pltDt");
if(pltDt == null){
pltDt = sp+"@@**";
crSp = sp;
localStorage.setItem("pltDt", pltDt);
localStorage.setItem("crSp", sp);
pltDt = localStorage.getItem("pltDt");
print_sps(pltDt);
}else{
var is_prez = false;
var sp_pts_a = pltDt.split("**");
for(var i = 0; i < sp_pts_a.length-1; i++){
var check = sp_pts_a[i].replace("@@", "");
if(check == sp){
is_prez = true;
}
}
if(is_prez){
//alert("Supplier name exists. Try typing a different one");
showAlert("Supplier name exists. Try typing a different one");
}else{
pltDt += sp+"@@**";
crSp = sp;
localStorage.setItem("pltDt", pltDt);
localStorage.setItem("crSp", sp);
pltDt = localStorage.getItem("pltDt");
print_sps(pltDt);
}
}
}
});
}

var print_sps = function(pd){

var sp_pts = pd.split("**");
var csp = localStorage.getItem("crSp");
var splisthtml = '';
for(var i = 0; i < sp_pts.length-1; i++){
splisthtml += '<div class="alert alert-primary suppliers" style="background:transparent; text-align:left; font-size:16px; border: none; border-bottom:1px solid grey; border-radius:0; width:90%;padding:10px; padding-left:3px; margin-bottom:2px;';
var spNml = sp_pts[i].substring(0, sp_pts[i].indexOf("@@"));
if(spNml == csp){
splisthtml += 'color:green;background: rgba(0,255,0,0.2);font-weight:bold;border-radius:4px;';
}else{
splisthtml += 'color:blue;';
}

splisthtml += '" id="sp_'+ (i+1) +'">';

splisthtml += spNml;

splisthtml += '</div>';
}
$("#spListArea").html(splisthtml);

$(".suppliers").click(function(){
var spNmclk = $(this).html();
localStorage.setItem("crSp", spNmclk);
pltDt = localStorage.getItem("pltDt");
crSp = spNmclk;
print_sps(pltDt);
if(pltDt != null){
var parta = pltDt.substring(0, pltDt.indexOf(crSp)+crSp.length+2);
var partb = pltDt.replace(parta, "");
var curSpDt = partb.substring(0, partb.indexOf("**"));
data = curSpDt;
reload_page(data);
$("#spsA").hide();
$("#overlay").hide();
}
});
}

if(pltDt == "" || pltDt == null){
request_new_supplier_add();
}else{
print_sps(pltDt);
}

$("#supplier_adder").click(function(){
request_new_supplier_add();
data = "";
reset_page();
});

$("#mOpn").click(function(){
$("#overlay").show();
$("#spsA").show();
});
$("#closer").click(function(){
$("#overlay").hide();
$("#spsA").hide();
});


//pwf
var opthtml = "";
for(var i = 10; i <= 30; i++){
  opthtml += "<option value='"+(i)+"'";
if(i == 18){
  opthtml += "selected";
}
  opthtml += ">"+(i)+"Kgs Pallet</option>";
}
pwf.html(opthtml);

//reset page
var reset_page = function(){
table_new.hide(10);
new_vehicle_text.hide(10);
rthtml = records_table.html();
rthtml = rthtml.substring(0, rthtml.indexOf("</tr>"));
records_table.html(rthtml+"</tbody>");

sthtml = summary_table.html();
sthtml = sthtml.substring(0, sthtml.indexOf("</tr>"));
summary_table.html(sthtml+"</tbody>");
reset_pallet_form();
nrt.html("1");
records_table.hide(10);
summary_table.hide(20);
}

ccf.click(function(e){
e.stopPropagation();
e.preventDefault();
$(this).val("");
ccf_focus = true;
gwf_focus = false;
});

gwf.click(function(e){
e.stopPropagation();
e.preventDefault();
$(this).val("");
gwf_focus = true;
ccf_focus = false;
});

noct.click(function(){
ccf.val("40");
gwf.focus();
gwf_focus = true;
ccf_focus = false;
});

buttons += '<input type="submit" value="1" class="alert alert-primary buttons" style="outline:none; font-weight:bold; text-align: center; width:55px; padding:15px; margin:5px" id=""/>';
buttons += '<input type="submit" value="2" class="alert alert-primary buttons" style="outline:none; font-weight:bold; text-align: center; width:55px; padding:15px; margin:5px" id=""/>';
buttons += '<input type="submit" value="3" class="alert alert-primary buttons" style="outline:none; font-weight:bold; text-align: center; width:55px; padding:15px; margin:5px" id=""/>';
buttons += '<input type="submit" value="0" class="alert alert-primary buttons" style="outline:none; font-weight:bold; text-align: center; width:55px; padding:15px; margin:5px" id=""/>';
buttons += '<input type="submit" value="00" class="alert alert-primary buttons" style="outline:none; font-weight:bold; text-align: center; width:55px; padding:15px; margin:5px" id=""/><br/>';
buttons += '<input type="submit" value="4" class="alert alert-primary buttons" style="outline:none; font-weight:bold; text-align: center; width:55px; padding:15px; margin:5px" id=""/>';
buttons += '<input type="submit" value="5" class="alert alert-primary buttons" style="outline:none; font-weight:bold; text-align: center; width:55px; padding:15px; margin:5px" id=""/>';
buttons += '<input type="submit" value="6" class="alert alert-primary buttons" style="outline:none; font-weight:bold; text-align: center; width:55px; padding:15px; margin:5px" id=""/>';
buttons += '<input type="submit" value="Del" class="alert alert-danger buttons" style="outline:none; font-weight:bold; text-align: center; width: 90px; padding:15px; margin:5px;margin-left:30px" id=""/><br/>';
buttons += '<input type="submit" value="7" class="alert alert-primary buttons" style="outline:none; font-weight:bold; text-align: center; width:55px; padding:15px; margin:5px" id=""/>';
buttons += '<input type="submit" value="8" class="alert alert-primary buttons" style="outline:none; font-weight:bold; text-align: center; width:55px; padding:15px; margin:5px" id=""/>';
buttons += '<input type="submit" value="9" class="alert alert-primary buttons" style="outline:none; font-weight:bold; text-align: center; width:55px; padding:15px; margin:5px" id=""/>';
buttons += '<input type="submit" value="Enter" class="alert alert-success buttons" style="outline:none; font-weight:bold; text-align: center; width: 90px; padding:15px; margin:5px; margin-left:30px" id="submit_form"/>';

buttons_area.html(buttons);


$(".buttons").click(function(){
var vl = $(this).val();
vl = vl.toLowerCase();

if(ccf_focus){
var vl_ccf = ccf.val();
if(vl != "del"){
if(vl != "enter"){
ccf.val(vl_ccf+vl);}
}else{
if(vl_ccf == ""){
}else{
vl_ccf = vl_ccf.substring(0, vl_ccf.length-1);
ccf.val(vl_ccf);
}
}
ccf.focus();
}else if(gwf_focus){
var vl_gwf = gwf.val();
if(vl != "del" ){
if(vl != "enter"){
gwf.val(vl_gwf+vl);}
}else{
if(vl_gwf == ""){
}else{
vl_gwf = vl_gwf.substring(0, vl_gwf.length-1);
gwf.val(vl_gwf);
}
}
gwf.focus();
}else{}


if(vl == "enter"){
if(pltDt == "" || pltDt == null){
request_new_supplier_add();
}else{
gwf_focus = false;
ccf_focus = false;
pt= pwf.val();
cc= ccf.val();
gw= gwf.val();

if(cc == "" || cc == 0){
//alert("Enter Number of Crates");
showAlert("Enter Number of Crates");
}else if(gw == "" || gw == 0){
//alert("Enter Gross Weight");
showAlert("Enter Gross Weight");
}else {
pltDt = localStorage.getItem("pltDt");
crSp = localStorage.getItem("crSp");
dataPart = "pt"+pt+".cc"+cc+".gw"+gw;

var parta = pltDt.substring(0, pltDt.indexOf(crSp)+crSp.length+2);
var partb = pltDt.replace(parta, "");

partb = partb.substring(partb.indexOf("**"), partb.length);

animate_views();
reset_pallet_form();
if(data == ""){
data += dataPart;
pltDt = parta + data + partb;
localStorage.setItem("pltDt", pltDt);
reload_page(data);
}else{
data += ","+dataPart;
pltDt = parta + data + partb;
localStorage.setItem("pltDt", pltDt);
reload_page(data);
}
}
gwf.focus();
gwf_focus = true;
}
}

});

var animate_views = function(){
//table_new.show(10);
//new_vehicle_text.show(10);
records_table.show(10);
summary_table.show(20);
}

var reset_pallet_form = function(){
pwf.val(18);
ccf.val(35);
gwf.val("");
}


function delete_row(dt){
$("#overlay2").show();
$("#inputDiv").show();
$("#inputDivTxt").html("Delete ?");
$("#inputFld").hide();
$("#inputCancel").show();
$("#inputOk").show();
$("#inputCancel").off('click').click(function(){
$("#inputDiv").hide();
$("#overlay2").hide();
});
$("#inputOk").off('click').click(function(){
$("#inputDiv").hide();
$("#overlay2").hide();

//var deltc = confirm("delete?");
//if(deltc){
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

var parta = pltDt.substring(0, pltDt.indexOf(crSp)+crSp.length+2);
var partb = pltDt.replace(parta, "");

partb = partb.substring(partb.indexOf("**"), partb.length);
pltDt = parta + data + partb;
localStorage.setItem("pltDt", pltDt);
if(data == ""){
reset_page();
}else if(data.indexOf(",") == -1){
pallet_count=1;
var dtpt2 = data.split(".");
nrt.html("2");
crate_count= dtpt2[1].replace("cc","");
pallet_tare=dtpt2[0].replace("pt","");
crate_tare=(crate_count*2);
total_gross_w= dtpt2[2].replace("gw","");
rth = records_table.html();
rth = rth.substring(0, rth.indexOf("</tr>"));
rth += update_records_table_rows(dtpt2);
close_records_table(rth);

var summary_table_html = summary_table.html();
update_summary_table(pallet_count, pallet_tare, crate_count, total_gross_w, summary_table_html);

}else{
reload_page(data);
}

//}

});
}

var update_records_table_rows = function(dp2){

var rthr = "";
rthr += "<tr><td>";
rthr += dp2[0].replace("pt","");
rthr += "</td><td>";
rthr += dp2[1].replace("cc","");
rthr += "</td><td>";
rthr += dp2[2].replace("gw","");
rthr += "</td>";
rthr += "</td><td>";
rthr += "<h3 onclick=delete_row('"+dp2[0]+"."+dp2[1]+"."+dp2[2]+"') class='alert alert-danger' style='padding:2 10px;margin:0;font-weight:bold'>X</h3>";
rthr += "</td></tr>";

return rthr;

}

var close_records_table = function(rt_html){ 
rt_html += "</tbody>";
records_table.html(rt_html);
}

var update_summary_table = function(pallet_count, pallet_tare, crate_count, total_gross_w, summary_table_html){

var crate_tare=(crate_count*2);
if(summary_table_html.indexOf("tr") > -1){
summary_table_html = summary_table_html.substring(0, summary_table_html.indexOf("</tr>"));
}else{
summary_table_html = summary_table_html.substring(0, summary_table_html.indexOf("</tbody>"));
}

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

var reload_page = function(dta){
if(dta == ""){
reset_page();
}else{
animate_views();

if(dta.indexOf(",") == -1){
pallet_count=1;
var dtpt2 = dta.split(".");
nrt.html("2");
crate_count= dtpt2[1].replace("cc","");
pallet_tare=dtpt2[0].replace("pt","");
crate_tare=(crate_count*2);
total_gross_w= dtpt2[2].replace("gw","");
rth = records_table.html();
if(rth.indexOf("<tr>") == -1){
rth = rth.substring(0, rth.indexOf("</tbody>"));
}else{
rth = rth.substring(0, rth.indexOf("</tr>"));
}
rth += update_records_table_rows(dtpt2);
close_records_table(rth);

var summary_table_html = summary_table.html();
update_summary_table(pallet_count, pallet_tare, crate_count, total_gross_w, summary_table_html);

}else{
dp1 = data.split(",");

$("#new_record_text").html("" + (dp1.length+1));

pallet_count=dp1.length;

var rth2 = records_table.html();
var rthr = "";
rth2 = rth2.substring(0, rth2.indexOf("</tr>"));
crate_count = 0;
pallet_tare = 0;
total_gross_w = 0;
for(var i = 0; i < dp1.length; i++){
var dpt2 = dp1[i].split(".");
var gw = (dpt2[2].replace("gw","") - 0);
var cc = (dpt2[1].replace("cc","") - 0);
var pt = (dpt2[0].replace("pt","") - 0);

crate_count += cc;
pallet_tare += pt;
total_gross_w += gw;

rthr += update_records_table_rows(dpt2);
}

rth2 += rthr;
close_records_table(rth2);

var summary_table_html = summary_table.html();
update_summary_table(pallet_count, pallet_tare, crate_count, total_gross_w, summary_table_html);

}
}
}



//start new vehicle
$("#new_vehicle_text").click(function(){

var sp = prompt("Enter Suppier Name");
if(sp != null && sp != ""){
pltDt += sp+"@@**";
localStorage.setItem("pltDt", pltDt);
localStorage.setItem("crSp", sp);
data = "";
reset_page();
}

});

$(document).ready(function(){
gwf.focus();
gwf_focus = true;
if(pltDt != null){
var parta = pltDt.substring(0, pltDt.indexOf(crSp)+crSp.length+2);
var partb = pltDt.replace(parta, "");
var curSpDt = partb.substring(0, partb.indexOf("**"));
data = curSpDt;
reload_page(data);
}
});
