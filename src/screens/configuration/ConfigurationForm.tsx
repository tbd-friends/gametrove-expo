import React from "react";
import { View, StyleSheet } from "react-native";
import { Formik } from "formik";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ConfigurationState } from "../../store/configuration/types";

interface ConfigurationFormProps {
  initialValues: ConfigurationState;
  onSubmit: (values: any) => void;
}

export function ConfigurationForm({
  initialValues,
  onSubmit,
}: ConfigurationFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        onSubmit(values);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.container}>
          <Input
            label="Api Url"
            placeholder="https://localhost:5001"
            leftIcon={<Icon name="web" size={25} />}
            value={values.apiUri}
            onChangeText={handleChange("apiUri")}
            onBlur={handleBlur("apiUri")}
          />
          <Button onPress={handleSubmit} title="Submit" />
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 10, paddingTop: 10 },
});
