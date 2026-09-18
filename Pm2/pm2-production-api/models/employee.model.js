import pool from "../config/db.js";

export const getAllEmployees = async () => {
  const [rows] = await pool.query(
    "SELECT * FROM employees ORDER BY id DESC"
  );

  return rows;
};

export const getEmployeeById = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM employees WHERE id = ?",
    [id]
  );

  return rows[0];
};

export const createEmployee = async (name, email, department) => {
  const [result] = await pool.query(
    `INSERT INTO employees (name, email, department)
     VALUES (?, ?, ?)`,
    [name, email, department]
  );

  return result.insertId;
};

export const deleteEmployee = async (id) => {
  const [result] = await pool.query(
    "DELETE FROM employees WHERE id = ?",
    [id]
  );

  return result.affectedRows;
};