import { RocketIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Page() {
  return (
    <div className="my-28 mx-28">
      <Alert>
        <RocketIcon className="h-4 w-4" />
        <AlertTitle>Submission Successful!</AlertTitle>
        <AlertDescription>
          Your form has been successfully submitted. We appreciate your input
          and will process it shortly. Thank you for your time!
        </AlertDescription>
      </Alert>
    </div>
  );
}
