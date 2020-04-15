import { Button, Layout, Text, Input, Icon } from "@ui-kitten/components";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Image } from "react-native";

export const LoginScreen = ({ toggleSetLoggedIn }) => {
  const [value, setValue] = React.useState("");
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const onIconPress = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = style => (
    <Icon {...style} name={secureTextEntry ? "eye-off" : "eye"} />
  );

  return (
    <Layout style={{ flex: 1, justifyContent: "center" }}>
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, justifyContent: "center" }}>
        <Layout style={{ margin: 20 }}>
          <Image source={require("../assets/logo_half.png")} resizeMode="cover" style={{marginBottom: 20, alignSelf: "center"}}/>
          <Text category="h1" style={{ alignSelf: "center", marginBottom: 20 }}>
            Login
          </Text>
          <Input
            style={style.inputSpacing}
            label="Email Address"
            placeholder="john.smith@mail.com"
            size="large"
          />
          <Input
            value={value}
            label="Password"
            placeholder="********"
            icon={renderIcon}
            secureTextEntry={secureTextEntry}
            onIconPress={onIconPress}
            onChangeText={setValue}
            style={style.inputSpacing}
            size="large"
          />
          <Button onPress={toggleSetLoggedIn} size="giant">
            Login
          </Button>
        </Layout>
      </KeyboardAwareScrollView>
    </Layout>
  );
};

const style = {
  inputSpacing: {
    marginBottom: 10
  }
};
