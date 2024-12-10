import { Theme } from "@mui/material";

export interface ModalIconProps {
    bgIcon: keyof Theme['palette'];
}

export interface ModalProps {
    open: boolean;
    onCancel: () => void;
    onAccept: () => void;
    title: string;
    description?: string;
    state: 'inherit' |'primary' | 'error' | 'warning';
    bgIcon?: ModalIconProps;

}
