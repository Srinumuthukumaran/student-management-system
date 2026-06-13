package com.example.studentmanagement.controller;

import com.example.studentmanagement.entity.Student;

import com.example.studentmanagement.service.StudentService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
@CrossOrigin("*")
public class StudentController {

    @Autowired
    StudentService service;

    @PostMapping
    public Student addStudent(
            @RequestBody Student student) {
        return service.addStudent(student);
    }

    @GetMapping
    public List<Student> getStudents() {
        return service.getAllStudents();
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(
            @PathVariable int id) {
        service.deleteStudent(id);
    }
}
