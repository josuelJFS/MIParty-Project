import React from "react";
import { Box, Button, Center, Flex, Icon, Input, Text, Divider } from "native-base";
import { GestureResponderEvent, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type props = {
  titulo: string;
  data: string;
  titleButao: string;
  codigo: string;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  buttonColor?: string;
};

const ListEvent: React.FC<props> = ({ data, titleButao, titulo, codigo, onPress, buttonColor = "tertiary.500" }) => {
  return (
    <Box shadow="1" bgColor="muted.50" w="100%" h="85px" mb={4}>
      <Flex flex={1.5} pr={2} pl={2} direction="row">
        <Box flex={2} m={1.5}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            fontWeight="bold"
            fontFamily="Roboto_400Regular"
            fontSize="13"
            color="muted.500"
          >
            {titulo}
          </Text>
        </Box>
        <Center flex={1} m={1.5}>
          <Text fontWeight="bold" fontFamily="Roboto_400Regular" fontSize="12" color="muted.500">
            {data}
          </Text>
        </Center>
      </Flex>
      <Divider />
      <Box flexDirection="row" pr={2} pl={2} flex={2}>
        <Center flex={1.5}>
          <Input
            borderColor="#fff"
            bg="muted.200"
            fontFamily="Roboto_400Regular"
            isDisabled={true}
            placeholder={codigo}
            size="xl"
            fontSize="14"
          />
        </Center>
        <Center flex={1}>
          <Button size="md" bg={buttonColor} onPress={onPress}>
            {titleButao}
          </Button>
        </Center>
      </Box>
    </Box>
  );
};

export default ListEvent;
