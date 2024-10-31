"use client";

import {
  type BlocksContent,
  BlocksRenderer,
} from "@strapi/blocks-react-renderer";
import { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";

import { Button } from "@/ui/Button/Button";
import { Loader } from "@/ui/Loader/Loader";

import { getMailTemplate, getUsersMail, sendMail } from "@/app/actions";

interface InputEvent extends React.KeyboardEvent<HTMLInputElement> {
  target: HTMLInputElement & {
    value?: string;
    files?: FileList;
  };
}

interface Base64Object {
  name: string;
  body: string;
}

export const EditorComp = () => {
  const [mailTemplate, setMailTemplate] = useState();
  const [htmlMail, setHtmlMail] = useState<any>();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mails, setMails] = useState([]);
  const [subject, setSubject] = useState("");
  const [base64, setBase64] = useState<Base64Object>();

  useEffect(() => {
    const getEmail = async () => {
      const data = await getUsersMail();
      const mails = await getMailTemplate();
      setMails(data);
      setMailTemplate(mails);
      setHtmlMail(
        ReactDOMServer.renderToString(<BlocksRenderer content={mails} />),
      );
    };
    getEmail();
  }, []);

  const handleFile = (e: InputEvent) => {
    const target = e.target as HTMLInputElement;
    const file = target.files ? target.files[0] : null;
    if (file !== null && file.size > 2 * 1024 * 1024) {
      alert("File cannot be larger than 2 megabytes");
      target.value = "";
    }

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          const base64String = reader.result
            .replace("data:", "")
            .replace(/^.+,/, "");
          setBase64({ name: file.name, body: base64String });
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const handleChange = (e: InputEvent) => {
    const value = e.target.value;
    setSubject(value);
  };

  const send = async (message: string, subject: string, file?: any) => {
    setIsLoading(true);
    const status = await sendMail(message, subject, file);
    if (status.status === "true") setButtonDisabled(true);
    setIsLoading(false);
  };

  if (mails.length === 0) {
    return (
      <div className="mt-8 px-1">
        <div className="flex justify-center gap-4 font-black sm:flex-wrap">
          No email addresses to send
        </div>
      </div>
    );
  } else {
    return (
      <div className="mt-8 px-1">
        <h2 className="text-center">Send Mail</h2>
        <div className="flex justify-center gap-4 sm:flex-wrap">
          <div className="my-4 w-[550px]">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="subject"
            >
              Subject:
            </label>
            <input
              className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="subject"
              type="text"
              placeholder="Enter your subject"
              onChange={handleChange}
            />

            {mailTemplate && <BlocksRenderer content={mailTemplate} />}
          </div>
        </div>
        <div className="my-3 text-center">{`You are going to send ${mails && mails?.length} emails `}</div>
        <div className="flex items-center justify-center">
          <input
            type="file"
            name="csvFileSelector"
            id="csvFileSelector"
            className="text-sm text-medium_grey
            file:mr-4 file:rounded-lg file:border-0
            file:bg-base_green file:px-4
            file:py-2 file:text-sm
            file:font-semibold file:text-white
            hover:file:bg-dark_green"
            onChange={handleFile}
          />

          <Button
            style="bg-base_green px-4 py-1 text-white h-9"
            onClick={() => send(htmlMail, subject, base64)}
            disabled={buttonDisabled}
          >
            {isLoading ? <Loader style="h-5" /> : "Send mail"}
          </Button>
        </div>
      </div>
    );
  }
};
