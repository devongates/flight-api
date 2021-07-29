package com.skillstorm.servlet;

import java.io.IOException;
import java.util.Set;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.skillstorm.beans.Flight;
import com.skillstorm.controllers.FlightController;
import com.skillstorm.controllers.FlightsController;
import com.skillstorm.exceptions.IllegalRouteException;
import com.skillstorm.exceptions.UnhandledHttpMethodException;
import com.skillstorm.util.FlightId;

@WebServlet(urlPatterns="/*")
public class FrontController extends HttpServlet {

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		doDispatch(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		doDispatch(req, resp);
	}

	@Override
	protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		doDispatch(req, resp);
	}

	@Override
	protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		doDispatch(req, resp);
	}
	
	private void doDispatch(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String requestURI = req.getRequestURI();
		requestURI = requestURI.replace(this.getServletContext().getContextPath(), "");
		String method = req.getMethod();
		ObjectMapper mapper = new ObjectMapper();
		
		switch(requestURI) {
		
		
		
		case "/flights":
			switch(method) {
			case "GET":
				Set<Flight> flights = FlightsController.getFlights();
				try {
					String json = mapper.writeValueAsString(flights);
					resp.setContentType("application/json");
					resp.getWriter().print(json);
				} catch (JsonProcessingException e) {
					e.printStackTrace();
				}
				break;
					
			default:
				throw new UnhandledHttpMethodException();
			}
			break;
			
			
			
		case "/flight":
			switch(method) {
			case "GET": {
				FlightId flightId = mapper.readValue(req.getInputStream(), FlightId.class);
				Flight flight = FlightController.findFlightById(flightId.getId());
				try {
					String json = mapper.writeValueAsString(flight);
					resp.setContentType("application/json");
					resp.getWriter().print(json);
				} catch(JsonProcessingException e) {
					e.printStackTrace();
				}
				break;
			}
				
			case "POST": {
				Flight flight = mapper.readValue(req.getInputStream(), Flight.class);
				Flight returnedFlight = FlightController.addFlight(flight);
				try {
					String json = mapper.writeValueAsString(returnedFlight);
					resp.setContentType("application/json");
					resp.getWriter().print(json);
				} catch(JsonProcessingException e) {
					e.printStackTrace();
				}
				break;
			}
				
			case "PUT": {
				Flight flight = mapper.readValue(req.getInputStream(), Flight.class);
				FlightController.updateFlight(flight);
				break;
			}
				
			case "DELETE":
				FlightId flightId = mapper.readValue(req.getInputStream(), FlightId.class);
				FlightController.deleteFlight(flightId.getId());
				break;
				
			default:
				throw new UnhandledHttpMethodException();
			}
			break;
			
			
			
		default:
			throw new IllegalRouteException();
		}
	}
	
}
