import React from "react";
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/FontAwesome";
import Icon3 from "react-native-vector-icons/Fontisto";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useAutenticacaoContext } from "../contexts/autenticacao";

type propsCardEvent = {
  title: string | undefined;
  dateRest: string | undefined;
  data: string | undefined;
  people: string | undefined | number;
  onPress?: (event: GestureResponderEvent) => void;
  onPressIcon?: (event: GestureResponderEvent) => void;
};

type propCardEmpty = {
  children?: any;
  onPress?: (event: GestureResponderEvent) => void;
  onPressIcon?: (event: GestureResponderEvent) => void;
  iconActive?: boolean;
  titleCarde: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  styleCard?: React.CSSProperties | {};
  visible?: boolean;
};

const EventCard: React.FC<propsCardEvent> = (props) => {
  const { theme } = useAutenticacaoContext();
  return (
    <View style={styles.conteiner}>
      <View style={styles.topCard}>
        <Text style={[styles.tituloTopCard, { color: theme.tituloColor }]}>Evento Atual</Text>
        <TouchableOpacity onPress={props.onPressIcon}>
          <Icon name="pluscircleo" color="#979797" size={wp(8)} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={props.onPress} style={[styles.card, { backgroundColor: theme.itemColor }]}>
        <View>
          <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.tituloCard, { color: theme.textComun }]}>
            {props.title}
          </Text>
        </View>
        <View style={styles.centerCard}>
          <Text style={[styles.tituloMeio, { color: theme.textComun }]}>Faltam {props.dateRest}</Text>
        </View>
        <View style={styles.cardGridBotton}>
          <View style={styles.liner}>
            <Icon2 name="calendar-check-o" color={theme.iconColor} size={wp(6)} />
            <Text style={[styles.tituloCardBottom, { color: theme.textComun }]}>{props.data}</Text>
          </View>
          <View style={styles.liner}>
            <Icon3 name="persons" color={theme.iconColor} size={wp(6)} />
            <Text style={[styles.tituloCardBottom, { color: theme.textComun }]}>{props.people}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const EventCardEmpty: React.FC<propCardEmpty> = (props) => {
  const { theme } = useAutenticacaoContext();

  return (
    <View style={[styles.conteiner]}>
      <View style={[styles.topCard]}>
        <Text style={[styles.tituloTopCard, { opacity: props.visible ? 1 : 0.5, color: theme.tituloColor }]}>
          {props.titleCarde}
        </Text>
        {props.iconActive ? (
          <TouchableOpacity onPress={props.onPressIcon}>
            <Icon name="pluscircleo" color={theme.iconColor} size={wp(8)} />
          </TouchableOpacity>
        ) : null}
      </View>
      <TouchableOpacity disabled={!props.visible} onPress={props.onPress} style={[styles.card, props.styleCard]}>
        {props.children}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  conteiner: {
    width: "90%",
    marginBottom: 10,
  },
  topCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tituloTopCard: {
    fontSize: wp(5),
    fontFamily: "Roboto_900Black",
    color: "#fff",
  },
  card: {
    marginTop: 8,
    width: "100%",
    height: wp(40),
    backgroundColor: "#343434",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    borderRadius: 5,
    elevation: 3,
  },
  tituloCard: {
    textAlign: "center",
    fontSize: wp(6),
    fontFamily: "Roboto_900Black",
    color: "#fff",
    // textShadowColor: '#979797',
    // textShadowOffset: {width: 0.5, height: 0.5},
    // textShadowRadius: 1,
  },
  tituloMeio: {
    textAlign: "center",
    fontSize: wp(8),
    fontFamily: "Roboto_900Black",
    color: "#fff",
  },
  centerCard: {
    flex: 1,
    justifyContent: "center",
  },
  tituloCardBottom: {
    textAlign: "center",
    fontSize: wp(5),
    fontFamily: "Roboto_900Black",
    color: "#fff",
    marginLeft: 6,
  },
  cardGridBotton: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  liner: {
    flexDirection: "row",
    margin: 8,
  },
});

export { EventCard, EventCardEmpty };
