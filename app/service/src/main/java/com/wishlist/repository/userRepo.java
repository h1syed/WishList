package com.wishlist.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.wishlist.domain.User;

@Repository
public interface userRepo extends CrudRepository<User, Long> {

		public User findByName(String name);
}