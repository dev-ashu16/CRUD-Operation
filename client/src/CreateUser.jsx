import { useState } from "react";
import axios from 'axios';   
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function CreateUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const navigate = useNavigate();
    const showToast = (message, type) => {
        return new Promise((resolve) => {
            toast[type](message, {
                position: "top-right",
                onClose: () => resolve()  // Resolve promise when toast closes
            });
        });
    };

    const Submit = async (e) => {
        e.preventDefault();
         // Basic validation on the client side
    if (!name || !email || !age) {
        toast.error('All fields are required!', { position: "top-right" });
        return;
    }
        try {
            const result = await axios.post('http://localhost:3001/createUser', { name, email, age });
            console.log(result);
            
            // Show success toast and wait until it is closed
            await showToast('User created successfully!', 'success');

            // Navigate to the homepage after toast is displayed
            navigate('/');
        } catch (err) {
            console.log(err);
            // Show error toast and wait until it is closed
            await showToast('Failed to create user. Please try again.', 'error');
        } finally {
            // Clear input fields
            setName('');
            setEmail('');
            setAge('');
        }
    };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={Submit}>
          <h2>Add User</h2>
          <div className="mb-2">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter Name"
              value={name} 
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              value={email}  
              id="email"
              placeholder="Enter Email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="age" className="form-label">
              Age
            </label>
            <input
              type="number"
              id="age"
              value={age}  
              placeholder="Enter Age"
              className="form-control"
              onChange ={(e) => setAge(e.target.value)}
            />
          </div>
          <button className="btn btn-success">Submit</button>
        </form>
      </div>
      {/* Toast Container to display notifications */}
      <ToastContainer />
    </div>
  );
}

export default CreateUser;
