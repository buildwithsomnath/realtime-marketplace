import { useEffect, useState } from "react";
import { getDashboard } from "../api/dashboard";

const Dashboard = () => {

    const [dashboard, setDashboard] = useState({});

    useEffect(() => {
        getDashboard().then((res) => setDashboard(res.data));
    }, []);

    return (
        <div>

            <h1 className="mb-6 text-3xl font-bold">
                Dashboard
            </h1>

            <pre>{JSON.stringify(dashboard, null, 2)}</pre>

        </div>
    );
};

export default Dashboard;