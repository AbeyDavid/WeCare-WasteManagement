import React, { useEffect, useState } from "react";
import { userDetails, userStatusControl } from "../../services/adminApi";
import "../../styles/AdminStyles/clientView.css";

export default function ClientsView() {
    const [allUsers, setAllUsers] = useState([]);
    const [updatedUsers, setUpdatedUser] = useState("");
    useEffect(() => {
        async function fetchData() {
            const response = await userDetails();
            setAllUsers(response.users);
        }
        fetchData();
    }, [allUsers]);
    const handleClickUserStatus = async (id) => {
        const userId = {
            id: id,
        };
        const result = await userStatusControl(userId);
        setUpdatedUser(result.updatedUser);
    };
    return (
        <div className="container bootstrap snippets bootdey">
            <h4 className="text-center mt-3">User Management</h4>
            <div className="row">
                <div className="col-lg-12">
                    <div className="main-box no-header clearfix">
                        <div className="main-box-body clearfix">
                            <div className="table-responsive">
                                <table className="table user-list">
                                    <thead>
                                        <tr>
                                            <th>
                                                <span>User</span>
                                            </th>
                                            <th>
                                                <span>Email</span>
                                            </th>
                                            <th className="text-center">
                                                <span>Status</span>
                                            </th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allUsers.map((data) => {
                                            return (
                                                <tr key={data._id}>
                                                    <td>
                                                        <img src="https://bootdey.com/img/Content/user_1.jpg" alt="" />
                                                        <a href="#" className="user-link">
                                                            {data.name}
                                                        </a>
                                                        <span className="user-subhead">Member</span>
                                                    </td>
                                                    <td>
                                                        <p>{data.email}</p>
                                                    </td>
                                                    <td className="text-center">
                                                        {data.is_blocked ? (
                                                            <span className="label label-default text-danger">Blocked</span>
                                                        ) : (
                                                            <span className="label label-default text-success">Active</span>
                                                        )}
                                                    </td>
                                                    <td style={{ width: "20%" }}>
                                                        {data.is_blocked ? (
                                                            <div className="d-flex">
                                                                <a
                                                                    href="#"
                                                                    className="table-link text-info"
                                                                    onClick={() => handleClickUserStatus(data._id)}
                                                                >
                                                                    <span className="fa-stack">
                                                                        <i className="fa fa-square fa-stack-2x"></i>
                                                                        <i className="fa fa-unlock fa-stack-1x fa-inverse"></i>
                                                                    </span>
                                                                </a>
                                                                <p className="ms-2">Unblock</p>
                                                            </div>
                                                        ) : (
                                                            <div className="d-flex">
                                                                <a
                                                                    href="#"
                                                                    className="table-link danger"
                                                                    onClick={() => handleClickUserStatus(data._id)}
                                                                >
                                                                    <span className="fa-stack">
                                                                        <i className="fa fa-square fa-stack-2x"></i>
                                                                        <i className="fa fa-ban fa-stack-1x fa-inverse"></i>
                                                                    </span>
                                                                </a>
                                                                <p className="ms-2">Block</p>
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
