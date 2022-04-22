import {
  Button,
  Container,
  Heading,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import image from '../../assets/music-home.svg';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <Container maxW={'100%'} color={'#262626'} p={8}>
      <VStack spacing={4}>
        <Image src={image} alt={'Music Home'} boxSize={'300px'} m={0} />
        <Heading as={'h3'} size={'xl'} color={'green.500'}>
          Musify App
        </Heading>
        <Text fontSize={'xl'}>Lets bring music to life.</Text>
        <Button colorScheme={'green'} rightIcon={<FiArrowRight />}>
          <Link to="/create-playlist" style={{ textDecoration: 'none' }}>
            Get Started
          </Link>
        </Button>
      </VStack>
    </Container>
  );
};

export default Home;
