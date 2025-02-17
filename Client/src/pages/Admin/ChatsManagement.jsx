import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { Avatar, Stack } from "@mui/material";
import { dashboardData } from "../../components/constants/sampleData";
import { transformImage } from "../../lib/features";
import AvatarCard from "../../components/shared/AvatarCard";

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
    field: "totalMembers",
    headerName: "Total Members",
    headerClassName: "table-header",
    Width: 200,
  },
  {
    field: "members",
    headerName: "Members",
    headerClassName: "table-header",
    Width: 400,
    //     renderCell : (params) => {
    //       console.log(params.row.members)
    // return (
    //   <Avatar max={100} avatar={params.row.members} />
    // )
    //     }
    renderCell: (params) => (
      <Avatar max={100} src={params.row.members} />
    ),
  },
  {
    field: "totalMessages",
    headerName: "Total Messages",
    headerClassName: "table-header",
    Width: 150,
  },
  {
    field: "creator",
    headerName: "Created By",
    headerClassName: "table-header",
    Width: 250,
    renderCell: (params) => (
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <Avatar src={params.row.creator.avatar} />
        <span>{params.row.creator.name}</span>
      </Stack>
    ),
  },
];
const ChatsManagement = () => {
  const [rows, setRows] = useState([]);

  // const mappingData = () => {
  //   dashboardData.chats.map((data) => {
  //     // console.log(data)
  //     data.members.map((m) => {
  //       console.log(m.avatar)
  //     })
  //   })
  // }
// console.log(rows)
  useEffect(() => {
    setRows(
      dashboardData.chats.map((item) => ({
        // console.log(members)
        ...item,
        id: item._id,
        avatar: item.avatar.map((a) => transformImage(a, 50)),
        members: item.members.map((i) => transformImage(i.avatar, 50)),
        creator:{
          name : item.creator.name,
          avatar : transformImage(item.creator.avatar, 50)
        }
        
      }))
    );
    // mappingData()
  }, []);
  return (
    <AdminLayout>
      <Table columns={columns} rows={rows} heading={"All Chats"} />
    </AdminLayout>
  );
};

export default ChatsManagement;
