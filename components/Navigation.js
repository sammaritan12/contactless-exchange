import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { BottomNavigation, BottomNavigationTab, Icon } from "@ui-kitten/components";
import React from "react";
import { SafeAreaView } from "react-native";
import { SendDetailsScreen } from "./SendDetailsScreen";
import { LoginScreen } from "./LoginScreen";
import { UpdateDetailsScreen } from "./UpdateDetailsScreen";

const EditIcon = () => <Icon name="edit-outline" />;

const MessageIcon = () => <Icon name="message-square-outline" />;

const BottomTab = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => {
  const onSelect = index => {
    navigation.navigate(state.routeNames[index]);
  };

  return (
    <SafeAreaView>
      <BottomNavigation selectedIndex={state.index} onSelect={onSelect}>
        <BottomNavigationTab title="Update Details" icon={EditIcon} />
        <BottomNavigationTab title="Send Details" icon={MessageIcon} />
      </BottomNavigation>
    </SafeAreaView>
  );
};

const TabNavigator = () => (
  <BottomTab.Navigator tabBar={props => <BottomTabBar {...props} />}>
    <BottomTab.Screen name="UpdateDetails" component={UpdateDetailsScreen} />
    <BottomTab.Screen name="SendDetails" component={SendDetailsScreen} />
  </BottomTab.Navigator>
);

export const AppNavigator = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);

  const toggleSetLoggedIn = () => setLoggedIn(!loggedIn);

  return (
    <NavigationContainer>
      {loggedIn ? (
        <TabNavigator />
      ) : (
        <LoginScreen toggleSetLoggedIn={toggleSetLoggedIn} />
      )}
    </NavigationContainer>
  );
};
