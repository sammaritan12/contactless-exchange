import { Button, Input, Layout, Spinner, Text, Icon } from "@ui-kitten/components";
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const updateDetailRequest = async (
  name,
  number,
  address,
  plateNo,
  setSpinner
) => {
  setSpinner(true);
  await fetch(
    "https://mbxtdomfob.execute-api.ap-southeast-2.amazonaws.com/default/editHTMLDetails",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        number: number,
        address: address,
        plateNo: plateNo,
      })
    }
  );

  setSpinner(false);
};

const renderCaptionIcon = (style, length) => <Icon {...style} name={ length === 9 ? "checkmark-outline" : "close-outline"}/>;

export const UpdateDetailsScreen = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [plateNo, setPlaceNo] = useState("");
  const [licenseNo, setLicenseNo] = useState("");
  const [spinner, setSpinner] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, alignContent: "stretch" }}>
        <KeyboardAwareScrollView>
          <Text style={{ alignSelf: "center", marginTop: 20 }} category="h1">
            Update Details
          </Text>
          <ScrollView style={{ margin: 20 }}>
            <Input
              style={style.inputSpacing}
              label="Full Name"
              placeholder="John Doe"
              value={name}
              onChangeText={setName}
            />
            <Input
              style={style.inputSpacing}
              label="Phone Number"
              placeholder="0411111111"
              value={number}
              onChangeText={setNumber}
            />
            <Input
              style={style.inputSpacing}
              label="Address"
              placeholder="181 William St Melbourne 3000"
              value={address}
              onChangeText={setAddress}
            />
            <Input
              style={style.inputSpacing}
              label="Plate Number"
              placeholder="ABC-123"
              value={plateNo}
              onChangeText={setPlaceNo}
            />
            <Input
              style={style.inputSpacing}
              label="License Number"
              placeholder="123456789"
              value={licenseNo}
              onChangeText={setLicenseNo}
              caption={ licenseNo.length > 0 ? licenseNo.length === 9 ? "License Number Verified" : "Incorrect License Number" : "This license number will not be shared with others"}
              captionIcon={licenseNo.length > 0 ? style => renderCaptionIcon(style, licenseNo.length) : undefined}
            />
            <Button
              size="giant"
              onPress={() =>
                updateDetailRequest(
                  name,
                  number,
                  address,
                  plateNo,
                  setSpinner
                )
              }
            >
              Update
            </Button>
            {spinner && (
              <Layout style={style.spinner}>
                <Spinner />
              </Layout>
            )}
          </ScrollView>
        </KeyboardAwareScrollView>
      </Layout>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  inputSpacing: {
    marginBottom: 10
  },
  spinner: {
    alignSelf: "center",
    margin: 20
  }
});
