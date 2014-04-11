<?php 


	function select($query){
		$DBHOST = 'localhost';
		$DBUSER = 'partymanager';
		$DBPASS = 'reallyuseful';
		$DBNAME = 'partyibiza';

		$conn = new mysqli($DBHOST,$DBUSER,$DBPASS,$DBNAME);
		$r = $conn->query($query);
		$arr = Array();
		if($r) {
			while($row = $r->fetch_array(MYSQL_ASSOC)) $arr[] = $row;
			$r->close();
		}
		$conn->close();
		return $arr;
	}

	function execute($query){
		$DBHOST = 'localhost';
		$DBUSER = 'partymanager';
		$DBPASS = 'reallyuseful';
		$DBNAME = 'partyibiza';
		
		$conn = mysqli_connect($DBHOST,$DBUSER,$DBPASS,$DBNAME);
		$r = mysqli_query($conn,$query);
		mysqli_close($conn);
		return $r;
	}

?>