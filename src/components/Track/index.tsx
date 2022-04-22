import {
  Button,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';

interface IProps {
  url: string;
  title: string;
  artist: string;
  select: boolean;
  link_to: string;
  duration: string;
  toggle: () => void;
}

const Track: React.FC<IProps> = ({
  url,
  title,
  artist,
  link_to,
  duration,
  select,
  toggle,
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(select);

  const handleSelect: () => void = () => {
    setIsSelected(!isSelected);
    toggle();
  };

  return (
    <LinkBox bg={'gray.100'} w={'100%'} p={3} rounded={8}>
      <VStack align={'flex-start'} overflow={'hidden'}>
        <LinkOverlay href={link_to} target={'_blank'}>
          <Image src={url} alt={title} rounded={8} aria-label={'image-track'} />
        </LinkOverlay>
        <VStack py={4} align={'flex-start'}>
          <Heading
            as={'h5'}
            size={'sm'}
            aria-label={'title-track'}
            noOfLines={1}
          >
            {title}
          </Heading>
          <Text fontSize={'md'} color={'gray.700'} aria-label={'artist-track'}>
            {artist}
          </Text>
          <Text
            fontSize={'sm'}
            color={'gray.500'}
            aria-label={'duration-track'}
          >
            {duration}
          </Text>
        </VStack>
        <Button
          _hover={{ bg: `${isSelected ? 'green.600' : 'green.50'}` }}
          w={'100%'}
          border={'1px'}
          borderColor={'green'}
          onClick={handleSelect}
          aria-label={'button-track'}
          bg={`${isSelected ? 'green' : 'white'}`}
          color={`${isSelected ? 'white' : 'green'}`}
        >
          {isSelected ? 'Deselect' : 'Select'}
        </Button>
      </VStack>
    </LinkBox>
  );
};

export default Track;
