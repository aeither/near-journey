import Article from "@/components/article";
import Editors from "@/components/editors";

export default async function IndexPage() {
  return (
    <div className="grid grid-cols-5 h-[calc(100vh-24px-32px-8px)]">
      <Article />
      <Editors />
    </div>
  );
}
