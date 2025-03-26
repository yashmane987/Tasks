import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

function App() {
  const [employeeList, setEmployeeList] = useState();
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    employeeId: '',
    city: '',
    state: '',
    pinCode: '',
    _id: '', // Add _id to track the employee being edited
  });

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (formData._id) {
        // If _id exists, it means we are updating an existing record
        response = await axios.put(
          `http://localhost:9090/api/update-user/${formData._id}`,
          formData
        );
      } else {
        // Otherwise, we are creating a new record
        response = await axios.post(
          'http://localhost:9090/api/create-user',
          formData
        );
      }

      if (response.data) {
        getAllEmployeeList();
        setFormData({
          firstName: '',
          middleName: '',
          lastName: '',
          contactNumber: '',
          email: '',
          employeeId: '',
          city: '',
          state: '',
          pinCode: '',
          _id: '', // Reset the _id after update
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const getAllEmployeeList = async () => {
    try {
      const response = await axios.get(
        'http://localhost:9090/api/get-all-users'
      );
      setEmployeeList(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllEmployeeList();
  }, []);

  const deleteEmployee = async (_id) => {
    try {
      const response = await axios.delete(
        `http://localhost:9090/api/delete-user/${_id}`
      );

      if (response.data) {
        alert('Employee deleted successfully');
        getAllEmployeeList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editEmployee = async (employee) => {
    try {
      // Set the form data with the employee details for editing
      setFormData({
        firstName: employee.firstName,
        middleName: employee.middleName,
        lastName: employee.lastName,
        contactNumber: employee.contactNumber,
        email: employee.email,
        employeeId: employee.employeeId,
        city: employee.city,
        state: employee.state,
        pinCode: employee.pinCode,
        _id: employee._id, // Set the _id for updating
      });
    } catch (error) {
      console.error('Error editing employee:', error);
    }
  };

  return (
    <div>
      <h2 className="text-center my-5">
        <b>CRUD - MERN Stack</b>
      </h2>

      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h3 className="text-center my-3"> Add Employee</h3>

            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleOnChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Middle Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Middle Number"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleOnChange}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Last Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Last Numbe"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleOnChange}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Contact Number"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleOnChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={formData.email}
                    onChange={handleOnChange}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Employee ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Employee ID"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleOnChange}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="City"
                    name="city"
                    value={formData.city}
                    onChange={handleOnChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="State"
                    name="state"
                    value={formData.state}
                    onChange={handleOnChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Pin Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Pin Code"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleOnChange}
                  />
                </Form.Group>
              </Row>

              <button onClick={submitForm}>Submit</button>
            </Form>
          </div>
          <div className="col-md-6">
            <h3 className="text-center my-3"> Employee List </h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>First Name</th>
                  <th>Middle Name</th>
                  <th>Last Name</th>
                  <th>Contact Number</th>
                  <th>Email Address</th>
                  <th>Employee ID</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Pin Code</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {employeeList &&
                  employeeList.map((eachRecord, index) => (
                    <tr key={index}>
                      <td> {index + 1}</td>
                      <td> {eachRecord.firstName} </td>
                      <td> {eachRecord.middleName} </td>
                      <td> {eachRecord.lastName} </td>
                      <td> {eachRecord.contactNumber} </td>
                      <td> {eachRecord.email} </td>
                      <td> {eachRecord.employeeId} </td>
                      <td> {eachRecord.city} </td>
                      <td> {eachRecord.state} </td>
                      <td> {eachRecord.pinCode} </td>
                      <td>
                        <button onClick={() => editEmployee(eachRecord)}>
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          variant="danger"
                          onClick={() => deleteEmployee(eachRecord._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;