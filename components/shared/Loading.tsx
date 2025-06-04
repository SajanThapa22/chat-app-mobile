import { View } from "react-native";
import LottieView from "lottie-react-native";
import { loading } from "@/assets/images";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Loading = () => {
  return (
    <View style={{ aspectRatio: 1, width: hp(6.5) }}>
      <LottieView style={{ flex: 1 }} source={loading} autoPlay loop />
    </View>
  );
};

export default Loading;

// const styles = StyleSheet.create({});
