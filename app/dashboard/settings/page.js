import SettingsForm from "./components/settings-form";

export default async function Page() {
  return (
    <>
      <h1 className="text-4xl font-semibold mb-8">Settings</h1>
      <SettingsForm />
    </>
  );
}
