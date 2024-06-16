import { Modalize } from "react-native-modalize";

export interface IFriendSolicitaionsModalProps {
  isVisible: React.RefObject<Modalize>;
  setIsTabBarVisibility: (visible: boolean) => void;
  closeFriendSolicitaionsModal: () => void;
  users: any;
}
