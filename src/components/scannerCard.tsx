import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useAutenticacaoContext } from "../contexts/autenticacao";

type props = {
  img: string;
  name: string;
  status: boolean;
};
const imgLink =
  "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";
const ScannerCard: React.FC<props> = ({ img, name, status }) => {
  const { theme } = useAutenticacaoContext();
  return (
    <View style={[styles.container, { backgroundColor: theme.itemColor }]}>
      <View style={styles.containerprofile}>
        <Image style={styles.img} resizeMode="cover" source={{ uri: img == "" ? imgLink : img }} />
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.nameProfile}>
          {name}
        </Text>
      </View>
      {status ? (
        <View style={styles.containerInfo}>
          <Text style={[styles.textinfo, { color: theme.statusColors?.positive }]}>Autorizado</Text>
          <Icon name="user-check" color={theme.statusColors?.positive} size={wp(20)} />
        </View>
      ) : (
        <View style={styles.containerInfo}>
          <Text style={[styles.textinfoNegative, { color: theme.statusColors?.negative }]}>Não Autorizado</Text>
          <Icon name="user-check" color={theme.statusColors?.negative} size={wp(20)} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: hp(60),
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  img: {
    width: wp(15),
    height: wp(15),
    backgroundColor: "red",
    borderRadius: 50,
    margin: 10,
  },
  containerprofile: {
    flexDirection: "row",
    alignItems: "center",
  },
  nameProfile: {
    color: "#AAA0A0",
    fontSize: wp(5),
    flex: 1,
    fontWeight: "bold",
  },
  containerInfo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textinfo: {
    fontSize: wp(10),
    fontWeight: "bold",
    color: "#11DF95",
  },
  textinfoNegative: {
    fontSize: wp(10),
    fontWeight: "bold",
    color: "#FF6B6B",
  },
});

export default ScannerCard;
