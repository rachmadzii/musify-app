import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { RootState, useAppSelector } from '../../store';
import { addTracksToPlaylist, createPlaylist } from '../../utils/fetchAPI';
import { MdAdd } from 'react-icons/md';

interface IProps {
  uris: string[];
  onSuccessAddTrack: () => void;
}

interface IFormState {
  title: string;
  description: string;
}

const FormPlaylist: React.FC<IProps> = ({ uris, onSuccessAddTrack }) => {
  const [playlist, setPlaylist] = useState<IFormState>({
    title: '',
    description: '',
  });
  const [errorInput, setErrorInput] = useState<IFormState>({
    title: '',
    description: '',
  });

  const accessToken: string = useAppSelector(
    (state: RootState) => state.auth.accessToken
  );
  const userId: string | undefined = useAppSelector(
    (state: RootState) => state.auth.user?.id
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLTextAreaElement;
    const { name, value } = target;

    setPlaylist({ ...playlist, [name]: value });
    setErrorInput({ ...errorInput, [name]: '' });
  };

  const validateForm: () => boolean = () => {
    let isError: boolean = false;

    if (playlist.title.length < 10) {
      setErrorInput({
        ...errorInput,
        title: 'Title must be at least 10 characters long',
      });
      isError = true;
    }

    if (playlist.description.length > 100) {
      setErrorInput({
        ...errorInput,
        description: 'Description must be less than 100 characters long',
      });
      isError = true;
    }

    return isError;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      if (uris.length > 0) {
        try {
          const responsePlaylist = await createPlaylist(accessToken, userId, {
            name: playlist.title,
            description: playlist.description,
          });

          await addTracksToPlaylist(accessToken, responsePlaylist.id, uris);

          setPlaylist({
            title: '',
            description: '',
          });

          alert('Playlist created successfully!');
          onClose();
          onSuccessAddTrack();
        } catch (e) {
          alert(e);
        }
      } else {
        alert('Please select at least one track');
      }
    }
  };

  return (
    <>
      <Button
        colorScheme={'green'}
        leftIcon={<MdAdd />}
        onClick={onOpen}
        px={7}
      >
        Create Playlist
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent m={3}>
          <ModalHeader>Create Playlist</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack onSubmit={handleSubmit} align={'flex-start'}>
              <FormControl isRequired isInvalid={errorInput.title.length > 0}>
                <FormLabel htmlFor={'title-playlist'}>Title</FormLabel>
                <Input
                  type={'text'}
                  id={'title-playlist'}
                  name={'title'}
                  value={playlist.title}
                  onChange={handleChange}
                  aria-label={'input-title'}
                  placeholder={'Your playlist title'}
                  size={'md'}
                />
                {errorInput.title ? (
                  <FormErrorMessage>{errorInput.title}</FormErrorMessage>
                ) : (
                  <FormHelperText>Minimum 10 characters</FormHelperText>
                )}
              </FormControl>
              <FormControl
                isRequired
                isInvalid={errorInput.description.length > 0}
              >
                <FormLabel htmlFor={'desc-playlist'} mt={6}>
                  Description
                </FormLabel>
                <Textarea
                  id={'desc-playlist'}
                  name={'description'}
                  value={playlist.description}
                  onChange={handleChange}
                  placeholder={'Playlist description'}
                  aria-label={'input-description'}
                />
                {errorInput.description ? (
                  <FormErrorMessage>{errorInput.description}</FormErrorMessage>
                ) : (
                  <FormHelperText>Maximum 100 characters</FormHelperText>
                )}
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant={'ghost'} onClick={onClose} mr={3}>
              Close
            </Button>
            <Button colorScheme={'green'} onClick={handleSubmit}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FormPlaylist;
