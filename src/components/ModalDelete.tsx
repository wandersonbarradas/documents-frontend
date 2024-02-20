import { IoMdClose } from "react-icons/io";
import { Button } from "./Button";

type Props = {
    onClose: () => void;
    onDelete: () => void;
};

export const ModalDelete = ({ onDelete, onClose }: Props) => {
    return (
        <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black/70 z-10">
            <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-6 rounded-lg">
                <h2 className="mb-5 text-center">
                    Deseja realmente excluir este item?
                </h2>
                <div className="flex gap-4">
                    <Button onClick={onClose} value="Não" type="cancel" />
                    <Button onClick={onDelete} value="Sim" type="delete" />
                </div>
            </div>
        </div>
    );
};
