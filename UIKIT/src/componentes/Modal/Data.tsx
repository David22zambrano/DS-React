import { Info, Warning } from "@mui/icons-material";

export const stateConfig = {
    info: {
        color: 'info',
        icon: <Info />,
        defaultDescription: 'Se [sincronizarán] los datos trabajados en modo offline y se [subirán] a los servidores.',
    },
    delete: {
        color: 'delete',
        icon: <Info />,
        defaultDescription: '[Elemento específico] [dejará de existir en todos los lugares donde esté en uso]. Esta acción es irreversible.',
    },
    warning: {
        color: 'warning',
        icon: <Warning />,
        defaultDescription: 'Se descartará la [creación] y los cambios se perderán.',
    },
};

