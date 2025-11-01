package com.fooddelivery.controller;

import com.fooddelivery.entity.FoodItem;
import com.fooddelivery.repository.FoodItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/food-items")
@CrossOrigin(origins = "http://localhost:5173")
public class FoodItemController {
    
    @Autowired
    private FoodItemRepository foodItemRepository;
    
    @GetMapping
    public List<FoodItem> getAllFoodItems() {
        return foodItemRepository.findAll();
    }
    
    @GetMapping("/category/{category}")
    public List<FoodItem> getFoodItemsByCategory(@PathVariable String category) {
        return foodItemRepository.findByCategory(category);
    }
    
    @PostMapping
    public FoodItem createFoodItem(@RequestBody FoodItem foodItem) {
        return foodItemRepository.save(foodItem);
    }
}