import {
  Button,
  Divider,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { CoffeeBeanIcon } from '@src/components/CoffeeBean/CoffeeBean';
import { IconBadge } from '@src/components/IconBadge/IconBadge';
import { useState } from 'react';
import { BiCoffee } from 'react-icons/bi';

export interface FilterStates {
  oneCup: boolean;
  twoCup: boolean;
  lightRoast: boolean;
  mediumRoast: boolean;
  darkRoast: boolean;
}

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (boxStates: any) => void;
  initialStates: FilterStates;
}

export function SearchModal({
  isOpen,
  onClose,
  onSave,
  initialStates,
}: SearchModalProps) {
  const [filterStates, setFilterStates] = useState<FilterStates>(initialStates);

  const handleFilterToggle = (filterName: keyof FilterStates) => {
    setFilterStates((prevFilterStates) => ({
      ...prevFilterStates,
      [filterName]: !prevFilterStates[filterName],
    }));
  };

  const handleOnClose = () => {
    onSave(filterStates);
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={handleOnClose}>
      <ModalOverlay bg='whiteAlpha.300' backdropFilter='blur(10px)' />
      <ModalContent
        rounded={'sm'}
        overflow={'hidden'}
        bg='white'
        border={'1px'}
        borderColor={'brown.900'}
        boxShadow={`4px 4px 0 var(--chakra-colors-brown-900)`}
      >
        <ModalHeader>Filters</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Heading size={'md'} pb={3}>
            Brew Size
          </Heading>
          <IconBadge
            text='1-cup'
            icon={BiCoffee}
            color='brown.900'
            animateOnActive
            isActive={filterStates.oneCup}
            onClick={() => handleFilterToggle('oneCup')}
          />
          <IconBadge
            text='2-cup'
            icon={BiCoffee}
            color='brown.900'
            animateOnActive
            isActive={filterStates.twoCup}
            onClick={() => handleFilterToggle('twoCup')}
          />
          <Divider pb={2} mb={3}></Divider>
          <Heading size={'md'} pb={3}>
            Recommended Roast
          </Heading>
          <IconBadge
            text='Light'
            icon={CoffeeBeanIcon}
            color='#DDB58B'
            animateOnActive
            isActive={filterStates.lightRoast}
            onClick={() => handleFilterToggle('lightRoast')}
          />
          <IconBadge
            text='Medium'
            icon={CoffeeBeanIcon}
            color='#8B5742'
            animateOnActive
            isActive={filterStates.mediumRoast}
            onClick={() => handleFilterToggle('mediumRoast')}
          />
          <IconBadge
            text='Dark'
            icon={CoffeeBeanIcon}
            color='#3F2E2E'
            animateOnActive
            isActive={filterStates.darkRoast}
            onClick={() => handleFilterToggle('darkRoast')}
          />
        </ModalBody>

        <ModalFooter>
          <Button variant='outline' colorScheme='navy' mr={3}>
            Reset
          </Button>
          <Button colorScheme='navy' onClick={handleOnClose}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
