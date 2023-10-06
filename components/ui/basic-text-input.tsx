"use client";

import React, { useState } from "react";
import DOMPurify from "dompurify";

function EditableDiv({
  value: initialValue,
  formTitleDebounced,
  formId,
}: {
  value: string;
  formTitleDebounced: (formId: string, title: string) => void;
  formId: string;
}) {
  const [value, setValue] = useState(initialValue);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const sanitizedHTML = DOMPurify.sanitize(target.innerHTML);
    setValue(sanitizedHTML);
    formTitleDebounced(formId, sanitizedHTML);
  };

  return (
    <div
      tabIndex={0}
      contentEditable
      suppressContentEditableWarning
      className={`${
        !value
          ? "before:content-['Type_form_title'] text-muted-foreground "
          : ""
      }break-words focus:outline-none text-5xl font-semibold tracking-tight transition-colors`}
      onInput={handleInput}
    >
      {initialValue}
    </div>
  );
}

export default EditableDiv;
