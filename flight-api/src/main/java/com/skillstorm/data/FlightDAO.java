package com.skillstorm.data;

import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashSet;
import java.util.Set;

import com.skillstorm.beans.Flight;

public class FlightDAO {
	// CRUD operations
	private final static String url = "jdbc:mysql://localhost:3306/flightAPI";
	private final static String username = "admin";
	private final static String password = "admin";
	
	static {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
		} catch(ClassNotFoundException e) {
			System.out.println("Failed to load driver");
			e.printStackTrace();
		}
	}
	
	public static Flight create(Flight flight) throws SQLException {
		Connection conn = DriverManager.getConnection(url, username, password);
		try {
			conn.setAutoCommit(false);
			final String SQL_CREATE = "insert into flight(max_num_passengers, num_passengers, flight_number, from_airport, to_airport, departure_time, arrival_time) values(?,?,?,?,?,?,?)";
			PreparedStatement stmt = conn.prepareStatement(SQL_CREATE, Statement.RETURN_GENERATED_KEYS);
			
			stmt.setInt(1, flight.getMaxNumPassengers());
			stmt.setInt(2, flight.getNumPassengers());
			stmt.setString(3, flight.getFlightNumber());
			stmt.setString(4, flight.getFromAirport());
			stmt.setString(5, flight.getToAirport());
			stmt.setDate(6, flight.getDepartureTime());
			stmt.setDate(7, flight.getArrivalTime());
			
			stmt.executeUpdate();
			conn.commit();
			
			ResultSet keys = stmt.getGeneratedKeys();
			keys.next();
			int id = keys.getInt(1);
			flight.setId(id);
		} catch(SQLException e) {
			e.printStackTrace();
			conn.rollback();
		}
		return flight;
	}
	
	public static void delete(Flight flight) {
		try(Connection conn = DriverManager.getConnection(url, username, password)) {
			final String SQL_DELETE = "delete from flight where id=?";
			PreparedStatement stmt = conn.prepareStatement(SQL_DELETE);
			stmt.setInt(1, flight.getId());
			stmt.executeUpdate();
		} catch(SQLException e) {
			e.printStackTrace();
		}
	}
	
	public static Set<Flight> findAll() {
		Set<Flight> flights = new HashSet<>();
		try(Connection conn = DriverManager.getConnection(url, username, password)) {
			final String SQL_FINDALL = "select * from flight";
			PreparedStatement stmt = conn.prepareStatement(SQL_FINDALL);
			ResultSet rs = stmt.executeQuery();
			while(rs.next()) {
				Flight flight = rsToFlight(rs);
				flights.add(flight);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return flights;
	}
	
	public static Flight findById(int id) {
		try(Connection conn = DriverManager.getConnection(url, username, password)) {
			final String SQL_FINDBYID = "select * from flight where id=?";
			PreparedStatement stmt = conn.prepareStatement(SQL_FINDBYID);
			stmt.setInt(1, id);
			ResultSet rs = stmt.executeQuery();
			rs.next();
			Flight flight = rsToFlight(rs);
			return flight;
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static void updateById(int id, Flight flight) {
		try(Connection conn = DriverManager.getConnection(url, username, password)) {
			final String SQL_UPDATEBYID = "update flight set max_num_passengers=?, num_passengers=?, flight_number=?, from_airport=?, to_airport=?, departure_time=?, arrival_time=? where id=?";
			PreparedStatement stmt = conn.prepareStatement(SQL_UPDATEBYID);
			
			stmt.setInt(1, flight.getMaxNumPassengers());
			stmt.setInt(2, flight.getNumPassengers());
			stmt.setString(3, flight.getFlightNumber());
			stmt.setString(4, flight.getFromAirport());
			stmt.setString(5, flight.getToAirport());
			stmt.setDate(6, flight.getDepartureTime());
			stmt.setDate(7, flight.getArrivalTime());
			stmt.setInt(8, id);
			
			stmt.executeUpdate();
		} catch(SQLException e) {
			e.printStackTrace();
		}
	}
	
	public static Flight rsToFlight(ResultSet rs) {
		try {
			int id = rs.getInt("id");
			int maxNumPassengers = rs.getInt("max_num_passengers");
			int numPassengers = rs.getInt("num_passengers");
			String flightNumber = rs.getString("flight_number");
			String fromAirport = rs.getString("from_airport");
			String toAirport = rs.getString("to_airport");
			Date departureTime = rs.getDate("departure_time");
			Date arrivalTime = rs.getDate("arrival_time");
			
			Flight flight = new Flight(id, maxNumPassengers, numPassengers, flightNumber, fromAirport, toAirport, departureTime, arrivalTime);
			return flight;
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static void main(String[] args) {
		Flight flight = new Flight();
		
		flight.setId(1003);
		flight.setMaxNumPassengers(100);
		flight.setNumPassengers(50);
		flight.setFlightNumber("fdhsajklfh");
		flight.setFromAirport("DFW");
		flight.setToAirport("LAX");
		flight.setDepartureTime(new Date(1, 2, 3));
		flight.setArrivalTime(new Date(4, 5, 6));
		
		updateById(100, flight);
		
		Flight newFlight = findById(100);
		
		System.out.println(newFlight);
	}
}
