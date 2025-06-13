"use client";

import Image from "next/image";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";

import { Button } from "@/ui/Button/Button";

import { useAuthStore } from "@/store/store";

import { getTokenFromLocalCookie } from "@/lib/auth";
import { fetcher } from "@/lib/fetcher";

interface AvatarChangeProps {
  avatar: string | null | undefined;
}

export const AvatarChange: FC<AvatarChangeProps> = ({ avatar }) => {
  const [src, setSrc] = useState<string | undefined>(undefined);
  const [userAvatar, setUserAvatar] = useState("");
  const [saved, setSaved] = useState<boolean>(false);

  const editorRef = useRef<AvatarEditor>(null);

  const { id } = useAuthStore();
  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSaved(false);
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = event => {
        setSrc(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onEditorMouseUp = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const dataUrl = canvas.toDataURL();
      setUserAvatar(dataUrl);
    }
  };

  const updateUserAvatar = async () => {
    setSaved(false);
    const token = await getTokenFromLocalCookie();
    const body = JSON.stringify({ avatar: src });
    try {
      const response = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body,
        },
      );
      if (response.id) {
        setSaved(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Здесь можно добавить логику для предварительного просмотра, если необходимо
  }, [src]);

  useEffect(() => {
    if (avatar) {
      setSrc(avatar);
    }
  }, [avatar]);

  return (
    <>
      <Image
        width={40}
        height={40}
        alt="avatar"
        src={src ? src : "/assets/icons/avatar.svg"}
        className="mb-6 size-20 rounded-full sm:mb-3"
      />
      <div className="mb-1 flex gap-2">
        <label
          htmlFor="imageInput"
          className="h-6 cursor-pointer rounded-lg bg-medium_grey px-2 py-1 text-xs text-base_grey"
        >
          Image
        </label>
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          onChange={onImageChange}
          style={{ display: "none" }}
        />
        <Button
          style="bg-base_green px-10 py-1 h-6 text-white hover:bg-dark_green"
          onClick={updateUserAvatar}
        >
          Save
        </Button>
      </div>
      {saved && <p className="text-sm text-dark_green">saved successfuly</p>}
      <AvatarEditor
        ref={editorRef}
        onMouseUp={onEditorMouseUp}
        image={src ? src : ""}
        width={150}
        height={150}
        border={10}
        color={[255, 255, 255, 0.6]} // Цвет рамки
        scale={1.2} // Масштаб
        rotate={0} // Поворот
        style={{ margin: "20px auto" }}
      />
    </>
  );
};
