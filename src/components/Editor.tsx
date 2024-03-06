import { Editor as TinyMCEEditor } from "@tinymce/tinymce-react";
import { useRef } from "react";

type Props = {
    value?: string;
    onChange: (text: string) => void;
    disabled?: boolean;
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
                    "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker",
                toolbar:
                    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
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
                font_family_formats:
                    "Roboto=Roboto,sans-serif,arial; Sans-serif=sans-serif,arial,helvetica; Arial=arial,helvetica,sans-serif; Times New Roman=times new roman,times,serif; Verdana=verdana,geneva,sans-serif; Courier New=courier new,courier,monospace; AkrutiKndPadmini=Akpdmi-n",
                font_size_formats:
                    "8px 9px 10px 11px 12px 13px 14px 15px 16px 18px 20px 24px 32px 36px 48px",
                setup: function (editor) {
                    editor.on("init", function () {
                        // Define o tamanho da fonte padrão
                        editor.execCommand("fontSize", false, "15px");
                    });
                },
                //text_align: "justify",
                content_style:
                    "body {text-align: justify; font-family: Roboto, arial, sans-serif}",
            }}
            onEditorChange={onChange}
        />
    );
};
