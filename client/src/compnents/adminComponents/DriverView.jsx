import React, { useEffect, useState } from "react";
import { getDrivers } from "../../services/adminApi";
import "../../styles/AdminStyles/driverView.css";
export default function DriverView() {
    const [driverData, setDriverData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const result = await getDrivers();
            setDriverData(result.driverData);
        }
        fetchData();
    }, []);
    console.log(driverData);
    return (
        <div>
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title text-uppercase text-center text-black">Manage Users</h5>
                            </div>
                            <div class="table-responsive">
                                <table class="table no-wrap user-table mb-0">
                                    <thead>
                                        <tr>
                                            <th scope="col" class="border-0 text-uppercase font-medium pl-4">
                                                #
                                            </th>
                                            <th scope="col" class="border-0 text-uppercase font-medium">
                                                Name
                                            </th>
                                            <th scope="col" class="border-0 text-uppercase font-medium">
                                                Route
                                            </th>
                                            <th scope="col" class="border-0 text-uppercase font-medium">
                                                Email
                                            </th>

                                            <th scope="col" class="border-0 text-uppercase font-medium">
                                                Status
                                            </th>
                                            <th scope="col" class="border-0 text-uppercase font-medium">
                                                Manage
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {driverData.map((data,index) => {
                                            return (
                                                <tr>
                                                    <td class="pl-4">{index+1}</td>
                                                    <td>
                                                        <h5 class="font-medium mb-0">{data.name}</h5>
                                                        <span>Age:{data.age}</span>
                                                    </td>
                                                    <td>
                                                        <span>Not Assigned</span>
                                                        <br />
                                                    </td>
                                                    <td>
                                                        <span>{data.email}</span>
                                                        <br />
                                                        <span>{data.phone}</span>
                                                    </td>

                                                    <td>
                                                        <select
                                                            class="form-control category-select"
                                                            id="exampleFormControlSelect1"
                                                        >
                                                            <option>{data.status}</option>
                                                            <option>Blocked</option>
                                                            <option>Pending</option>
                                                            <option>Rejected</option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            class="btn btn-outline-info btn-circle btn-lg btn-circle"
                                                        >
                                                            <i class="fa fa-key"></i>{" "}
                                                        </button>
                                                        <button
                                                            type="button"
                                                            class="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"
                                                        >
                                                            <i class="fa fa-trash"></i>{" "}
                                                        </button>
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
