"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function SortableItem(props: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  // const {arguments, listeners, setNodeRef} = useDraggable({
  //   id: props.id,
  // });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div className="bg-red-400" ref={setNodeRef} style={style} {...attributes}>
      <div>wens</div>
      <button {...listeners} {...arguments}>
        Drag handle
      </button>
    </div>
  );
}
