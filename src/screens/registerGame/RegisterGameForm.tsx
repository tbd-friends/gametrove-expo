import React from "react";
import { View, StyleSheet, Picker } from "react-native";
import { Formik } from "formik";
import { Button, Input } from "react-native-elements";
import { IGame } from "../../store/game/types";
import { IPlatform } from "../../store/platforms/types";

interface RegisterGameFormProps {
  initialValues: Omit<IGame, "id" | "registered">;
  platforms: IPlatform[];
  onSubmit: (values: Omit<IGame, "id" | "registered">) => void;
}

export function RegisterGameForm({
  initialValues,
  platforms,
  onSubmit,
}: RegisterGameFormProps) {
  console.log(platforms);
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
            label="Name"
            placeholder="Enter Name..."
            value={values.name}
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
          />
          <Input
            label="Description"
            placeholder="Enter Description..."
            value={values.description}
            onChangeText={handleChange("description")}
            onBlur={handleBlur("description")}
          />
          <Input
            label="Code"
            placeholder="Enter Code..."
            value={values.code}
            onChangeText={handleChange("code")}
            onBlur={handleBlur("code")}
          />
          <Picker
            selectedValue={values.platform}
            onValueChange={handleChange("platform")}
          >
            <Picker.Item label="Select Platform..." value="" />
            {platforms.map((e) => (
              <Picker.Item key={e.id} label={e.name} value={e.id} />
            ))}
          </Picker>
          <Button onPress={handleSubmit} title="Submit" />
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 10, paddingTop: 10 },
});
