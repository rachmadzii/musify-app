import React, { useEffect, useState } from 'react';
import Track from '../../components/Track';
import SearchBar from '../../components/SearchBar';
import { Track as ITrack } from '../../types/spotify';
import {
  Container,
  Divider,
  Grid,
  Image,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { convertMsToHMS } from '../../utils/convertDuration';
import FormPlaylist from '../../components/FormPlaylist';
import image from '../../assets/empy-track.svg';

const CreatePlaylist: React.FC = () => {
  const [tracks, setTracks] = useState<ITrack[]>([]);
  const [selectedTrackURI, setSelectedTrackURI] = useState<string[]>([]);
  const [selectedTracks, setSelectedTracks] = useState<ITrack[]>([]);
  const [isSearch, setIsSearch] = useState<boolean>(false);

  useEffect(() => {
    if (!isSearch) {
      const selectedTracks: ITrack[] = filterSelectedTracks();

      setTracks(selectedTracks);
    }
  }, [selectedTrackURI]);

  const filterSelectedTracks: () => ITrack[] = () =>
    tracks.filter((track) => selectedTrackURI.includes(track.uri));

  const handleSuccessSearch: (searchTracks: ITrack[]) => void = (
    searchTracks
  ) => {
    setIsSearch(true);

    const selectedSearchTracks = searchTracks.filter((data: any) =>
      selectedTrackURI.includes(data.uri)
    );

    setTracks([...new Set([...selectedSearchTracks, ...searchTracks])]);
  };

  const clearSearch: () => void = () => {
    setTracks(selectedTracks);
    setIsSearch(false);
  };

  const toggleSelect: (track: ITrack) => void = (track) => {
    const { uri } = track;

    if (selectedTrackURI.includes(uri)) {
      setSelectedTrackURI(
        selectedTrackURI.filter((item: string) => item !== uri)
      );
      setSelectedTracks(
        selectedTracks.filter((item: ITrack) => item.uri !== uri)
      );
    } else {
      setSelectedTrackURI([...selectedTrackURI, uri]);
      setSelectedTracks([...selectedTracks, track]);
    }
  };

  const handleSuccessAdd: () => void = () => {
    setSelectedTrackURI([]);
    setSelectedTracks([]);
  };

  return (
    <>
      <Container
        maxW={'100%'}
        color={'#262626'}
        h={'100vh'}
        py={6}
        px={{ base: 6, lg: 20 }}
      >
        <VStack spacing={4} h={'100vh'} align={'stretch'}>
          <Stack direction={{ base: 'column', md: 'row' }}>
            <SearchBar
              onSuccess={(tracks) => handleSuccessSearch(tracks)}
              onClearSearch={clearSearch}
            />
            <FormPlaylist
              uris={selectedTrackURI}
              onSuccessAddTrack={handleSuccessAdd}
            />
          </Stack>
          <Divider orientation="horizontal" borderColor={'gray.200'} />
          {tracks.length === 0 && (
            <VStack spacing={4} justifyContent="center" flex={'1 1 100%'}>
              <Image
                src={image}
                alt={'Music Home'}
                boxSize={{ sm: '150px', md: '200px' }}
                m={0}
              />
              <Text fontSize={'lg'}>No tracks selected</Text>
            </VStack>
          )}
          <Grid
            templateColumns={'repeat(auto-fill, minmax(200px, 1fr))'}
            gap={7}
          >
            {tracks.map((track) => (
              <Track
                key={track.id}
                url={track.album.images[0].url}
                title={track.name}
                artist={track.artists[0].name}
                link_to={track.external_urls.spotify}
                duration={convertMsToHMS(track.duration_ms)}
                select={selectedTrackURI.includes(track.uri)}
                toggle={() => toggleSelect(track)}
              />
            ))}
          </Grid>
        </VStack>
      </Container>
    </>
  );
};

export default CreatePlaylist;
