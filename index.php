<html>
	<head>
    <meta lang="en"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, window-stretch-to-fit=yes"/>
		<title>
			Net Weight Calculator
		</title>
		<link rel="stylesheet" href="css/bootstrap.min.css"/>
     <link rel="stylesheet" href="css/index.css">
	</head>
	<body>

<center>
<h2 class = "text text-danger" style="text-align:center; margin:10px auto" id="title">
Net Weight Calculator
</h2>

<table class="table table-light" id="table_new" style="display:none;">
<tr>
<td>
<input type="submit" value="New Vehicle" class="alert alert-secondary" style="outline:none; font-weight:bold; text-align: center; display:none; width:100%; padding:10px; margin:0" id="new_vehicle_text"/>
</td>
</tr>
</table>

<table class="table table-light">

<tr>
<td colspan="3">
<h4 class = "text text-primary" id="new_record_text">
New Record
</h4>
</td>
</tr>
<tr>
<th class = "text text-primary">
Pallet Weight
</th>
<th class = "text text-primary">
Number of Crates
</th>
<th class = "text text-primary">
Gross Weight
</th>
</tr>
<tr>
<td>
<select class="alert alert-primary" style="outline:none; width:auto; padding:10px; margin:0" id="pallet_weight_form">
 <option value="18" selected>
  18Kgs Pallet
 </option>
<option value="20">
  20Kgs Pallet
 </option>
<option value="22">
  22Kgs Pallet
 </option>
</select>
</td>
<td>
<input type="tel"class="alert alert-primary" style="outline:none; width:100%; padding:10px; margin:0" id="crate_count_form"/>
</td>
<td>
<input type="tel" class="alert alert-primary" style="outline:none; width:100%; padding:10px; margin:0" id="gross_weight_form"/>
</td>
</tr>
<tr>
<td colspan="3">
<input type="submit" value="Enter" class="alert alert-success" style="outline:none; font-weight:bold; text-align: center; width:100%; padding:10px; margin:0" id="submit_form"/>
</td>
</tr>
</table>



<table class="table table-light table-striped table-bordered" id="records_table" style="display:none;">
<tr>
<th>
Pallet Tare
</th>
<th>
Crate Count
</th>
<th>
Gross Weight
</th>
</tr>
</table>

<table class="table table-light table-bordered" id="summary_table" style="display:none;">
<tr>
<th>Total Pallets</th>
<th>Total Crates</th>
<th>Total Gross Weight</th>
</tr>

</table>
</center>
     <script rel="javascript" src="js/jquery-3.7.0.min.js"></script>
    <script src="js/index.js"></script>
	</body>
</html>
