type Props = {
    children: React.ReactNode;
    clickToClose?: boolean;
    onClose?: () => void;
};

export const ModalActions = ({ children, clickToClose, onClose }: Props) => {
    const handleClickModal = (e: React.MouseEvent<HTMLDivElement>) => {
        const element = e.target as HTMLDivElement;
        if (clickToClose && element.id === "modalActions" && onClose) {
            onClose();
        }
    };

    return (
        <div
            id="modalActions"
            onClick={handleClickModal}
            className="fixed top-0 left-0 bottom-0 right-0 flex-col gap-4 flex items-center justify-center bg-black/70 z-20"
        >
            {children}
        </div>
    );
};
