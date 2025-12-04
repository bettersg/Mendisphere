import React from 'react';
import { Box, Typography, Card, CardContent, Chip, Stack } from '@mui/material';
import { Organisation } from "../../data/Model/Organisation";
import { VerificationStatus } from "../../data/Enums/verification-status.enum";
import { IPCStatus } from "../../data/Enums/ipc-status.enum";
import { Search as SearchIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';

// person icon
const PersonIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 0a6 6 0 1 0 0 12A6 6 0 0 0 6 0ZM3.042 9.768C3.3 9.228 4.872 8.7 6 8.7c1.128 0 2.7.528 2.958 1.068A4.736 4.736 0 0 1 6 10.8a4.736 4.736 0 0 1-2.958-1.032Zm6.774-.87C8.958 7.854 6.876 7.5 6 7.5c-.876 0-2.958.354-3.816 1.398A4.757 4.757 0 0 1 1.2 6c0-2.646 2.154-4.8 4.8-4.8s4.8 2.154 4.8 4.8c0 1.092-.372 2.1-.984 2.898ZM6 2.4c-1.164 0-2.1.936-2.1 2.1 0 1.164.936 2.1 2.1 2.1 1.164 0 2.1-.936 2.1-2.1 0-1.164-.936-2.1-2.1-2.1Zm0 3a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8Z" fill="#ffffff"/>
  </svg>
);

const OrgCard: React.FC<{ org: Organisation }> = ({ org }) => {
  const bgImageProp = `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%), url(${org.cardImageUrl})`;

  return (
    <Card sx={{ height: '425px', width: '278px', position: 'relative', borderRadius: '12px', fontSize: '12px', fontStyle: 'normal', backgroundImage: bgImageProp, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* tag info */}
      <Box sx={{ position: 'absolute', width: '100%', top: '28px' }}>
        <Stack direction="column" spacing={1} alignItems="flex-end" sx={{ marginRight: '23px' }}>
          {/* support area tag */}
          <Chip icon={<SearchIcon />} label={org.mainSupportArea} sx={{ backgroundColor: 'white', borderRadius: '15px', fontWeight: '700' }} />

          {/* ipc status tag */}
          {org.ipcApproved === IPCStatus.Approved && (
            <Chip icon={<CheckCircleIcon sx={{ color: 'green.500' }} />} label="IPC Approved" sx={{ backgroundColor: 'white', borderRadius: '15px', fontWeight: '700' }} />
          )}
        </Stack>
      </Box>

      {/* descriptions and org data */}
      <CardContent sx={{ padding: 0, position: 'absolute', top: '262px', marginRight: '25px', marginLeft: '25px', color: 'white', width: "228px"}}>
        <Stack spacing={1}>
          {/* org name and verification status */}
          <Box sx={{ display: 'flex', alignItems: 'center'}}>
            <Typography variant="h6" fontWeight="700">
              {org.name}
            </Typography>
            {org.verified === VerificationStatus.Verified && (
              <CheckCircleIcon sx={{ fontSize: '15px', marginLeft: '4px' }} />
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PersonIcon />
            <Typography variant="body2" fontWeight="400" sx={{ marginLeft: '4px' }}>
              {org.mainSpecialisation}
            </Typography>
          </Box>

          <Typography variant="body2" fontWeight="200" sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
          }}>
            {org.description}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default OrgCard;
