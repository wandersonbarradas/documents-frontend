export const verifyPathname = (path: string, currentPath: string) => {
    //let url = pathname;

    if (path === `/` && currentPath !== `/`) return false;

    // if (
    //     (path.includes("-") && !currentPath.includes("-")) ||
    //     (!path.includes("-") && currentPath.includes("-"))
    // )
    //     return false;

    if (currentPath && currentPath.includes(path)) {
        return true;
    }
    return false;
};
