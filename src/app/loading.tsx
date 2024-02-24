import { Loader } from "@/components/loader";

const page = () => {
    return (
        <div className="h-screen flex-col gap-4 w-full flex items-center justify-center">
            <Loader />
        </div>
    );
};

export default page;
