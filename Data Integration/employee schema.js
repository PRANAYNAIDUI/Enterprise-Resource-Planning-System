// Add timestamps to employee schema
const employeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    department: String,
    salary: Number,
    updatedAt: Date
});

// Example of conflict resolution
async function updateEmployeeSalary(employeeId, newSalary) {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
        throw new Error('Employee not found');
    }

    // Check if the record has been updated since last fetch
    if (employee.updatedAt > new Date(req.body.lastUpdatedAt)) {
        throw new Error('Another update has occurred. Please refresh and try again.');
    }

    // Proceed with update
    employee.salary = newSalary;
    employee.updatedAt = new Date();
    await employee.save();
}
