package com.skillstorm.controllers;

import java.util.Set;

import com.skillstorm.beans.Flight;
import com.skillstorm.data.FlightDAO;

public class FlightsController {
	
	public FlightsController() {}
	
	public static Set<Flight> getFlights() {
		return FlightDAO.findAll();
	}
	
}
