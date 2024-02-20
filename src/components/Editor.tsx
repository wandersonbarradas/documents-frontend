import { Editor as TinyMCEEditor } from "@tinymce/tinymce-react";
import { useRef } from "react";

type Props = {
    value?: string;
    onChange: (text: string) => void;
    disabled: boolean;
};

export const Editor = ({ value, onChange, disabled }: Props) => {
    const editorRef = useRef<TinyMCEEditor | any>(null);
    const apiKey = "auuoz124jhzwqhaqaghsjz5ybzwn62r8ofd258ubkooxv29i";
    return (
        <TinyMCEEditor
            disabled={disabled}
            apiKey={apiKey}
            value={value}
            onInit={(evt, editor) => {
                if (editor) editorRef.current = editor;
            }}
            id="tiny-mce-editor"
            init={{
                plugins:
                    "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss",
                toolbar:
                    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                tinycomments_mode: "embedded",
                tinycomments_author: "Author name",
                mergetags_list: [
                    { value: "First.Name", title: "First Name" },
                    { value: "Email", title: "Email" },
                ],
                skin: window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "oxide-dark"
                    : "oxide",
                content_css: window.matchMedia("(prefers-color-scheme: dark)")
                    .matches
                    ? "dark"
                    : "default",
                language_url: "../utils/langsTinyMCE/pt_BR.js",
                height: 500,
            }}
            onEditorChange={onChange}
        />
    );
};
