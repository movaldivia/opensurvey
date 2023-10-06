"use client";

import React, { useState } from "react";
import DOMPurify from "dompurify";

function EditableQuestionText({
  value: initialValue,
  questionTextAndPlaceholderDebounced,
  questionId,
}: {
  value: string;
  questionTextAndPlaceholderDebounced: (
    questionId: string,
    placeholder: string | null,
    text: string | null
  ) => void;
  questionId: string;
}) {
  const [value, setValue] = useState(initialValue);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    const sanitizedHTML = DOMPurify.sanitize(target.innerHTML)
      .replace(/&nbsp;/g, " ")
      .trim();
    setValue(sanitizedHTML);
    questionTextAndPlaceholderDebounced(questionId, null, sanitizedHTML);
  };

  return (
    <div
      tabIndex={0}
      contentEditable
      suppressContentEditableWarning
      className={`${
        !value
          ? "before:content-['Type_a_question'] text-muted-foreground "
          : ""
      }cursor-text break-words focus:outline-none text-lg font-medium tracking-wide transition-colors leading-7 mb-2`}
      onInput={handleInput}
    >
      {initialValue}
    </div>
  );
}

export default EditableQuestionText;
