import { Tabs, TabsProps } from "antd";
import Container from "../../components/Container";
import Movies from "./Movies";

export default function Home() {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Popular",
      children: <Movies movieType="popular" />,
    },
    {
      key: "2",
      label: "Top Rated",
      children: <Movies movieType="top_rated" />,
    },
    {
      key: "3",
      label: "Upcoming",
      children: <Movies movieType="upcoming" />,
    },
    {
      key: "4",
      label: "Now playing",
      children: <Movies movieType="now_playing" />,
    },
  ];
  return (
    <main>
      <Container>
        <Tabs defaultActiveKey="1" items={items} size="large" />
      </Container>
    </main>
  );
}
