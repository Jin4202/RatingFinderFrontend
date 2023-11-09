import { Outlet } from "react-router-dom";

export default function Layout(props) {

    return (
        <div>
            <a>-- Header --</a>

            <Outlet />
        </div>
        
    );

}