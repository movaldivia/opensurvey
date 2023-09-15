import { Input } from "@/components/ui/input";

export default function Forms() {
  return (
    <div className="my-24 mx-24">
      <div>Create form</div>
      <div className="my-12">
        <Input
          className="border-0 shadow-none focus-visible:ring-0 !focus:border-0 !active:border-0 text-lg font-semibold p-4"
          type="email"
          placeholder="Type the question"
        />
      </div>
      <div className="my-12 ">
        <Input
          className="border-0 shadow-none text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1] p-12"
          type="email"
          placeholder="Type the question"
        />
      </div>

      <input placeholder="Type the question"></input>
    </div>
  );
}
