import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    Width: 300,
  },
  {
    field: "attachments",
    headerName: "Attachments",
    headerClassName: "table-header",
    Width: 250,
    renderCell: (params) => (
      <Avatar alt={params.row.name} src={params.row.avatar} />
    ),
  },
  {
    field: "content",
    headerName: "Content",
    headerClassName: "table-header",
    Width: 400,
  },
  {
    field: "sender",
    headerName: "Send By",
    headerClassName: "table-header",
    Width: 250,
    renderCell: (params) => (
      <Stack>
        <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
        <span> {params.row.sender.name}</span>
      </Stack>
    ),
  },
  {
    field: "chat",
    headerName: "Chat",
    headerClassName: "table-header",
    Width: 350,
  },

  {
    field: "groupChat",
    headerName: "Group Chat",
    headerClassName: "table-header",
    Width: 200,
  },
  {
    field: "createdAt",
    headerName: "Time",
    headerClassName: "table-header",
    Width: 250,
  },
];

const MessagesManagement = () => {
  return (
    <AdminLayout>
      <div>MessagesManagement</div>
    </AdminLayout>
  );
};

export default MessagesManagement;
