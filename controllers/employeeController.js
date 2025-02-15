data = {
    employees: require('../model/employee.json')
}

const setEmployees = (newEmployees) => { 
    data.employees = newEmployees 
}

const getAllEmployees = (req,res) => {
    res.json(data.employees)
}

const createNewEmployee = (req,res) => {
    const newEmployee = {
        id: data.employees?.length ? data.employees[data.employees.length - 1].id + 1 : 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }
    
    if(!newEmployee.firstname || !newEmployee.lastname){
        return res.status(400).json({'message': 'First and last names are required.'})
    }

    setEmployees([...data.employees, newEmployee])
    res.status(201).json(data.employees)
}

const updateEmployee = (req,res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id))
    if(!employee){
        return res.status(400).json({"message": `Employee ID ${req.body.id} not found`})
    }
    if(req.body.firstname) employee.firstname = req.body.firstname
    if(req.body.lastname) employee.lastname = req.body.lastname
    const filteredlist = data.employees.filter(emp => emp.id !== parseInt(req.body.id))
    const unsortedlist = [...filteredlist, employee]
    setEmployees(unsortedlist.sort((a,b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
    res.json(data.employees)
}

const deleteEmployee = (req,res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id))
    if(!employee){
        return res.status(400).json({"message": `Employee ID ${req.body.id} not found`})
    }
    const filteredlist = data.employees.filter(emp => emp.id !== parseInt(req.body.id))
    setEmployees([...filteredlist])
    res.json(data.employees)
}

const getEmployee = (req,res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.params.id))
    if(!employee){
        return res.status(400).json({"message": `Employee ID ${req.body.id} not found`})
    }
    res.json(employee)
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}