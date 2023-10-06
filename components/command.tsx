"use client";

import { CheckCircledIcon, PauseIcon } from "@radix-ui/react-icons";
import { Plus, Trash2 } from "lucide-react";

import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandDialog,
} from "@/components/ui/command";

export function QuestionCommand({
  open,
  setOpen,
  newElementOrder,
  formId,
  createShortResponseQuestion,
  createOptionQuestion,
  deleteQuestion,
  commandQuestionId,
}: {
  open: boolean;
  setOpen: any;
  newElementOrder: number;
  formId: string;
  createShortResponseQuestion: any;
  createOptionQuestion: any;
  deleteQuestion: any;
  commandQuestionId: string;
}) {
  return (
    <div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Options">
            <CommandItem
              className="cursor-pointer"
              onSelect={async () => {
                await createShortResponseQuestion(formId, newElementOrder);
                setOpen(false);
              }}
            >
              <PauseIcon className="mr-2 h-4 w-4 rotate-90	" />
              <span>Add short text question</span>
            </CommandItem>
            <CommandItem
              className="cursor-pointer"
              onSelect={async () => {
                await createOptionQuestion(formId, newElementOrder);
                setOpen(false);
              }}
            >
              <CheckCircledIcon className="mr-2 h-4 w-4" />
              <span>Add multiple options question</span>
            </CommandItem>
            {commandQuestionId ? (
              <CommandItem
                className="md:hidden cursor-pointer"
                onSelect={async () => {
                  await deleteQuestion(formId, commandQuestionId);
                  setOpen(false);
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Remove question</span>
              </CommandItem>
            ) : null}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
