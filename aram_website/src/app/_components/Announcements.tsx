import { fetchAnnouncements } from "../_data/announcements";
import AnnouncementsBoard from "./AnnouncementsBoard";

export default async function Announcements() {
  const items = await fetchAnnouncements();
  return <AnnouncementsBoard items={items} />;
}
