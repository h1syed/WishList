package com.wishlist.api;

import java.net.URI;
import java.util.Optional;

//import org.hibernate.mapping.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.util.UriComponentsBuilder;

import com.bah.msd.mcc.domain.Customer;
import com.bah.msd.mcc.repository.CustomerRepository;

@RestController
@RequestMapping("/customers")
public class CustomerAPI {
	
	@Autowired
	private CustomerRepository repo;

	
	@GetMapping
	public Iterable<Customer> getAll(){
		return repo.findAll();
	}
	
	@GetMapping("/{userId}")
	public Optional<Customer> getUserById(@PathVariable("userId") long id){
		return repo.findById(id);
	}
	@PostMapping("/login")
	public Boolean authenticate(@RequestBody Customer customer) {
		if(customer.getName() == null || customer.getPassword() == null) {
			return false;
		}
		if(repo.findByName(customer.getName()) != null) {
				if(customer.getPassword().equals(repo.findByName(customer.getName()).getPassword())) {
					return true;
				}
		}
		
		return false;
		
	}
	@GetMapping("/{userName}")
	public Customer findByName(@PathVariable("userName") String name){
		return repo.findByName(name);
	}
	
	@DeleteMapping ("/{userId}")
	public ResponseEntity<?> deleteByName( @PathVariable("userId") long id) {
		
		if (repo.findById(id) == null){
			return ResponseEntity.badRequest().build();
		}
		
		repo.deleteById(id);
		return ResponseEntity.ok().build();

	}
	
	@PostMapping
	public ResponseEntity<?> addUser(@RequestBody Customer newUser, UriComponentsBuilder uri){
			if(newUser.getName() == null
			    || newUser.getPassword() == null
			    || newUser.getEmail() == null) {
				return ResponseEntity.badRequest().build();
			}
			newUser = repo.save(newUser);
			URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(newUser.getId()).toUri();
			ResponseEntity<?> response = ResponseEntity.created(location).build();
			return response;
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody Customer newUser){
			if(newUser.getName() == null
			    || newUser.getPassword() == null
			    || newUser.getEmail() == null) {
				return ResponseEntity.badRequest().build();
			}
			newUser = repo.save(newUser);
			return ResponseEntity.ok().build();
	}
	
	@PutMapping("/{userId}")
	public ResponseEntity<?> updateByName(@RequestBody Customer newUser, @PathVariable("userId") long id){
		if(newUser.getName() == null
			    || newUser.getPassword() == null
			    || newUser.getEmail() == null) {
			return ResponseEntity.badRequest().build();
		}
		newUser = repo.save(newUser);
		return ResponseEntity.ok().build();
	}
	
	
}