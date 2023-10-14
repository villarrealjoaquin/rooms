import { Tab, TabList, Tabs } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { getAllRooms } from "../../services/rooms";

type Rooms = "deportes" | "anime" | "series";

interface Room {
  _id: string;
  name: Rooms;
}

export const JoinRooms = ({ joinRoom }: { joinRoom: (room: string) => void }) => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const getRooms = async () => {
      const response = await getAllRooms();
      if (!response.data) return;
      setRooms(response.data)
    }
    getRooms();
  }, []);

  return (
    <>
      {rooms && (
        <div className="rooms-container">
          <Tabs variant='soft-rounded' colorScheme='green'>
            <TabList>
              {rooms.map(room =>
                <Tab key={room._id} onClick={() => joinRoom(room.name)}>{room.name}</Tab>
              )}
            </TabList>
          </Tabs>
        </div>
      )}
    </>
  )
}