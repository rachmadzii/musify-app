import { Box, Heading, HStack } from '@chakra-ui/react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import UserDropdown from '../UserDropdown';

const NavigationBar: React.FC = () => {
  return (
    <Box as={'nav'} py={4} px={6} h={'100%'}>
      <HStack justify={'space-between'}>
        <Box>
          <HStack spacing={'24px'}>
            <Heading as={'h3'} size={'lg'}>
              Musify
            </Heading>
            <Box>
              <NavLink
                to="/home"
                className={'link'}
                style={{ fontWeight: 600 }}
              >
                Home
              </NavLink>
            </Box>
            <Box>
              <NavLink
                to="/create-playlist"
                className={'link'}
                style={{ fontWeight: 600 }}
              >
                Create Playlist
              </NavLink>
            </Box>
          </HStack>
        </Box>
        <Box>
          <UserDropdown />
        </Box>
      </HStack>
    </Box>
  );
};

export default NavigationBar;
