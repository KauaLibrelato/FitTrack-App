import {
  ParamListBase,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useTheme } from "styled-components";
import * as S from "./LoginStyles";
import GymIcon from "../../../assets/svgs/gym 1.svg";
import {
  ControlledTextInput,
  FillButton,
  NoFillButton,
} from "../../../components";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

export function Login() {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [loading, setLoading] = useState(false);
  const { control, reset, handleSubmit } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const handleLogin = handleSubmit(async (data) => {
    setLoading(true);
    try {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error) {
      console.log(error);
    }
  });

  useFocusEffect(
    useCallback(() => {
      reset();
    }, [reset])
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <S.Container>
        <S.LogoContainer>
          <GymIcon />
        </S.LogoContainer>

        <S.Form>
          <ControlledTextInput
            control={control}
            name="email"
            placeholder="Nome de usuário ou email"
            keyboardType="email-address"
            rules={{
              required: "Campo obrigatório",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Email inválido",
              },
            }}
          />

          <ControlledTextInput
            control={control}
            name="password"
            placeholder="Senha"
            secureTextEntry
            rules={{ required: "Campo obrigatório" }}
          />

          <S.ForgotPasswordButton
            activeOpacity={0.7}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <S.ForgotPasswordText>Esqueceu a senha?</S.ForgotPasswordText>
          </S.ForgotPasswordButton>

          <S.ButtonsContainer>
            <FillButton
              text="Login"
              colorText={theme.colors.text}
              onPress={() => handleLogin()}
              loading={loading}
              disabled={loading}
            />

            <S.OrText>ou</S.OrText>

            <NoFillButton
              text="Cadastre-se"
              onPress={() => navigation.navigate("Register")}
              loading={loading}
              disabled={loading}
            />
          </S.ButtonsContainer>
        </S.Form>
      </S.Container>
    </TouchableWithoutFeedback>
  );
}