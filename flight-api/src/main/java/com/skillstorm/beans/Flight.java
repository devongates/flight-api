package com.skillstorm.beans;

import java.sql.Date;

public class Flight implements Comparable<Flight> {

	public Flight() {
	}

	public Flight(int id, int maxNumPassengers, int numPassengers, String flightNumber, String fromAirport,
			String toAirport, Date departureTime, Date arrivalTime) {
		super();
		this.id = id;
		this.maxNumPassengers = maxNumPassengers;
		this.numPassengers = numPassengers;
		this.flightNumber = flightNumber;
		this.fromAirport = fromAirport;
		this.toAirport = toAirport;
		this.departureTime = departureTime;
		this.arrivalTime = arrivalTime;
	}

	public Flight(int maxNumPassengers, int numPassengers, String flightNumber, String fromAirport, String toAirport,
			Date departureTime, Date arrivalTime) {
		super();
		this.maxNumPassengers = maxNumPassengers;
		this.numPassengers = numPassengers;
		this.flightNumber = flightNumber;
		this.fromAirport = fromAirport;
		this.toAirport = toAirport;
		this.departureTime = departureTime;
		this.arrivalTime = arrivalTime;
	}

	private int id;
	private int maxNumPassengers;
	private int numPassengers;
	private String flightNumber;
	private String fromAirport;
	private String toAirport;
	private Date departureTime;
	private Date arrivalTime;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getMaxNumPassengers() {
		return maxNumPassengers;
	}

	public void setMaxNumPassengers(int maxNumPassengers) {
		this.maxNumPassengers = maxNumPassengers;
	}

	public int getNumPassengers() {
		return numPassengers;
	}

	public void setNumPassengers(int numPassengers) {
		this.numPassengers = numPassengers;
	}

	public String getFlightNumber() {
		return flightNumber;
	}

	public void setFlightNumber(String flightNumber) {
		this.flightNumber = flightNumber;
	}

	public String getFromAirport() {
		return fromAirport;
	}

	public void setFromAirport(String fromAirport) {
		this.fromAirport = fromAirport;
	}

	public String getToAirport() {
		return toAirport;
	}

	public void setToAirport(String toAirport) {
		this.toAirport = toAirport;
	}

	public Date getDepartureTime() {
		return departureTime;
	}

	public void setDepartureTime(Date departureTime) {
		this.departureTime = departureTime;
	}

	public Date getArrivalTime() {
		return arrivalTime;
	}

	public void setArrivalTime(Date arrivalTime) {
		this.arrivalTime = arrivalTime;
	}

	@Override
	public String toString() {
		return "Flight [id=" + id + ", maxNumPassengers=" + maxNumPassengers + ", numPassengers=" + numPassengers
				+ ", flightNumber=" + flightNumber + ", fromAirport=" + fromAirport + ", toAirport=" + toAirport
				+ ", departureTime=" + departureTime + ", arrivalTime=" + arrivalTime + "]";
	}

	@Override
	public int compareTo(Flight o) {
		// TODO Auto-generated method stub
		return this.id - o.id;
	}
}
