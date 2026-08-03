import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const submit = async (e) => {
        e.preventDefault();

        await login(form);

        navigate("/dashboard");
    };

    return (
        <form onSubmit={submit} className="mx-auto max-w-md space-y-4">

            <input
                className="w-full border p-2"
                placeholder="Username"
                onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                }
            />

            <input
                type="password"
                className="w-full border p-2"
                placeholder="Password"
                onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                }
            />

            <button className="w-full rounded bg-blue-600 p-2 text-white">
                Login
            </button>

        </form>
    );
};

export default Login;