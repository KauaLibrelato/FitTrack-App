import React from "react";
import { Modalize } from "react-native-modalize";
import * as S from "./ChangePasswordModalStyles";
import * as Icons from "phosphor-react-native";
import {
  ControlledTextInput,
  FillButton,
  NoFillButton,
} from "../../../../../../components";
import { useTheme } from "styled-components";
import { IChangePasswordModalProps } from "./utils/types";
import { useForm } from "react-hook-form";

export function ChangePasswordModal({
  isVisible,
  setIsTabBarVisibility,
  closeLogoutModal,
}: IChangePasswordModalProps) {
  const theme = useTheme();
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const newPassword = watch("newPassword");

  return (
    <Modalize
      ref={isVisible}
      adjustToContentHeight
      modalStyle={{ backgroundColor: theme.colors.background }}
      onClosed={() => setIsTabBarVisibility(true)}
    >
      <S.ContainerModal>
        <S.HeaderModal>
          <S.XButtonModal onPress={closeLogoutModal}>
            <Icons.X size={24} color={theme.colors.text} />
          </S.XButtonModal>
          <S.TitleModal>Alterar Senha</S.TitleModal>
        </S.HeaderModal>
        <S.ContentModal>
          <ControlledTextInput
            control={control}
            name="oldPassword"
            placeholder="Senha antiga"
            secureTextEntry
            rules={{
              required: "Campo obrigatório",
            }}
          />
          <ControlledTextInput
            control={control}
            name="newPassword"
            placeholder="Senha"
            secureTextEntry
            rules={{ required: "Campo obrigatório" }}
          />

          <ControlledTextInput
            control={control}
            name="confirmNewPassword"
            placeholder="Confirmar senha"
            secureTextEntry
            rules={{
              required: "Campo obrigatório",
              validate: (value) =>
                value === newPassword || "As senhas não correspondem",
            }}
          />
          <FillButton
            text="Salvar"
            colorText={theme.colors.text}
            onPress={closeLogoutModal}
            style={{ marginBottom: 16 }}
          />
          <NoFillButton text="Cancelar" onPress={closeLogoutModal} />
        </S.ContentModal>
      </S.ContainerModal>
    </Modalize>
  );
}
