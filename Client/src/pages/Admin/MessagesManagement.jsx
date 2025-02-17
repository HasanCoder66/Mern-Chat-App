import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { dashboardData } from "../../components/constants/sampleData";
import { fileFormat, transformImage } from "../../lib/features";
import moment from "moment";
import { Avatar, Box, Stack } from "@mui/material";
import RenderAttachment from "../../components/shared/RenderAttatchment";
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
    renderCell: (params) => {
      const { attachments } = params.row;

      return attachments?.length > 0
        ? attachments.map((i) => {
            const url = i.url;
            const file = fileFormat(url);

            return (
              <Box>
                <a
                  href={url}
                  download
                  target="_blank"
                  style={{
                    color: "black",
                  }}
                >
                  {RenderAttachment(file, url)}
                </a>
              </Box>
            );
          })
        : "No Attachments";
    },
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
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
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
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(
      dashboardData.messages.map((item) => ({
        ...item,
        id: item._id,
        sender: {
          name: item.sender.name,
          avatar: transformImage(item.sender.avatar, 50),
          createdAt: moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
        },
      }))
    );
  }, []);
  return (
    <AdminLayout>
      <Table rows={rows} columns={columns} heading={"All Messages"} rowHeight={200}/>
    </AdminLayout>
  );
};

export default MessagesManagement;
