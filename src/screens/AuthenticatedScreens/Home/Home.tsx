import React, { useEffect, useRef, useState } from "react";
import * as S from "./HomeStyles";
import { TouchableWithoutFeedback, Animated } from "react-native";
import * as Progress from "react-native-progress";
import { useTheme } from "styled-components";
import { Easing } from "react-native-reanimated";
import * as Icons from "phosphor-react-native";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { IHomeDataProps } from "./utils/types";
import { useAuthContext } from "../../../context/Auth/UseAuthContext";
import { Toast } from "toastify-react-native";
import apiAuth from "../../../infra/apiAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../../../utils/types";

export function Home() {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [isLevelMenuVisible, setLevelMenuVisible] = useState(false);
  const [homeData, setHomeData] = useState<IHomeDataProps>();
  const [user, setUser] = useState<IUser>();
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const personalResumeData = [
    {
      title: "Dias consecutivos",
      description: 0,
    },
    {
      title: "Treinos executados",
      description: homeData?.workoutsExecuted,
    },
    {
      title: "Tempo médio de treino",
      description: homeData?.workoutsAverageTime ?? "00:00",
    },
    {
      title: "Missões completas",
      description: homeData?.missionsCompleted,
    },
  ];

  const funcionalitiesData = [
    {
      title: "Treinos",
      description: "Cadastre seus treinos e acompanhe seu progresso",
      icon: (
        <Icons.Barbell color={theme.colors.primary} weight="fill" size={32} />
      ),
      onPress: () => navigation.navigate("Exercises"),
    },
    {
      title: "Missões",
      description: "Complete missões para subir de nível",
      icon: (
        <Icons.Trophy color={theme.colors.primary} weight="fill" size={32} />
      ),
      onPress: () =>
        navigation.navigate("ConfigurationsRoutes", { screen: "Missions" }),
    },
    {
      title: "Ranking",
      description: "Veja sua posição no ranking geral ou entre seus amigos",
      icon: (
        <Icons.Crown color={theme.colors.primary} weight="fill" size={32} />
      ),
      onPress: () => navigation.navigate("Ranking"),
    },
    {
      title: "Amigos",
      description: "Adicione amigos e veja o progresso deles",
      icon: (
        <Icons.Users color={theme.colors.primary} weight="fill" size={32} />
      ),
      onPress: () =>
        navigation.navigate("ConfigurationsRoutes", { screen: "Friends" }),
    },
  ];

  const toggleLevelMenu = () => {
    if (isLevelMenuVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(() => setLevelMenuVisible(false));

      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    } else {
      setLevelMenuVisible(true);
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }
  };

  const levelMenuTranslateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  async function getHomeData() {
    try {
      await apiAuth.get("/home/metrics").then((res) => {
        console.log(res.data);
        setHomeData(res.data);
      });
    } catch (error: any) {
      Toast.error(error.message, "bottom");
    }
  }

  async function getUserData() {
    const userInfos = await AsyncStorage.getItem("user");
    if (userInfos) {
      setUser(JSON.parse(userInfos));
    }
  }

  useEffect(() => {
    getHomeData();
    getUserData();
  }, [navigation]);
  return (
    <S.Container>
      <S.Header>
        <S.PresentationContainer>
          <S.PresentationText>Bem vindo, </S.PresentationText>
          <S.PresentationTextBold>
            {user?.username ?? ""}
          </S.PresentationTextBold>
        </S.PresentationContainer>
        <S.LevelContainer onPress={() => toggleLevelMenu()}>
          <S.LevelText>{`Nível ${homeData?.userLevel}`}</S.LevelText>
        </S.LevelContainer>
      </S.Header>
      <S.Content>
        <S.CategoryTitle>Resumo pessoal</S.CategoryTitle>
        <S.PersonalResumeCarousel
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <S.Line>
            {personalResumeData.map((data, index) => (
              <S.PersonalResumeCardContainer key={index}>
                <S.PersonalResumeCardTitle>
                  {data.title}
                </S.PersonalResumeCardTitle>
                <S.PersonalResumeCardDescription>
                  {data.description}
                </S.PersonalResumeCardDescription>
              </S.PersonalResumeCardContainer>
            ))}
          </S.Line>
        </S.PersonalResumeCarousel>

        <S.CategoryTitle>Funcionalidades</S.CategoryTitle>

        {funcionalitiesData.map((data, index) => (
          <S.FuncionalityCardContainer key={index} onPress={data.onPress}>
            <S.FuncionalityCardLeftContainer>
              {data.icon}
            </S.FuncionalityCardLeftContainer>
            <S.FuncionalityCardRightContainer>
              <S.FuncionalityCardTitle>{data.title}</S.FuncionalityCardTitle>
              <S.FuncionalityCardDescription>
                {data.description}
              </S.FuncionalityCardDescription>
            </S.FuncionalityCardRightContainer>
          </S.FuncionalityCardContainer>
        ))}
        <S.BottomSpacer />
      </S.Content>

      {isLevelMenuVisible && (
        <TouchableWithoutFeedback onPress={toggleLevelMenu}>
          <Animated.View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              opacity: fadeAnim,
            }}
          />
        </TouchableWithoutFeedback>
      )}

      {isLevelMenuVisible && (
        <Animated.View
          style={{
            transform: [{ translateY: levelMenuTranslateY }],
            position: "absolute",
            top: 56,
            left: 0,
            right: 0,
          }}
        >
          <S.LevelMenu>
            <S.LevelMenuItem>
              <S.LevelMenuItemText>Nível do usuário:</S.LevelMenuItemText>
              <S.LevelMenuItemBold>{` ${homeData?.userLevel}`}</S.LevelMenuItemBold>
            </S.LevelMenuItem>
            <S.LevelMenuItem>
              <S.LevelMenuItemBold>
                {homeData?.experiencePoints ?? 0}
              </S.LevelMenuItemBold>
              <Progress.Bar
                progress={
                  (homeData?.experiencePoints ?? 1) /
                  (homeData?.experiencePointsToNextLevel ?? 1)
                }
                width={200}
                color={theme.colors.primary}
                unfilledColor={theme.colors.border}
                borderWidth={1}
                height={8}
                borderRadius={8}
                style={{ marginHorizontal: 8 }}
              />
              <S.LevelMenuItemBold>
                {homeData?.experiencePoints ?? 0}
              </S.LevelMenuItemBold>
            </S.LevelMenuItem>
          </S.LevelMenu>
        </Animated.View>
      )}
    </S.Container>
  );
}
