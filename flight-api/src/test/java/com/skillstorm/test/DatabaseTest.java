package com.skillstorm.test;

//import static org.junit.Assert.assertEquals;
//import static org.junit.Assert.fail;
//
//import java.sql.Connection;
//import java.sql.Date;
//import java.sql.DriverManager;
//import java.sql.ResultSet;
//import java.sql.SQLException;
//import java.sql.Statement;
//
//import org.junit.After;
//import org.junit.Before;
//import org.junit.Test;

import com.skillstorm.beans.Flight;
import com.skillstorm.data.FlightDAO;

public class DatabaseTest {
	
//	private final static String url = "jdbc:mysql://localhost:3306/flightAPI";
//	private final static String username = "admin";
//	private final static String password = "Spl1cerz!";
//	
//	@Test
//	public void testCreate() {
//		System.out.println("Goodbye table");
//	}
//	
////	@Before
////	public void beforeTest() {
////		try {
////			String ddl = "CREATE TABLE `test_database`.`flights` (`id` INT NOT NULL AUTO_INCREMENT, `max_num_passengers` INT NOT NULL,`num_passengers` INT NOT NULL, "
////					+ "` PRIMARY KEY (`id`));";
////			Connection conn = DriverManager.getConnection(url, username, password);
////			Statement stmt = conn.createStatement();
////			stmt.executeUpdate(ddl); // ***
////			System.out.println("Test table created");
////			conn.close();
////		} catch (Exception e) {
////			fail();
////		}
////	}
//	
//	@After
//	public void afterTest() {
//		try {
//			Connection conn = DriverManager.getConnection(username, url, password);
//			Statement stmt = conn.createStatement();
//			stmt.executeUpdate("drop table flight");
//			System.out.println("Test table dropped");
//			conn.close();
//		} catch (SQLException e) {
//			fail();
//		}
//		
//	}
}
