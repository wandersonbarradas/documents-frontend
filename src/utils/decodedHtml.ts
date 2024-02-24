export const decodeHtml = (html: string): string => {
    const temporaryElement = window.document.createElement("div");
    temporaryElement.innerHTML = html;
    const text =
        temporaryElement.textContent || temporaryElement.innerText || "";
    temporaryElement.remove();
    return text;
};
