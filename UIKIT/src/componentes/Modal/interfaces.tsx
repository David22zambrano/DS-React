import { Theme } from "@mui/material";

export interface ModalIconProps {
    bgIcon: keyof Theme['palette'];
}
 type ModalStates = 'info' | 'delete' | 'warning' ;

export interface ModalProps  {
    open: boolean;
    onCancel: () => void;
    onAccept: () => void;
    title: string;
    description?: string;
    state: ModalStates;
    bgIcon?: ModalIconProps;
}

