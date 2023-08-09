'use client';
// Chakra imports
import { Flex, useColorModeValue } from '@chakra-ui/react';

import { HorizonLogo } from '@/components/icons/Icons';
import { HSeparator } from '@/components/separator/Separator';
import Link from 'next/link'

export function SidebarBrand() {
    //   Chakra color mode
    let logoColor = useColorModeValue('navy.700', 'white');

    return (
        <Flex alignItems="center" flexDirection="column">
            <Link href="/">
                <HorizonLogo h="26px" w="180px" my="30px" color={logoColor} />
            </Link>
            <HSeparator mb="20px" w="284px" />
        </Flex>
    );
}

export default SidebarBrand;
