import express from "express";
import Employee from "../models/Employee.js";

const router = express.Router();

// GET all employees
router.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET employee by ID
router.get("/employees/:eid", async (req, res) => {
  const { eid } = req.params;

  try {
    const employee = await Employee.findById(eid);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST create a new employee
router.post("/employees", async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    position,
    salary,
    date_of_joining,
    department,
  } = req.body;

  try {
    const newEmployee = new Employee({
      first_name,
      last_name,
      email,
      position,
      salary,
      date_of_joining,
      department,
    });

    await newEmployee.save();
    res.status(201).json({
      message: "Employee created successfully",
      employee_id: newEmployee._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// PUT update employee by ID
router.put("/employees/:eid", async (req, res) => {
  const { eid } = req.params;
  const {
    first_name,
    last_name,
    email,
    position,
    salary,
    date_of_joining,
    department,
  } = req.body;

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      eid,
      {
        first_name,
        last_name,
        email,
        position,
        salary,
        date_of_joining,
        department,
        updated_at: Date.now(),
      },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee details updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE employee by ID
router.delete("/employees/:eid", async (req, res) => {
  const { eid } = req.params;

  try {
    const deletedEmployee = await Employee.findByIdAndDelete(eid);
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
