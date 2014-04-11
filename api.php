<?php

	// init application

		require 'vendor/autoload.php';
		require_once 'common.php';
		
		$root = "/api";

		$app = new \Slim\Slim();


	//Public API

		$app->get($root.'/parties', function(){
			$sql = 'SELECT id,name FROM Party';
			$r = select($sql);
			echo json_encode($r);
		});

		$app->get($root.'/party/:id', function($id){
			$sql = 'SELECT name,location,date FROM Party WHERE id = '.$id;
			$r1 = select($sql);
			$sql = 'SELECT a.name, a.email FROM Attendant a, PartiesAttendants b WHERE b.idAttendant = a.id AND b.idParty = '.$id;
			$r2 = select($sql);
			$r1['attendants'] = $r2;
			echo json_encode($r1);
		});

		$app->post($root.'/party/:id/RSVP', function($id){
			$request = \Slim\Slim::getInstance()->request();
			$post = $request->post();
			$name = $post['name'];
			$email = $post['email'];
			$sql = 'SELECT id FROM Attendant WHERE name = "'.$name.'" AND email = "'.$email.'"';
			$r = select($sql);
			if(count($r) > 0) {
				$sql = 'INSERT INTO PartiesAttendants (idParty,idAttendant) VALUES ('.$id.','.$r[0]['id'].')';
				$r = execute($sql);
				echo json_encode($r);
			} else {
				$sql = 'INSERT INTO Attendant (name,email) VALUES ("'.$name.'","'.$email.'")';
				$r = execute($sql);
				$sql = 'SELECT id FROM Attendant WHERE name = "'.$name.'" AND email = "'.$email.'"';
				$r = select($sql);
				$sql = 'INSERT INTO PartiesAttendants (idParty,idAttendant) VALUES ('.$id.','.$r[0]['id'].')';
				$r = execute($sql);
				echo json_encode($r);
			}
		});

	// Private API

		$app->post($root.'/login', function() {
			$request = \Slim\Slim::getInstance()->request();
			$post = $request->post();
			$user = $post['user'];
			$pass = $post['pass'];

			if($user!="" && $pass!="") {
				$sql = 'SELECT login FROM admin WHERE login = "'.$user.'" AND HASH = "'.md5($pass).'"';
				$r = select($sql);
				echo json_encode($r);
			}

		});

		$app->delete($root.'/party/:id', function($id){
			echo "Deleting party with id $id";
		});

		$app->delete($root.'/party/:id/:attendant', function($party,$att){
			echo "Deleting attendant $att from party $party";
		});

		$app->put($root.'/party', function(){
			$request = \Slim\Slim::getInstance()->request();
			$put = $request->put();
			$name = $put['name'];
			$location = $put['location'];
			$date = $put['date'];
			if($name != "" && $location != "" && $date != "") {
				$sql = 'INSERT INTO Party (name,location,date) VALUES ("'.$name.'","'.$location.'","'.$date.'")';
				$r = execute($sql);
				echo json_encode($r);
			}
		});

		$app->put($root.'/party/:id/RSVP', function($id){
			echo "Add attendant to party $id";
		});

	// Run the application

		$app->run();
?>
