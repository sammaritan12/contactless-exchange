import { Button, Input, Layout, Modal, Text, Spinner } from "@ui-kitten/components";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

const sendMessage = async (number, setSpinner) => {
  setSpinner(true);

  const formattedNumber = "+61".concat(number.slice(1));
  await fetch(
    "https://hiw80q9cx6.execute-api.ap-southeast-2.amazonaws.com/default/sendSMSLink",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        number: formattedNumber
      })
    }
  );
  setSpinner(false);
};

export const SendDetailsScreen = () => {
  const [spinner, setSpinner] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, alignContent: "stretch" }}>
        <Text style={{ alignSelf: "center", marginTop: 20 }} category="h1">
          Send Details
        </Text>
        <Layout style={{ margin: 20 }}>
          <Text style={{marginBottom: 20}}>
            We will send your vehicle and insurance details to this number, so we can get you on your way quicker.
          </Text>
          <Input
            style={styles.inputSpacing}
            label="Phone Number"
            placeholder="0411111111"
            size="large"
            value={mobileNumber}
            onChangeText={setMobileNumber}
          />
          <Button size="giant" onPress={() => sendMessage(mobileNumber, setSpinner)}>
            Send
          </Button>
          {spinner && (
            <Layout style={styles.spinner}>
              <Spinner />
            </Layout>
          )}
        </Layout>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 256,
    padding: 16
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 256,
    padding: 16
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  inputSpacing: {
    marginBottom: 10
  },
  spinner: {
    alignSelf: "center",
    margin: 20
  }
});
