import styled from "styled-components/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import MapView from "react-native-maps";

//..
export const Map = styled(MapView)`
  width: ${wp(90)}px;
  height: ${wp(60)}px;
  justify-content: center;
  align-items: center;
  justify-content: flex-end;
`;
