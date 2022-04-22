import {
  IconButton,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  useColorModeValue,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { RootState, useAppDispatch, useAppSelector } from '../../store';
import { logout } from '../../store/auth';
import React from 'react';

const UserDropdown: React.FC = () => {
  const dispatch = useAppDispatch();

  const userName: string | undefined = useAppSelector(
    (state: RootState) => state.auth.user?.display_name
  );
  const userImage: string | undefined = useAppSelector(
    (state: RootState) => state.auth.user?.images[0]?.url
  );

  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={IconButton}
        variant={'ghost'}
        aria-label={'user-dropdown'}
        leftIcon={<ChevronDownIcon ml={2} />}
        display={'flex'}
      >
        <Avatar name={userName} src={userImage} size={'sm'} mr={2} />
      </MenuButton>
      <MenuList border={'none'}>
        <MenuGroup title={'Hello, ' + userName}>
          <MenuItem
            color={useColorModeValue('red', 'red.600')}
            icon={<RiLogoutBoxRLine />}
            onClick={() => dispatch(logout())}
          >
            Logout
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export default UserDropdown;
