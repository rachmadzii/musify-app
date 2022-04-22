import React, { useState } from 'react';
import { RootState, useAppSelector } from '../../store';
import { searchTrack } from '../../utils/fetchAPI';
import { Track as ITrack } from '../../types/spotify';
import { Button, HStack, IconButton, Input } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { HiTrash } from 'react-icons/hi';

interface IProps {
  onSuccess: (tracks: ITrack[]) => void;
  onClearSearch: () => void;
}

const SearchBar: React.FC<IProps> = ({ onSuccess, onClearSearch }) => {
  const [text, setText] = useState<string>('');
  const accessToken: string = useAppSelector(
    (state: RootState) => state.auth.accessToken
  );

  const handleInput = (e: React.ChangeEvent) => {
    const target = e.target as HTMLTextAreaElement;
    setText(target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (text === '') {
      alert('Please enter a search query');
    } else {
      try {
        const responseSearch = await searchTrack(text, accessToken);
        const tracks = responseSearch.tracks.items;

        onSuccess(tracks);
      } catch (e) {
        alert(e);
      }
    }
  };

  const clearSearch: () => void = () => {
    setText('');
    onClearSearch();
  };

  return (
    <HStack as={'form'} w={'100%'} onSubmit={handleSubmit}>
      <Input
        placeholder={'Search tracks...'}
        type={'text'}
        name={'query'}
        aria-label={'search-input'}
        onChange={handleInput}
        value={text}
      />
      <IconButton
        icon={<FaSearch />}
        onClick={handleSubmit}
        aria-label={'search-button'}
      />
      <Button
        variant={'outline'}
        colorScheme={'green'}
        leftIcon={<HiTrash />}
        onClick={clearSearch}
        px={{ base: 7, md: 5 }}
      >
        Clear
      </Button>
    </HStack>
  );
};

export default SearchBar;
