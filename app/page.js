import PageHeader from "@/components/page-header";
import Separator from "@/components/separator";

export default function Home() {
  return (
    <main className="space-y-8 mb-44">
      <div>
        <div className="space-y-8">
          <PageHeader />
        </div>
        <Separator className="space-y-8" />
        <div>
          <h2 className="mb-4 text-lg font-mono">Home</h2>
          <Separator />
          <div className="flex space-x-8">
            <span>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
