package com.skillstorm.controllers;

import java.sql.SQLException;

import com.skillstorm.beans.Flight;
import com.skillstorm.data.FlightDAO;

public class FlightController {
	
	public static Flight findFlightById(int id) {
		return FlightDAO.findById(id);
	}
	
	public static Flight addFlight(Flight flight) {
		try {
			return FlightDAO.create(flight);
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static void updateFlight(Flight flight) {
		FlightDAO.update(flight);
	}
	
	public static void deleteFlight(int id) {
		FlightDAO.delete(id);
	}
}
