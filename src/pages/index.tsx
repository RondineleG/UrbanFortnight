import BaseLayout from "@/components/Layout/BaseLayout";
import CardBox from "@/components/Shared/CardBox";

const Home = () => {
  return (
    <BaseLayout contentTitle={"Dashboard"}>
      <CardBox toggleButtonVisibility={"block"} title={"Language"}>
        <h1>Dashboard Content</h1>
      </CardBox>
    </BaseLayout>
  );
};

export default Home;
