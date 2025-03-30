import React, { useState } from 'react';
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  InboxIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import MaintenanceForm from '../MaintenanceForm'; // Import the MaintenanceForm component
import TripForm from '../TripForm'; // Import the TripForm component

const TestingCom = () => {
  const [activeForm, setActiveForm] = useState(null); // 'maintenance', 'trip', or null

  const handleFormClick = (formType) => {
    setActiveForm((prevForm) => (prevForm === formType ? null : formType));
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            Sidebar
          </Typography>
        </div>
        <List>
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
          <ListItem onClick={() => handleFormClick('maintenance')} className="cursor-pointer">
            <ListItemPrefix>
              <ShoppingBagIcon className="h-5 w-5" />
            </ListItemPrefix>
            Maintenance
          </ListItem>
          <ListItem onClick={() => handleFormClick('trip')} className="cursor-pointer">
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            Trip
            <ListItemSuffix>
              <Chip size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
            </ListItemSuffix>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Profile
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Settings
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card>

      {/* Forms */}
      <div className="flex-1 p-6 overflow-auto">
        {activeForm === 'maintenance' && <MaintenanceForm />}
        {activeForm === 'trip' && <TripForm />}
      </div>
    </div>
  );
};

export default TestingCom;
