import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { Avatar } from "@mui/material";
import { dashboardData } from "../../components/constants/sampleData";
import { transformImage } from "../../lib/features";
const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    Width: 300,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    Width: 250,
    renderCell: (params) => (
      <Avatar alt={params.row.name} src={params.row.avatar} />
    ),
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    Width: 300,
  },
  {
    field: "username",
    headerName: "Username",
    headerClassName: "table-header",
    Width: 300,
  },
  {
    field: "friends",
    headerName: "Friends",
    headerClassName: "table-header",
    Width: 250,
  },
  {
    field: "groups",
    headerName: "Groups",
    headerClassName: "table-header",
    Width: 300,
  },
];
const UserManagement = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(
      dashboardData.user.map((item) => ({
        ...item,
        id: item._id,
        avatar: transformImage(item.avatar, 50),
      }))
    );
  }, []);
  return (
    <AdminLayout>
      <Table columns={columns} rows={rows} heading={"All Users"} />
    </AdminLayout>
  );
};

export default UserManagement;
