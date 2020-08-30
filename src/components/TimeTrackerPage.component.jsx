import React from "react";
import { Button } from "@material-ui/core";
import { auth } from "../firebase";

const TimeTrackerPage = () => {
	return (
		<div>
			TimeTrackerrrr Lorem ipsum dolor sit amet consectetur adipisicing
			elit. Eaque dolore tempora recusandae. Consectetur ipsum sunt
			provident natus architecto, eum unde ullam sapiente adipisci ipsa
			esse nam nihil ratione, repudiandae sed.
			<Button
				onClick={() => {
					console.log("logout");
					auth.signOut();
				}}
			>
				Sign Out
			</Button>
		</div>
	);
};

export default TimeTrackerPage;
