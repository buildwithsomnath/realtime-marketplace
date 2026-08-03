import { useEffect, useState } from "react";
import { getProfile } from "../api/auth";

const Profile = () => {

    const [user, setUser] = useState({});

    useEffect(() => {
        getProfile().then((res) => setUser(res.data));
    }, []);

    return (
        <div>

            <h1 className="mb-5 text-3xl font-bold">
                Profile
            </h1>

            <p>Username : {user.username}</p>

            <p>Email : {user.email}</p>

        </div>
    );
};

export default Profile;