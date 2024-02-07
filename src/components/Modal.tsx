import { IoMdClose } from "react-icons/io";

type Props = {
    children: React.ReactNode;
    onClose: () => void;
};

export const Modal = ({ children, onClose }: Props) => {
    return (
        <div className="fixed top-0 right-0 bottom-0 left-0 flex flex-col items-center bg-black/70 overflow-y-auto">
            <div className="w-full max-w-3xl my-3 flex justify-end">
                <div
                    className="w-8 h-8 rounded-full flex justify-center items-center cursor-pointer transition-all bg-white text-black text-lg hover:bg-red-600 hover:text-white"
                    onClick={onClose}
                >
                    <IoMdClose />
                </div>
            </div>
            <div className="bg-white w-full max-w-3xl p-4 rounded-md mb-5">
                {children}
            </div>
        </div>
    );
};
