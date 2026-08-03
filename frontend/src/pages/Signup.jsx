import { useState } from "react";
import { signup } from "../api/auth";

const Signup = () => {

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const submit = async (e) => {
        e.preventDefault();

        await signup(form);

        alert("Account created.");
    };

    return (
        <form onSubmit={submit} className="mx-auto max-w-md space-y-4">

            <input
                placeholder="Username"
                className="w-full border p-2"
                onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                }
            />

            <input
                placeholder="Email"
                className="w-full border p-2"
                onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                }
            />

            <input
                type="password"
                placeholder="Password"
                className="w-full border p-2"
                onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                }
            />

            <button className="w-full rounded bg-blue-600 p-2 text-white">
                Sign Up
            </button>

        </form>
    );
};

export default Signup;