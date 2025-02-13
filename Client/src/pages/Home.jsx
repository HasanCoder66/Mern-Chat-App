import React from 'react'
import AppLayout from '../components/layout/AppLayout'
import { Box, Typography } from '@mui/material'

const Home = () => {
  return (
    <Box sx={{
      bgcolor:"rgba(0,0,0,0.1)",
      height:"calc(100vh - 4rem)"
    }}>
      <Typography textAlign={"center"} variant='h4' p={2}>
      Select a frient to Chat!
    </Typography>
    </Box>
  )
}

export default AppLayout()(Home)