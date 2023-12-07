import styled from "styled-components/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import RNDateTimePicker from "@react-native-community/datetimepicker";

export const InputTimeExpo = styled(RNDateTimePicker)`
  width: 90%;
  height: ${wp(11.5)}px;
  background: #ffffff;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 5px;
`;
