import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateUser() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const navigate = useNavigate();

    // Fetch existing user data
    useEffect(() => {
        axios
            .get(`http://localhost:3001/getUser/` + id)
            .then((result) => {
                console.log(result.data);
                setName(result.data.name);
                setEmail(result.data.email);
                setAge(result.data.age);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const showToast = (message, type) => {
        return new Promise((resolve) => {
            toast[type](message, {
                position: "top-right",
                onClose: () => resolve()  // Resolve promise when toast closes
            });
        });
    };

    // Asynchronous function for updating the user
    const Update = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.put('http://localhost:3001/updateUser/' + id, { name, email, age });
            console.log(result);

            // Show success toast and wait until it is closed
            await showToast('User updated successfully!', 'success');

            // Navigate to the homepage after toast is displayed
            navigate('/');
        } catch (err) {
            console.log(err);
            // Show error toast and wait until it is closed
            await showToast('Failed to update user. Please try again.', 'error');
        }
    };

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={Update}>
                    <h2>Update User</h2>
                    <div className="mb-2">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            value={name}
                            id="name"
                            placeholder="Enter Name"
                            className="form-control"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="form-label">Email</label>
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
                        <label htmlFor="age" className="form-label">Age</label>
                        <input
                            type="number"
                            value={age}
                            id="age"
                            placeholder="Enter Age"
                            onChange={(e) => setAge(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <button className="btn btn-success">Update</button>
                </form>
            </div>

            {/* ToastContainer for displaying toast notifications */}
            <ToastContainer />
        </div>
    );
}

export default UpdateUser;
