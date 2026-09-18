import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  deleteEmployee
} from "../models/employee.model.js";

export const getEmployees = async (req, res) => {
  try {
    const employees = await getAllEmployees();

    res.status(200).json({
      success: true,
      data: employees
    });
  } catch (error) {
    console.error("Get employees error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch employees"
    });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await getEmployeeById(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found"
      });
    }

    res.status(200).json({
      success: true,
      data: employee
    });
  } catch (error) {
    console.error("Get employee error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch employee"
    });
  }
};

export const addEmployee = async (req, res) => {
  try {
    const { name, email, department } = req.body;

    if (!name || !email || !department) {
      return res.status(400).json({
        success: false,
        message: "Name, email and department are required"
      });
    }

    const employeeId = await createEmployee(
      name,
      email,
      department
    );

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      employeeId
    });
  } catch (error) {
    console.error("Create employee error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create employee"
    });
  }
};

export const removeEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const affectedRows = await deleteEmployee(id);

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Employee not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully"
    });
  } catch (error) {
    console.error("Delete employee error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete employee"
    });
  }
};